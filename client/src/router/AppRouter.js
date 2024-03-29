import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { startCheking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { uid } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startCheking());
    }, [dispatch]);

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={!!uid}
                        path="/login"
                        component={LoginScreen}
                        exact
                    />
                    <PrivateRoute
                        isAuthenticated={!!uid}
                        path='/'
                        exact
                    />
                </Switch>
            </div>
        </Router>
    )

}
