import { authSlice, login, logout, chekingCredentials } from "../../../store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => { 
    test('Debe de regresar el estado inicial y llamarse "auth"', () => { 
        
        // console.log(authSlice);
        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {});
        // console.log(state)
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');

    })
    
    test('Debe de realizar la autenticación', () => {
        // console.log(login(demoUser))  

        const state = authSlice.reducer(initialState, login( demoUser ));
        // console.log(state)

        expect(state).toEqual({
        status: 'authenticated', // 'checking', authenticated
        uid: demoUser.uid,
        email: demoUser.email,
        displayName: demoUser.displayName,
        photoURL: demoUser.photoURL,
        errorMessage: null,
        loading: false,
        });
    })

    test('Debe de realizar el logout sin argumentos', () => { 
        //estado inicial atuhenticatedState // logout sin argumentos
        const state = authSlice.reducer(authenticatedState,logout());

        console.log(state)

        expect(state).toEqual({
            status: 'not-authenticated', // 'checking', authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: undefined,
        loading: false,
        })
        
    })

    test('Debe de realizar el logout y mostrar un mensaje de error', () => { 
        //estado inicial atuhenticatedState // logout con argumentos
        const errorMessage = 'Las credenciales no son correctas'

        const state = authSlice.reducer(authenticatedState,logout({errorMessage}));

        console.log(state)

        expect(state).toEqual({
            status: 'not-authenticated', // 'checking', authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: errorMessage,
        loading: false,
        })
    })

    test('Debe de cambiar el estado a checking', () => { 
        const state = authSlice.reducer(authenticatedState, chekingCredentials());
        // console.log(state)
        expect(state.status).toBe('checking');
     })

})