// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCw3oNORHIWRNNxG_U0OAbT8rawQFD7R8E",
    authDomain: "react-cursos-8bd77.firebaseapp.com",
    projectId: "react-cursos-8bd77",
    storageBucket: "react-cursos-8bd77.appspot.com",
    messagingSenderId: "1067189630477",
    appId: "1:1067189630477:web:d0e7b4889fe30f85b54744"
};

// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireBaseApp);
export const FirebaseDB = getFirestore(FireBaseApp);
