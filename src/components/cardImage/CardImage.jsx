import React from 'react'
import {Image,Button} from '@chakra-ui/react';
import styles from "./styles.module.css";
import Api from '../../Api';

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
                          <Button color='red' onClick={()=>deleteImage(imagem.id)}  >Excluir</Button>
                          </div>
  )
}

export default CardImage