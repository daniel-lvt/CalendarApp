import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadInformationUserLockeds, updatedInformationUser } from '../../../actions/users';
import { fDateTimeSuffix } from '../../../utils/formatTime.js';
import Swal from "sweetalert2";

export const TableUserBlock = () => {


    const dispatch = useDispatch();
    const { usersLocked: { users, isUsers } } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(loadInformationUserLockeds())
    }, [dispatch])

    if (isUsers) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    } else {

        const data = users[0];

        const updateUserBlock = (id) => {

            Swal.fire({
                title: 'Estas seguro?',
                text: `Se desbloqueara un usuario`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Desbloquear!'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updatedInformationUser(id))
                }
            })
        }

        return (
            <div className="card">
                <div className="card-body">
                    <h5 className='pb-2'>Usuarios Bloqueados</h5>
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Fecha de Bloqueo</th>
                                <th scope="col">Ip de bloqueo</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(({ name, email, dateLocked, ipLocked, uid }, idx) => (
                                    <tr key={uid}>
                                        <th scope="row">{(idx + 1)}</th>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{fDateTimeSuffix(dateLocked)}</td>
                                        <td>{ipLocked}</td>
                                        <td>
                                            <button
                                                type="button"
                                                class="btn btn-outline-warning btn-rounded waves-effect"
                                                onClick={e => updateUserBlock(uid)}
                                            >
                                                <small><i class="fas fa-undo-alt pr-2"></i>Desbloquear</small>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
