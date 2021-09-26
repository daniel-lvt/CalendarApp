import { types } from "../types/types";

const initialState = {
    usersLocked: {
        users: [],
        isUsers: true
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.userLoaded:
            return {
                ...state,
                usersLocked: {
                    ...state.usersLocked,
                    users: [action.payload],
                    isUsers: false
                }
            }

        default:
            return state;
    }
}