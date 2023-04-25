import React from 'react'

import logo from "../../assets/logo_tripsun.png";
import styles from "./styles.module.css";

const Home = () => {
 
  return (
    
     <div className={styles.container}>
        <img className={styles.logo} src={logo} alt="logo tripsun" />
    </div>
  
  )
}

export default Home