import { deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en journal Thunks ', () => {  

    // const dispatch = jest.fn();
    // const getState = jest.fn()

    // beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe de crear una nueva nota en blanco', () => { 
        // const uid = 'TEST_UID';
        
        // getState.mockReturnValue({auth: {uid:uid}});

        // await startNewNote()(dispatch,getState);

        // expect(dispatch).toHaveBeenCalledWith(savingNewNote());

        // expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
        //     body: '',
        //     title: '',
        //     id: expect.any(String),
        //     date: expect.any(Number),
        // }));

        
        // expect(dispatch).toHaveBeenCalledWith(setActiveNote({
        //     body: '',
        //     title: '',
        //     id: expect.any(String),
        //     date: expect.any(Number),
        // }));

        //BORRAR DE FIREBASE, en caso se añada algo... que no es el caso

        // const collectionRef = collection(FirebaseDB, `${ uid }/journal/notes`);

        // const docs = await getDocs(collectionRef);
        // // console.log(docs);

        // const deletePromises = [];
        // docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));

        // await Promise.all(deletePromises);




    })
})