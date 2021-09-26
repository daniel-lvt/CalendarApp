import { types } from '../types/types';

const initialState = {
    events: [],
    activeEvent: null
}


export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(x => {
                    if (x.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return x;
                    }
                })
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(x => (x.id !== state.activeEvent.id)),
                activeEvent: null
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        
        case types.eventLogout:
            return{
                ...initialState
            }
        default:
            return state;
    }
}