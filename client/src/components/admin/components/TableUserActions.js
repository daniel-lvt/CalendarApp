import React from 'react'

export const TableUserActions = () => {
    return (
        <div className="card mt-5">
            <div className="card-body">
                <h5 className='pb-2'>Logs de Actividad</h5>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Fecha de Bloqueo</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>
                                <button type="button" class="btn btn-outline-warning btn-rounded waves-effect">
                                    <small><i class="fas fa-undo-alt pr-2"></i>Desbloquear</small>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>
                                <button type="button" class="btn btn-outline-warning btn-rounded waves-effect">
                                    <small><i class="fas fa-undo-alt pr-2"></i>Desbloquear</small>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td>
                                <button type="button" class="btn btn-outline-warning btn-rounded waves-effect">
                                    <small><i class="fas fa-undo-alt pr-2"></i>Desbloquear</small>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
