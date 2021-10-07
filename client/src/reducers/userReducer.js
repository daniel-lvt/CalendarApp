import { types } from "../types/types";

const initialState = {
    usersLocked: {
        users: [],
        isUsers: true
    },
    logsInfo: {
        logs: [],
        isLogs: true
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

        case types.userLoadedLogs:
            return {
                ...state,
                logsInfo: {
                    ...state.logsInfo,
                    logs: [action.payload],
                    isLogs: false
                }
            }

        default:
            return state;
    }
}