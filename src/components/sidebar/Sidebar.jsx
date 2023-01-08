import React from 'react'
import "./sidebar.scss";
import { Link,useNavigate } from "react-router-dom";
import logo from "../../assets/img_header-tripsun.png";
import { MdDashboard } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaTheaterMasks } from "react-icons/fa";


import { MdLocationOn } from "react-icons/md";
import { MdLogout } from "react-icons/md";

import { HiUsers } from "react-icons/hi";


const Sidebar = ({setLogged}) => {
    const navigate = useNavigate();


const onLogout = () => {
    setLogged(false);
  //  navigate('/');
}


  return (
    <div className='sidebar'>
        <div className="top">
            <img className="imgLogo" src={logo} alt="TripSun Logo" />
            <span className="logo">Módulo de Administração</span>
        </div>

        <div className="center">
            <ul>
            <Link to="/home" style={{ textDecoration: "none" }}>
                <li>
                    <MdDashboard className="icon" size={18} />
                    <span>Home</span>
                </li>
            </Link>
                <p className="title">CADASTROS</p>
                <Link to="/cidades" style={{ textDecoration: "none" }}>
                    <li>
                        <FaCity className="icon" size={18} />
                        <span>Cidades</span>
                    </li>
                </Link>
                <Link to="/categorias" style={{ textDecoration: "none" }}>
                <li>
                    <FaTheaterMasks className="icon" size={18} />
                    <span>Categorias</span>
                </li>
                </Link>
                <Link to="/subcategorias" style={{ textDecoration: "none" }}>
                <li>
                   <FaTheaterMasks className="icon" size={18} />
                    <span>Subcategorias</span>
                </li>
                </Link>
                <Link to="/parceiros" style={{ textDecoration: "none" }}>
                <li>
                   <FaHandshake className="icon" size={18} />
                    <span>Parceiros</span>
                </li>
                </Link>
                <Link to="/atividades" style={{ textDecoration: "none" }}>
                <li>
                    <MdLocationOn className="icon" size={18} />
                    <span>Atividades</span>
                </li>
                </Link>
               <Link to="/usuarios" style={{ textDecoration: "none" }}>
                    <li>
                        <HiUsers className="icon" size={18} />
                        <span>Usuários Clientes</span>
                    </li>
               </Link>
               <Link to="/usuarios" style={{ textDecoration: "none" }}>
                    <li>
                        <HiUsers className="icon" size={18} />
                        <span>Usuários Parceiros</span>
                    </li>
               </Link>
                <p className="title">OUTRAS OPÇÕES</p>
                <li onClick={onLogout}>
                    <MdLogout className="icon" size={18} />
                    <span>Sair</span>
                </li>
            </ul>
        </div>
        <div className="bottom"></div>
    </div>
  )
}

export default Sidebar
