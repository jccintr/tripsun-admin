import React, {useRef} from 'react';
import {Input,Select,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,} from '@chakra-ui/react'

const ModalUsuario = ({isOpen,onClose,onSalvar,usuario,setUsuario,isLoading}) => {
  const initialRef = useRef(null)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Editando Usuário</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
         <form id="add" onSubmit={onSalvar}>
            <FormControl style={{marginBottom:10}}>
                <FormLabel>
                  Nome:
                </FormLabel>
                <Input 
                    value={usuario.name}
                    onChange={e => setUsuario({...usuario,name: e.target.value})}
                    placeholder='Nome do usuário...'
                    ref={initialRef}
                  />
            </FormControl>
            <FormControl style={{marginBottom:10}}>
                <FormLabel>
                  Telefone:
                </FormLabel>
                <Input 
                    value={usuario.telefone}
                    onChange={e => setUsuario({...usuario,telefone: e.target.value})}
                    placeholder='Telefone do usuário...'
                />
            </FormControl>
         </form>
      </ModalBody>
      <ModalFooter>
        <Button  isLoading={isLoading} loadingText="Salvando" type="submit" form="add" colorScheme='red' mr={3} >
          Salvar
        </Button>
    
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default ModalUsuario