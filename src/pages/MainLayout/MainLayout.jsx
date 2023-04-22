import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Sidebar2 from '../../components/sidebar2/Sidebar2';
import styles from "./styles.module.css";

const MainLayout = ({setLogged,children}) => {
  return (
    <div className={styles.container}>
      <Sidebar2 setLogged={setLogged}/>
      <Outlet/>
    </div>
  )
}

export default MainLayout