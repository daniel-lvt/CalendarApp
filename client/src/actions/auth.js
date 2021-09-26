import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
                rol: body.rol
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}


export const startRegister = (email, password, name) => {

    return async (dispatch) => {

        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
                rol: body.rol
            }));

        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}


const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    }
}

export const startCheking = () => {
    return async (dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));

        } else {
            dispatch(chekingFinish())
        }

    }
}

const chekingFinish = () => {
    return {
        type: types.authCheckingFinish
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());
    }
}

const logout = () => {
    return {
        type: types.authLogout
    }
}

export const startUpdatedPassword = (rol, password) => {
    return async () => {

        const resp = await fetchConToken('auth/', { password }, 'PUT', rol);
        const body = await resp.json();
        if (body.ok) {
            Swal.fire('Aviso', body.msg, 'success');
        }
    }
}