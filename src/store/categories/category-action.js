import { createAction } from "../../utils/create-actions/create-action-for-reducers";
import { categoriesActionType } from "./category-action-types";

export const setCategories = (categoriesArray) => createAction(categoriesActionType.SET_CATEGORIES, categoriesArray);