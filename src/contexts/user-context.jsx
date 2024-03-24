import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firbase-helper-functions";


// This is which we use for getting the stored context
// by using the useContext(UserContext) it returns an object of {currentUser, setCurrentUser}
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Creating the inital state for the userReducer
const INITIAL_STATE = {
    currentUser: null,
};

// Creating the types object for the reducer
const userActionTypes = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// Creating the userReducer
// state is the previous state value of the currentUser
// action will have two values in it:
// 1) type: which is a string and tells us what are we supposed to change
// 2) payload: holds the new updated content

// userReducer will be called wherever we have written the dispatch()
const userReducer = (state, action) => {
    console.log("Dispatched..");
    const { type, payload } = action;

    switch(type){
        case userActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default: throw new Error(`Unhandled type ${type} in userReducer`)
    }
}


// We wrap the children inside the Usercontext.Provider inorder to get the values stored in the provider
export const UserProvider = ({ children }) => {

    // This is how we use the created userReducer using the useReducer hook
    // syntax of useReducer hook: useReducer(<reducer_created>, <initial_object>)
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);

    // dispatch is a function that takes an action as its parameter and runs the userReducer function
    // and updates the currentUser value

    const { currentUser } = state; // -> state will have the value of INITIAL_STATE (initially)
    console.log("Current user updated: ", currentUser);

    // A function that is used to update the value of the currentUser
    // it is inside this we actually call the dispatch() function
    const setCurrentUser = (user) => {
        const action = {
            type: userActionTypes.SET_CURRENT_USER,
            payload: user,
        };
        dispatch(action);
    };

    const value = { currentUser, setCurrentUser };

    // Run this component when the UserProvider is initialised
    // so that we come to know whether an user is logged in or not whenever the app is launched
    useEffect(
        () => {
            const unsubscribe = onAuthStateChangedListener((user) => {
                console.log("User status: ", user);
                setCurrentUser(user);
            });
            return unsubscribe; // returns whenever the component is unmounted that is when the web app is closed
        },
        []
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};