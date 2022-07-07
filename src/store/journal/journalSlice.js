import {createSlice} from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active : null,
        // active: {
        //     id:'ABC123',
        //     title: '',
        //     body: '',
        //     date: '',
        //     imageUrls:[], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    },
    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true;
        },

        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => { //payload: note
            state.isSaving = false;
            state.notes = state.notes.map(note => {

                if(note.id === action.payload.id){
                    return action.payload
                }

                return note
            })

            //Todo Mostrar mensaje de actualización
            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            
            console.log(action.payload);
            
        },
        clearNotesLogout: (state) => {

        },

        deleteNoteById: (state, action) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const {
    addNewEmptyNote, //Done
    deleteNoteById,
    savingNewNote, //Done
    setActiveNote, //Done
    setNotes, //Done
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;