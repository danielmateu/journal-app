
import { checkingAuthentication } from "../../../src/store/auth/thunks"
import { chekingCredentials, login, logout, startGoogleSignIn, startLoadingWithEmailPassword, startLogout } from "../../../src/store/auth"
import { demoUser } from "../../fixtures/authFixtures";
import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from "../../../src/firebase/providers";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";

jest.mock('../../../src/firebase/providers');

describe('PRuebas sobre Auth THUNKS', () => {
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Debe de invocar el checkingCredentials', async () => {

        // const valor = chekingCredentials();
        // console.log(valor);
        await checkingAuthentication()(dispatch);

        // expect(dispatch).toHaveBeenCalledWith( {"payload": undefined, "type": "auth/chekingCredentials"})

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());

    });

    test('startGoogleSignIn debe llamar checkingCredentaials y login', async () => {
        const logingData = { ok: true, ...demoUser };

        await singInWithGoogle.mockResolvedValue(logingData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(logingData));
    });

    test('', () => {

    })


    test('startGoogleSignIn debe llamar checkingCredentials y logout con mensage de error', async () => {

        const logingData = { ok: false, errorMessage: 'Un error en Google' };

        await singInWithGoogle.mockResolvedValue(logingData);

        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(logingData.errorMessage));


    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - exito', async () => {

        const loginData = { ok: true, ...demoUser };

        const formData = { email: demoUser.email, passord: '123456' }

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoadingWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });

    test('startLogout debe llamar logoutFireBase, clearNotesLogout y logout', async () => {

        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());


    })

    test('startCreatingUserWithEmailPassword', () => {

    });


})