import React from 'react'
import {Image,Button} from '@chakra-ui/react';
import styles from "./styles.module.css";
import Api from '../../Api';
import { FaRegTrashAlt } from "react-icons/fa";

const CardImage = ({imagem, deleteImage}) => {
  return (
    <div className={styles.container}>
                            <Image
                            boxSize='100px'
                            borderRadius='10px'
                            objectFit='cover'
                            src={`${Api.base_storage}/${imagem.imagem}`}
                            alt={imagem.imagem}
                          />
                          
                          <FaRegTrashAlt title="Excluir imagem" onClick={()=>deleteImage(imagem.id)} className={styles.icone} size={18} />
                          </div>
  )
}

export default CardImage


