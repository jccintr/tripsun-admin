import React from 'react'
import {Image,Button} from '@chakra-ui/react';
import styles from "./styles.module.css";
import Api from '../../Api';

const CardImage = ({url}) => {
  return (
    <div className={styles.container}>
                            <Image
                            boxSize='100px'
                            borderRadius='10px'
                            objectFit='cover'
                            src={`${Api.base_storage}/${url}`}
                            alt={url}
                          />
                          <Button color='red'  >Excluir</Button>
                          </div>
  )
}

export default CardImage