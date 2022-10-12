import React ,{ useState, useEffect } from 'react'
import Api from '../../Api';
import CardCity from '../../components/cardcity/CardCity';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from "react-router-dom";

import "./cidades.scss";





const Cidades = () => {
  const [cidades,setCidades] = useState([]);
  const navigate = useNavigate();


  useEffect(()=>{
    const getCidades = async () => {
    
       let json = await Api.getCidades();
       setCidades(json);
    }
    getCidades();
  }, []);





  return (
    <div className="cidades">
     
     <Navbar/>
      <div className="cidadesContainer">
        <div className="gridContainer">

       
          {cidades.map((cidade) => (
               <CardCity key={cidade.id} cidade={cidade}/>
             
               
              ))}
           </div>
     
        </div>
    </div>
  )
}

export default Cidades