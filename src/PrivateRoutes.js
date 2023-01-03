import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'


const PrivateRoutes = ({auth}) => {
  //let auth = {'token':true}
  
  return (
    auth ? <Outlet/>: <Navigate to='/'/>
  )
}

export default PrivateRoutes

