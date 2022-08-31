// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// DEV/PROD
const firebaseConfig = {
    apiKey: "AIzaSyCw3oNORHIWRNNxG_U0OAbT8rawQFD7R8E",
    authDomain: "react-cursos-8bd77.firebaseapp.com",
    projectId: "react-cursos-8bd77",
    storageBucket: "react-cursos-8bd77.appspot.com",
    messagingSenderId: "1067189630477",
    appId: "1:1067189630477:web:d0e7b4889fe30f85b54744"
};



//TESTING
// const firebaseConfig = {
//   apiKey: "AIzaSyDlJeyZdvRd4Iask8303pqrBytvXn2Ljuc",
//   authDomain: "cloud-firestore-ccc71.firebaseapp.com",
//   projectId: "cloud-firestore-ccc71",
//   storageBucket: "cloud-firestore-ccc71.appspot.com",
//   messagingSenderId: "31820881864",
//   appId: "1:31820881864:web:4cca56a1b3d0a1a9e62afd",
//   measurementId: "G-GPXXJ0CZGZ"
// };


// Initialize Firebase
export const FireBaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FireBaseApp);
export const FirebaseDB = getFirestore(FireBaseApp);
