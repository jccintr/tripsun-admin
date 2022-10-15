import React from 'react'
import "./navbar.scss";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';


const Navbar = ({onClick}) => {
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
            <Button color='red'  onClick={onClick}>Adicionar</Button>
      </div>
    </div>
  )
}

export default Navbar