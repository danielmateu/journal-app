import { doc,collection,setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers";
import { addNewEmptyNote,setActiveNote, savingNewNote, setNotes,setSaving,updateNote} from "./";

export const startNewNote = () => {

    return async(dispatch,getState ) => {
        

        //TODO: Tarea Dispatch
        dispatch(savingNewNote());

        const {uid} = getState().auth;
        // console.log(uid)
        //uid

        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection(FirebaseDB, `${ uid }/journal/notes`))

        const setDocResp = await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        // console.log({newDoc,setDocResp})

        //! dispatch
        // dispatch(newNote)
        // dispatch(activarNote)
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        // dispatch(savingNewNote(newNote));
        
    }
}

export const startLoadingNotes = () => {

    return async(dispatch,getState) => {

        const {uid} = getState().auth;
        if(!uid) throw new Error('El id del usuario no existe')
        // console.log(uid);

        const notes = await loadNotes(uid)
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async(dispatch,getState) => {

        dispatch(setSaving())
        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        // console.log(noteToFireStore)

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, {merge:true});

        dispatch(updateNote(note))

    }
}