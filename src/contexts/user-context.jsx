import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firbase-helper-functions";


// This is which we use for getting the stored context
// by using the useContext(UserContext) it returns an object of {currentUser, setCurrentUser}
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});


// We wrap the children inside the Usercontext.Provider inorder to get the values stored in the provider
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
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