import React, { useRef, useState } from 'react'
import "./addcidade.scss";
import Api from '../../Api';
import { useNavigate } from "react-router-dom";

const AddCidade = () => {
    const [nome,setNome] = useState('');
    const [estado,setEstado] = useState('')
    const [imagem,setImagem] = useState('');
    const imgRef = useRef();
    const navigate = useNavigate();





    const onSalvar = async (e) => {
        e.preventDefault();
        const fd = new FormData();
       
        fd.append('nome',nome);
        fd.append('estado',estado);
        fd.append('imagem',imagem);
       
        let response = await Api.addCidade(fd);
        if(response.status===201){
          navigate('/cidades')
        }
        
    }

    const handlerImagem = (e) => {

      if(e.target.files[0]){

        imgRef.current.src = URL.createObjectURL(e.target.files[0]);
      }
      setImagem(e.target.files[0]);

    }






    return (
        <div className="addCidade">
         
         
          <div className="addCidadeContainer">
               <h1>Nova Cidade</h1>
               <form className="form" onSubmit={onSalvar} accept="image/*">
                   <label htmlFor='nome'>Nome:</label>
                    <input type="text" id="nome" value={nome} placeholder="Nome da cidade..." onChange={e => setNome(e.target.value)}/>
                    <br/>
                    <label htmlFor='estado'>Estado:</label>
                    <input type="text" id="estado" value={estado} placeholder="Estado..." onChange={e => setEstado(e.target.value)} />
                    <br/>
                   
                    <label htmlFor='imagem'>Imagem:</label>
                    <input type="file" id="imagem" name="imagem" onChange={handlerImagem}/>
                    <img  ref={imgRef}/>
                    
                    <button type="submit">Salvar</button>
               </form>
          </div>
        </div>
      )
}

export default AddCidade