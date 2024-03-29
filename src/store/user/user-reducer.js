import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentUser: null,
};

// This is how we create a slice in redux-toolkit
// the name field is the namespace that we usually give in the action-types before the slash
// createSlice takes an object with keys 'name', 'initialState', 'reducers'
// initialState -> takes in the initial state of the user object
// reducers takes in the actions like setCurrentUser, setCartItems, etc all these are functions that takes in a state and an action
export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    }
});

// The userSlice.actions converts and returns the setCurrentUser in the correct action format like we wrote in redux,
// which means setCurrentUser function will return an action object to be dispatched
export const { setCurrentUser } = userSlice.actions;

// userSlice.reducer returns the correct userReducer function in the right format
// all of this is automated
export const userReducer = userSlice.reducer;