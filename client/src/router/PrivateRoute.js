import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AdminScreen } from '../components/admin/AdminScreen';

export const PrivateRoute = ({
    isAuthenticated,
    ...rest
}) => {

    const { rol } = useSelector(state => state.auth);

    if (rol === 'USER_ROLE') {
        return (
            <Route
                {...rest}
                component={() => (
                    (isAuthenticated)
                        ? <CalendarScreen />
                        : (<Redirect to="/login" />)
                )
                }
            />
        )
    } else if (rol === 'ADMIN_ROL') {
        return (
            <Route
                {...rest}
                component={() => (
                    (isAuthenticated)
                        ? <AdminScreen />
                        : (<Redirect to="/login" />)
                )
                }
            />
        )
    } else {
        return (
            <Route
                {...rest}
                component={() => (
                    (isAuthenticated)
                        ? <AdminScreen />
                        : (<Redirect to="/login" />)
                )
                }
            />
        )
    }

}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}