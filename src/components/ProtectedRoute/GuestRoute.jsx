import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function GuestRoute({children}) {
     const {userToken} = useContext(authContext)
if (userToken ) {        
    return <Navigate to="/Home" />
    }
  return (
    <>
      {children}
    </>
  )
}
