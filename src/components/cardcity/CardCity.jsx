import React from 'react';
import Api from '../../Api';
import './cardcity.scss';


const CardCity = ({cidade}) => {
    return (
        <div className="cityCard">
            <img className="cityImage" src={`${Api.base_storage}/${cidade.imagem}`} alt={cidade.nome} />
            <p className="cityNameText">{cidade.nome}</p>
           
        </div>
   
     );
}

export default CardCity