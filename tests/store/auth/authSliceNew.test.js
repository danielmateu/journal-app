import { authSlice, chekingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas sobre authSlice', () => {  
    test('Debe de regresar el estado inicial y llamarse "auth"', () => {  

        // console.log(authSlice);
        
        const state = authSlice.reducer(initialState, {});
        // console.log(state);
        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe('auth');

    })

    test('Debe de realizar la autenticación', () => {  

        // console.log(login(demoUser));
        const state = authSlice.reducer( initialState, login(demoUser) );
        console.log(state);

        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
            loading: false
        })

    });

    test('Debe de realizar el logout sin argumentos', () => {  


        //authenticatedState //logout sin argumentos

        const state = authSlice.reducer( authenticatedState, logout() );
        console.log(state);
    
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
            loading: false
        })
    });

    test('Debe de realizar el logout y mostrar un mensaje de error', () => {  


        //authenticatedState //logout con argumentos
        const errorMessage = 'Credenciales no son correctas';
        
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}) );
        // console.log(state);
    
        console.log(state);
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
            loading: false
        })
    });

    test('Debe de cambiar el estado a checking', () => {  

        const state = authSlice.reducer(authenticatedState, chekingCredentials());

        expect(state.status).toBe('checking');
    })
})
