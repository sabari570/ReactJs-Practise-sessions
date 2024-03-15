import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc, 
    setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3PgQX5KXQq9iHhGzfWFgERA6DEXLTtQs",
    authDomain: "crown-clothing-61127.firebaseapp.com",
    projectId: "crown-clothing-61127",
    storageBucket: "crown-clothing-61127.appspot.com",
    messagingSenderId: "243976750313",
    appId: "1:243976750313:web:569b6d29d2d8de95cf1c78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialising the db in firestore
const db = getFirestore(app);

// Creating a google auth provider for implementing google singin
const googleProvider = new GoogleAuthProvider();    // GoogleAuthProvider is a class thats why we use a new for instance

googleProvider.setCustomParameters({
    prompt: "select_account"
});

// Creating a user document while signing up
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if(!userAuth) return;

    // Syntax of creating a document reference in firebase -> doc(<database>, <collection name>, <manual document id>)
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    // steps of creating a user document inside the firestore
    // if already a user exits then it return away with nothing
    // if it is a new user then it creats a new user with the setDoc
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email, 
                createdAt,
                ...additionalInformation, // inorder to override the null value of displayName while saving in firestore when signing in with email and password
            });
        }catch(e){
            console.log("Error while creating the user doc: ", e);
        }
    }

    return userDocRef;
};

// Creating user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

// Signing in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
