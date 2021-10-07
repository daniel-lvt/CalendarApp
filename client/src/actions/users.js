import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const loadInformationUserLockeds = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('users/', undefined, 'GET', 'ADMIN_ROLE');
        const body = await resp.json();
        if (body?.ok) {
            dispatch(informationUserLockeds(body.users))
        }
    }
}

const informationUserLockeds = (users) => {
    return {
        type: types.userLoaded,
        payload: users
    }
}

export const updatedInformationUser = (id) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`users/${id}`, undefined, 'POST', 'ADMIN_ROLE');
        const body = await resp.json();
        if (body?.ok) {
            Swal.fire('Aviso', 'El usuario ha sido desbloqueado', 'success');
            dispatch(loadInformationUserLockeds());
        }
    }
}

export const updatedTimeSesion = (time) => {
    return async () => {
        const resp = await fetchConToken('config', time, 'POST', 'ADMIN_ROLE');
        const body = await resp.json();
        if (body?.ok) {
            Swal.fire('Aviso', body.msg, 'success');
        }
    }
}

export const loadInformationLogs = () => {
    return async (dispatch) => {
        const resp = await fetchConToken('config', undefined, 'GET', 'ADMIN_ROLE');
        const body = await resp.json();
        if (body?.ok) {
            dispatch(informationLogs(body?.data));
        }
    }
}

const informationLogs = (information) => {
    return {
        type: types.userLoadedLogs,
        payload: information
    }
}