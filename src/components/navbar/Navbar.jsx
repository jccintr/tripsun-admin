import React from 'react'
import "./navbar.scss";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <div className="wrapper">
            <div className="title">
              <p>Cidades</p>
            </div>  
            <div className="search">
                <input type="text" placeholder="Pesquisar..." />
                <FaSearch className="icon" size={18} /> 
            </div>
            <button className="buttonAdd" onClick={()=>{navigate('/cidades/add');}}>Adicionar</button>
      </div>
    </div>
  )
}

export default Navbar