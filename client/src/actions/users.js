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