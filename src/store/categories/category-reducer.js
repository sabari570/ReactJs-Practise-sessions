import { categoriesActionType } from "./category-action-types";

// isLoading and the error state values are added for the redux-thunk integrations
const CATEGORIES_INITIAL_STATE = {
  categoriesArray: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  const { type, payload } = action;
  switch (type) {
    case categoriesActionType.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case categoriesActionType.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesArray: payload,
        isLoading: false,
      };
    case categoriesActionType.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
