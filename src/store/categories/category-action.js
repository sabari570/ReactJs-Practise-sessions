import { createAction } from "../../utils/create-actions/create-action-for-reducers";
import { getCategoriesAndDocuments } from "../../utils/firebase/firbase-helper-functions";
import { categoriesActionType } from "./category-action-types";

export const setCategories = (categoriesArray) =>
  createAction(categoriesActionType.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
  createAction(categoriesActionType.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(categoriesActionType.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) =>
  createAction(categoriesActionType.FETCH_CATEGORIES_FAILED, error);

// This is the thunk we create to dispatch an action
// it is a function that returns a function that returns a dispatch
// the function returned is an async function
// Thunk functions always have Async at the end of their function name (not mandatory just a naming convention)
export const fetchCategoriesAsync = () => async (dispatch) => {
    // before fetching we actually set isLoading to true using the fetchCategoriesStart()
    dispatch(fetchCategoriesStart());
  try {
    const categoriesArray = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
};
