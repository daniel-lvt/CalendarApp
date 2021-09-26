import { combineReducers } from "redux"
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer"
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    uid: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    user: userReducer
});

