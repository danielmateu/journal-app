export const initialState = {
        status: 'checking', // 'checking', authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
}
export const authenticatedState = {
        status: 'authenticated', // 'checking', authenticated
        uid: '123ABC',
        email: 'demo@gmail.com',
        displayName: 'Demo User',
        photoURL: 'https://demo.jpg',
        errorMessage: null,
}
export const notAuthenticatedState = {
        status: 'not-authenticated', // 'checking', authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
}

export const demoUser = {
        uid: 'ABC123',
        email: 'demo@gmail.com',
        displayName: 'Demo User',
        photoURL: 'https://demo.jpg'
}