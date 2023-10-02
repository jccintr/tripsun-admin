import React from 'react'
import {Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Center,Text,HStack,Grid} from '@chakra-ui/react';
import CardImage from '../cardImage/CardImage';

const ModalImagensAtividade = ({isOpen,onClose,imagens,handlerImagem,deleteImage}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imagens da Atividade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form id="imagens" onSubmit={onClose}>
          {imagens.length > 0 ? <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          {imagens.map((imagem)=> (<CardImage key={imagem.id} imagem={imagem} deleteImage={deleteImage}/>))}

          </Grid> :  <HStack justify='center' align='center'><Text fontSize='16px' color='red'>Nenhuma imagem encontrada.</Text></HStack>}

             
               <Center>
                  <label style={{marginTop: 10,marginBottom: 10,color: '#000',borderWidth: 1,borderStyle:'dashed',borderColor:'#000',bordeRadius: 5,fontWeight: 'bold',padding:20}} for="imagem">Adicionar Imagem</label>
                  <input style={{display: 'none'}} type="file" accept='image/*' id="imagem" name="imagem" onChange={handlerImagem}/>
                </Center>
               
            </form>
            
          </ModalBody>

          <ModalFooter>
          <Button onClick={onClose} colorScheme='red' mr={3} >
            Fechar
          </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ModalImagensAtividade