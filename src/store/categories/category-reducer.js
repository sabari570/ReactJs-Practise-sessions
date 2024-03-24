import { categoriesActionType } from "./category-action-types";

const CATEGORIES_INITIAL_STATE = {
    categoriesArray: []
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch(type){
        case categoriesActionType.SET_CATEGORIES:
            return {
                ...state,
                categoriesArray: payload,
            };
        default: return state;
    }
};