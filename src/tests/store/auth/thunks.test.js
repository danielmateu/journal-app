

import { singInWithGoogle, loginWithEmailPassword, logoutFirebase } from "../../../firebase/providers";
import { chekingCredentials, login, logout, startGoogleSignIn, startLoadingWithEmailPassword } from "../../../store/auth";
import { checkingAuthentication, startLogout } from "../../../store/auth/thunks";
import { clearNotesLogout } from "../../../store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";



jest.mock('../../../firebase/providers')


describe('Pruebas en AuthThunks', () => { 

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks())

    test('Debe de invocar el checkingCredentials', async() => { 
        
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith(chekingCredentials())
    })

    test('SignInWithGoogle debe de llamar checkingCredentials y login - Exito', async() => { 
        const loginData = {ok:true, ...demoUser}
        // await singInWithGoogle.mockResolveValue(loginData)
        await singInWithGoogle.mockResolvedValue(loginData);

        //THUNK
        await startGoogleSignIn()(dispatch);

        expect(dispatch ).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch ).toHaveBeenCalledWith(login(loginData));
    })

    test('SignInWithGoogle debe de llamar checkingCredentials y logout - Error', async() => { 
        
        const loginData = {ok:false, errorMessage: 'Ha habido un error...'}

        await singInWithGoogle.mockResolvedValue(loginData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    });

    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - Exito', async() => { 

        const loginData = {ok:true, ...demoUser};
        const formData = {email:demoUser.email, password: '123456'}

        await loginWithEmailPassword.mockResolvedValue( loginData );
        
        // await startLoginWithEmailPassword(formData)(dispatch)
        await startLoadingWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))

    })

    test('debe de llamar logoutFirebase, clearNotes y logout', async() => { 
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());

    })


})

