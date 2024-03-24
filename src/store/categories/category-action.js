import { createAction } from "../../utils/create-actions/create-action-for-reducers";
import { categoriesActionType } from "./category-action-types";

export const setCategoriesMap = (categoriesMap) => createAction(categoriesActionType.SET_CATEGORIES_MAP, categoriesMap);