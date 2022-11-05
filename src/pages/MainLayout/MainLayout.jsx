import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from "./styles.module.css";

const MainLayout = ({children}) => {
  return (
    <div className={styles.container}>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout