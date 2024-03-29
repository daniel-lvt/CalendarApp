import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const NavBar = ({ information }) => {

    const { name } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {
                    (information) ?
                        <span className='text-danger'>{information}</span>
                        :
                        ''
                }
                {name[0].toUpperCase() + name.slice(1)}
            </span>
            <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
