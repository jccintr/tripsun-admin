import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar2 from '../../components/sidebar2/Sidebar2';
import styles from "./styles.module.css";


const MainLayout = ({children}) => {

  return (
    <div className={styles.container}>
      <Sidebar2 />
      <Outlet/>
    </div>
  )
}

export default MainLayout