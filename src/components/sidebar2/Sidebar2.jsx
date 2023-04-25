import React, {useState,useContext} from 'react'
//import "./sidebar.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/img_header-tripsun.png";
import { MdDashboard,MdLocationOn,MdLogout } from "react-icons/md";
import { FaCity,FaHandshake,FaTheaterMasks,FaCalendarAlt,FaBars } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import styles from "./styles.module.css";
import DataContext from '../../context/DataContext';

const Sidebar2 = () => {
    const {setLogged} = useContext(DataContext);
    const[isOpen ,setIsOpen] = useState(true);
    //const navigate = useNavigate();


const onLogout = () => {
    setLogged(false);
}


return (
    <div style={{width: isOpen ? "300px" : "50px"}} className={styles.sidebar}>
        <div className={styles.top}>
            <img style={{display: isOpen ? "block" : "none"}} className="imgLogo" src={logo} alt="TripSun Logo" />
            <span style={{display: isOpen ? "block" : "none"}} className={styles.title}>Módulo de Administração</span>
            <FaBars className={styles.icon} onClick={()=>setIsOpen(!isOpen)} size={24}/>
        </div>

        <div className={styles.center}>
            <ul className={styles.menu}>
             {/*
             <Link to="/home" style={{ textDecoration: "none" }} >
                <li title="Home" className={styles.menuItem}>
                    <MdDashboard className={styles.icon} size={24} />
                    <span style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Home</span>
                </li>
            </Link>

             */}   
            
                <p style={{display: isOpen ? "block" : "none"}} className={styles.subtitle}>CADASTROS</p>
                <Link to="/cidades" style={{ textDecoration: "none" }} >
                    <li title="Cadastro de Cidades" className={styles.menuItem}>
                        <FaCity className={styles.icon} size={24} />
                        <span style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Cidades</span>
                    </li>
                </Link>
                <Link to="/categorias" style={{ textDecoration: "none" }} >
                <li title="Cadastro de Categorias" className={styles.menuItem}>
                    <FaTheaterMasks className={styles.icon} size={24} />
                    <span  style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Categorias</span>
                </li>
                </Link>
                <Link to="/subcategorias" style={{ textDecoration: "none" }}>
                <li title="Cadastro de Subcategorias" className={styles.menuItem}>
                   <FaTheaterMasks className={styles.icon} size={24} />
                    <span  style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Subcategorias</span>
                </li>
                </Link>
                <Link to="/parceiros" style={{ textDecoration: "none" }}>
                <li title="Cadastro de Parceiros" className={styles.menuItem}>
                   <FaHandshake className={styles.icon} size={24} />
                    <span  style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Parceiros</span>
                </li>
                </Link>
                <Link to="/atividades" style={{ textDecoration: "none" }}>
                <li title="Cadastro de Atividades" className={styles.menuItem}>
                    <MdLocationOn className={styles.icon} size={24} />
                    <span style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Atividades</span>
                </li>
                </Link>
               <Link to="/usuarios" style={{ textDecoration: "none" }}>
                    <li title="Cadastro de Clientes" className={styles.menuItem}>
                        <HiUsers className={styles.icon} size={24} />
                        <span  style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Clientes</span>
                    </li>
               </Link>
               
               <p style={{display: isOpen ? "block" : "none"}} className={styles.subtitle}>MOVIMENTAÇÃO</p>
               <Link to="/agendamentos" style={{ textDecoration: "none" }}>
                    <li title="Agendamentos" className={styles.menuItem}>
                        <FaCalendarAlt className={styles.icon} size={24} />
                        <span  style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Agendamentos</span>
                    </li>
               </Link>
                <p  style={{display: isOpen ? "block" : "none"}} className={styles.subtitle}>OUTRAS OPÇÕES</p>
                <li title="Sair" onClick={onLogout} className={styles.menuItem}>
                    <MdLogout className={styles.icon} size={24} />
                    <span style={{display: isOpen ? "block" : "none"}} className={styles.menuItemText}>Sair</span>
                </li>
            </ul>
        </div>
        <div className="bottom"></div>
    </div>
  )
}

export default Sidebar2