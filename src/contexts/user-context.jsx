import { createContext, useState } from "react";


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

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};