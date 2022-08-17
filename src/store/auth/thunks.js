import { registerUserWithEmailPassword, singInWithGoogle, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { chekingCredentials,logout,login } from "./";


export const checkingAuthentication = () => {
    return async (dispatch) => {
        
        dispatch(chekingCredentials( ));
    }
}

export const startGoogleSignIn = () => {
    
    return async (dispatch) => {
        
        dispatch(chekingCredentials( ));

        const result =await singInWithGoogle();
        // console.log({result})

        if(!result.ok) return dispatch(logout(result.errorMessage))
        
        dispatch(login(result))

    }
}

export const startCreatingUserWithEmailPassword = ({
    email,
    password,
    displayName
}) => {
    return async (dispatch) => {

        dispatch(chekingCredentials());

        const result = await registerUserWithEmailPassword({email,password,displayName})
        console.log(result.errorMessage)
        

        if(!result.ok) return dispatch(logout(result))

        dispatch(login(result));
    }
}


export const startLoadingWithEmailPassword = ({email,password}) =>{ //startLoginWithEmailPassword

    return async(dispatch) => { 
        dispatch(chekingCredentials())

        const result = await loginWithEmailPassword({email,password})
        // console.log(result);
        
        if(!result.ok) return dispatch(logout(result))

        dispatch(login(result));
    }

}

export const startLogout = () => {
    return async(dispatch) => {

        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch(logout());
    }
}