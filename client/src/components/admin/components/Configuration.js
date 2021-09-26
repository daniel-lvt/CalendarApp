import React from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../../../hooks/useForm';
import { elements } from './elements';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { startUpdatedPassword } from '../../../actions/auth';

export const Configuration = () => {

    const dispatch = useDispatch();

    const { rol } = useSelector(state => state.auth)

    const [formValues, handleInputChange] = useForm({
        valueSelect: 1,
        password1: "",
        password2: ""
    });

    const { valueSelect, password1, password2 } = formValues;

    const onClickElementUpdated = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: `Se actualizara el contenido el tiempo de la sesion de los usuarios a ${elements[valueSelect - 1].name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Aceptar!'
        }).then((result) => {
            if (result.isConfirmed) {

            }
        })
    }

    const onClickElementUpdatedPassword = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: `Se actualizara la contraseña`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Aceptar!'
        }).then((result) => {
            if (result.isConfirmed) {

                if (!validator.equals(password1, password2)) {
                    Swal.fire('Aviso', 'Las contraseñas no son iguales', 'warning');
                    return
                }
                if (!validator.isStrongPassword(password1, {
                    minLength: 8, minLowercase: 2,
                    minUppercase: 1, minNumbers: 2, minSymbols: 2
                })) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'La contraseña no cumple con los parametros minimos',
                        footer: '<small>Debe de contener mayusculas, minusculas, numeros, simbolos,  longitud mayor a 8</small>'
                    })
                    return
                }
                dispatch(startUpdatedPassword(rol, password1));
            }
        })
    }

    return (
        <>
            <div className="alert alert-secondary" role="alert">
                Configuracion
                <br />
                <small className="pb-5">Todas las acciones realizadas en esta seccion afectaran la pagina principal</small>
            </div>
            <div className="card mb-2">
                <div className="card-body">
                    <h5 className="card-title">💻</h5>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Tiempo de Sesion</h5>
                                    <small>Tiempo de sesion para los usuarios del sistema</small>
                                    <p className="card-text">Tiempo Actual</p>

                                    <small className='mr-4'>Actualizar Tiempo</small>
                                    <select
                                        className="form-select form-select-sm mb-4"
                                        aria-label=".form-select-sm example"
                                        name='valueSelect'
                                        value={valueSelect}
                                        onChange={handleInputChange}
                                    >
                                        {
                                            elements.map(({ name, value }, idx) => (
                                                <option
                                                    key={idx}
                                                    value={value}
                                                >{name}</option>
                                            ))
                                        }
                                    </select>
                                    <br />
                                    <button
                                        className='btn btn-primary btn-sm '
                                        onClick={onClickElementUpdated}
                                    >
                                        Actualizar Tiempo
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Proyecto Auditoria de Sistemas</h5>
                                    <small>
                                        <p className="card-text mb-2">Integrantes</p>
                                    </small>
                                    <ul className="list-group">
                                        <li className="list-group-item">🦍 Daniel Yecid Gomez Aguirre</li>
                                        <li className="list-group-item">🐺 Kevin Patiño</li>
                                        <li className="list-group-item">🐧 Daniel Daza</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Cambio de Contraseña</h5>
                                    <small>
                                        <p className="card-text mb-2">Actualizar contraseña usuario Administrador</p>
                                    </small>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">🛸</span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            name='password1'
                                            value={password1}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="input-group mb-2">
                                        <span className="input-group-text">🛸</span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            aria-label="Dollar amount (with dot and two decimal places)"
                                            name='password2'
                                            value={password2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <br />
                                    <button
                                        className='btn btn-primary btn-sm '
                                        onClick={onClickElementUpdatedPassword}
                                    >
                                        Actualizar Contraseña
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
