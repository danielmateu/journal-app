import { doc,collection,setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote,setActiveNote} from "./";
import {savingNewNote, setNotes,setSaving,updateNote,setPhotosToActiveNote,deleteNoteById} from './journalSlice'
import { fileUpload, loadNotes } from "../../helpers";

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
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        // console.log({newDoc,setDocResp})

        //! dispatch

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        
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

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
            
        // await fileUpload( files[0] );
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ));
        
    }
}

export const startDeleteNote = ( ) => {
    return async( dispatch,getState ) => {
        const {uid} = getState().auth;
        const {active: note} = getState().journal; 

        // console.log({uid,note});

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef );

        dispatch(deleteNoteById(note.id));
        
    }

    
}

