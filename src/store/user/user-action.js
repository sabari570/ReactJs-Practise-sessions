// This is very similar to the setCurrentUser function written while we implemented reducers
// the only difference is instead of dispatching the action we actually return the action

import { createAction } from "../../utils/create-actions/create-action-for-reducers";
import { userActionTypes } from "./user-action-types";

export const setCurrentUser = (user) => {
    return createAction( userActionTypes.SET_CURRENT_USER, user );
};