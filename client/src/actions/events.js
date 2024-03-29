import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;
        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if (!body.ok) {
                window.location.reload('/login')
                Swal.fire('Aviso','El tiempo de sesion ha caducado', 'warning');
            }

            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew(event));
            }
        } catch (error) {
            console.log(error)
        }
    }
}

const eventAddNew = (event) => {
    return {
        type: types.eventAddNew,
        payload: event
    }
}
export const eventSetActive = (event) => {

    return {
        type: types.eventSetActive,
        payload: event
    }
}

export const eventsClearActive = () => {
    return {
        type: types.eventClearActiveEvent
    }
}


export const eventStartUpdate = (event) => {
    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            if (!body.ok) {
                window.location.reload('/login')
                Swal.fire('Aviso','El tiempo de sesion ha caducado', 'warning');
            }
            if (body.ok) {
                // no se actualiza directo, revisar
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}


const eventUpdated = (event) => {
    return {
        type: types.eventUpdated,
        payload: event
    }
}

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        try {
            const { id } = getState().calendar.activeEvent;
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (!body.ok) {
                window.location.reload('/login')
                Swal.fire('Aviso','El tiempo de sesion ha caducado', 'warning');
            }
            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const eventDeleted = () => {
    return {
        type: types.eventDeleted
    }
}

export const eventsStartLoading = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('events');
        const body = await resp.json();
        if (!body.ok) {
            window.location.reload('/login');
            Swal.fire('Aviso','El tiempo de sesion ha caducado', 'warning');
        }
        const events = prepareEvents(body.events)

        dispatch(eventLoaded(events))

    }
}

const eventLoaded = (events) => {
    return {
        type: types.eventLoaded,
        payload: events
    }
}

export const eventLogout = () => {
    return {
        type: types.eventLogout
    }
}
