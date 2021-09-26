import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import './login.css';

//Cuenta12345#$

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: '',
        lPassword: ""
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: "",
        rPassword2: "",

    });

    const { lEmail, lPassword } = formLoginValues;

    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (!validator.equals(rPassword2, rPassword1)) {
            Swal.fire('Aviso', 'Las contraseñas no son iguales', 'warning');
            return
        }
    
        if (!validator.isStrongPassword(rPassword1, {
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
        dispatch(startRegister(rEmail, rPassword1, rName));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                                required={true}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                value={rPassword1}
                                onChange={handleRegisterInputChange}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                                required={true}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}