import React, {useRef} from 'react';
import {Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Center} from '@chakra-ui/react';
import Api from '../../Api';
import { FaImage } from "react-icons/fa";


const ModalIconeAtividade = ({isOpen,onClose,onSalvar,icone,handlerIcone,novoIconeScreen,isLoading}) => {

    


  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Icone da Atividade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           
            <form id="addIcone" onSubmit={onSalvar}>
            <Center>
             {icone==null?<FaImage  className="icon" size={100}/>:<img style={{width: 200,height: 200,borderRadius: 10,marginBottom: 10}}  src={`${Api.base_storage}/${icone}`} />}
             </Center>
             <Center>
                <label for="icone" style={{marginTop: 10,marginBottom: 10,color: '#000',borderWidth: 1,borderStyle:'dashed',borderColor:'#000',bordeRadius: 5,fontWeight: 'bold',padding:20}}> Selecione o novo icone da atividade</label>
                <input style={{display: 'none'}} type="file" accept='image/*' id="icone" name="icone" onChange={handlerIcone}/>
                
             </Center>
             <Center>
             {novoIconeScreen&&<img style={{width: 200,height: 200,borderRadius: 10,marginBottom: 10}}  src={novoIconeScreen} alt=""/>}
             </Center>
            </form>
            
          </ModalBody>
 
          <ModalFooter>
          <Button isLoading={isLoading} loadingText="Salvando" type="submit" form="addIcone" colorScheme='red' mr={3} >
            Salvar
          </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default ModalIconeAtividade