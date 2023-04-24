import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import DataContext from './context/DataContext'
import { useContext } from "react";

const PrivateRoutes = () => {
  const {logged} = useContext(DataContext);
  //let auth = {'token':true}
  
  return (
    logged ? <Outlet/>: <Navigate to='/'/>
  )
}

export default PrivateRoutes

