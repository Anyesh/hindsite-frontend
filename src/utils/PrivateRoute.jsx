import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

const defaultState = { isAuthenticated: false };

const PrivateRoute = ({ auth, children }) =>
  auth.isAuthenticated === true ? children : <Navigate to='/login' replace />;

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

PrivateRoute.defaultProps = {
  auth: localStorage.getItem('state')
    ? JSON.parse(localStorage.state)
    : defaultState,
};

export default PrivateRoute;
