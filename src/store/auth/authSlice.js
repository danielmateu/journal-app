import {createSlice} from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        loading:false,
        errorMessage: null,
    },
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated'; // 'checking', authenticated
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.loading = false;
            state.errorMessage = null;

        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'; // 'checking', authenticated
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.loading = false;
            state.errorMessage = payload?.errorMessage;
        },
        chekingCredentials: (state) => {
            state.status = 'checking';
            state.loading = true;
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    login,
    logout,
    chekingCredentials
} = authSlice.actions;