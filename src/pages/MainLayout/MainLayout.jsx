import React from 'react'
import { Outlet } from 'react-router-dom';
//import Sidebar from '../../components/sidebar/Sidebar';
import Sidebar2 from '../../components/sidebar2/Sidebar2';
import styles from "./styles.module.css";
//import DataContext from '../../context/DataContext';

const MainLayout = ({children}) => {
 // const {setLogged} = useContext(DataContext);
  return (
    <div className={styles.container}>
      <Sidebar2 />
      <Outlet/>
    </div>
  )
}

export default MainLayout