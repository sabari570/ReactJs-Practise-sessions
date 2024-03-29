import { createSlice } from "@reduxjs/toolkit";

const CATEGORIES_INITIAL_STATE = {
    categoriesArray: []
};

const categorySlice = createSlice({
    name: 'category',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        setCategories: (state, action) => {
            state.categoriesArray = action.payload;
        },
    }
});
// getting the automatically generated category-actions
export const { setCategories } = categorySlice.actions;

// getting the automatically generated category-reducer
export const categoriesReducer = categorySlice.reducer;