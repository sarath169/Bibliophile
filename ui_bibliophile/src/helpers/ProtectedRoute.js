import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { isAuthenticated } from './AuthHelper'

const ProtectedRoute = (props) => {
    // console.log(auth);
    return (
        isAuthenticated() ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoute
