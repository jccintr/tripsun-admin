import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'


const PrivateRoutes = ({logged}) => {
  //let auth = {'token':true}
  
  return (
    logged ? <Outlet/>: <Navigate to='/'/>
  )
}

export default PrivateRoutes

