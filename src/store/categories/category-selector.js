// Using reselect library to implement the memoization concept
// we memoiz the categoriesSelector so that the categoriesMap gets cached
// we do this because if we dont cache the categoriesMap, everytime we use the categoriesSelector for 
// obtaining the categoriesMap we re-render the entire component because each time we are initializing
// and then assinging the accumulator using reduce operation
// but here if we memoiz the categoriesMap first time renders but then later it remains cached
// so that react comes to know that it is the same object as previous and doesnt initialze the accumulator
// from beginging and hence doesnt re-render

import { createSelector } from "reselect";

// First we fetch the category from the universal state object
const selectCategoryReducer = (state) => state.category;

// Now we use memoiz selector using createSelector
// createSelector has two parameters =>
// 1. input selector (it is a list)
// 2. output selector (it is a callback function)
export const selectCategoriesArray = createSelector(
    [selectCategoryReducer],
    // here category is the ouput we get from selectCategoryReducer i.e., the state.category, it is from
    // that category we extract the categoriesArray (this is memoized that means once initialised
    // until its value changes it remains cached and doesnt run and re-render the code again and again)
    (category) => category.categoriesArray,
);

// Now it is in this selector we reduce the categoriesArray and send back the modified categoryMap
export const selectCatgoryMap = createSelector(
    [selectCategoriesArray],
    (catgeoriesArray) => catgeoriesArray
        .reduce(
            (acc, category) => {
                const { title, items } = category;
                acc[title.toLowerCase()] = items;
                return acc;
            },
            {} // -> inital value of the accumulator
        )
);