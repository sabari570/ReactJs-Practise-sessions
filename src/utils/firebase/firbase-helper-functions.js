import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

const USERS_COLLECTION = 'users';
const CATEGORIES_COLLECTION = 'categories';

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

    if (!userAuth) return;

    // Syntax of creating a document reference in firebase -> doc(<database>, <collection name>, <manual document id>)
    const userDocRef = doc(db, USERS_COLLECTION, userAuth.uid);

    // steps of creating a user document inside the firestore
    // if already a user exits then it return away with nothing
    // if it is a new user then it creats a new user with the setDoc
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation, // inorder to override the null value of displayName while saving in firestore when signing in with email and password
            });
        } catch (e) {
            console.log("Error while creating the user doc: ", e);
        }
    }

    return userDocRef;
};

// Creating user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

// Signing in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

// Signing out logged in users
export const signOutAuthUsers = async () => await signOut(auth);

// Listening to auth state changes whenever someone logs in and whenever someone logs out
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// This function is written to create a products collection and to add some documents to it
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // This line is used to create a collection inside firestore with the name give in the collectionKey
    const collectionRef = collection(db, collectionKey);

    // Creating a batch for uploading the documents
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        // Creating a docRef using the collectionRef
        // We can also create a doc manually by doc(<database>, <Collection name>, <docId>)
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("shop data uploaded successfully...");
};

// This function is used to get the data from firestore
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, CATEGORIES_COLLECTION);

    // First we write a query object q with the collectionRef
    // and then the getDocs(query) actually returns us a list of querySnapshot
    // and then it is from the querySnapshot we actually obtain the data by calling the querySnapshot.docs() function
    // this return the docs from firestore as an array
    // It is from this array we actually change the structure to our own categoryMap
    // Stucture of categoryMap ->
    // categoryMap = 
    // {
    //     hats: [< List of hats ><],
    //     jackets: [<List of jackets>],
    //      ....
    // }
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    // this send out all the documentSnapshot data which is the object inside each of the documents in firebase
    const categoriesArray = querySnapshot.docs.map((documentSnapshot) => documentSnapshot.data());

    return categoriesArray;
};

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
