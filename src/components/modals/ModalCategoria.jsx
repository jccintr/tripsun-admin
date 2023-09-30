import React,{useRef} from 'react';
import {Input,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,} from '@chakra-ui/react';

const ModalCategoria = ({isOpen,onClose,onSalvar,editando,categoria,setCategoria,isLoading}) => {
    const initialRef = useRef(null)
    const imgRef = useRef();

    const handlerImagem = (e) => {
        if(e.target.files[0]){
           imgRef.current.src = URL.createObjectURL(e.target.files[0]);
        }
        setCategoria({...categoria,imagem: e.target.files[0]})
      }


    return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{editando?'Editando':'Nova'} Categoria</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
          <form id="add" onSubmit={onSalvar}>
            <FormControl style={{marginBottom:10}} isRequired>
                <FormLabel>
                  Nome:
                </FormLabel>
                <Input
                    value={categoria.nome}
                    onChange={e => setCategoria({...categoria,nome: e.target.value})}
                    placeholder='Nome da categoria...'
                    ref={initialRef}
                  />
            </FormControl>

            <FormControl>
              <FormLabel>
                Imagem:
              </FormLabel>
              <input type="file" id="imagem" name="imagem" onChange={handlerImagem}/>
            </FormControl>

            <FormControl>
              <img  style={{marginTop:20,borderRadius:10}} className="imagem" ref={imgRef}/>
            </FormControl>

          </form>
      </ModalBody>

      <ModalFooter>
        <Button isLoading={isLoading} loadingText="Salvando" type="submit" form="add" colorScheme='red' mr={3} >
          Salvar
        </Button>

      </ModalFooter>
    </ModalContent>
  </Modal>
    );
}

export default ModalCategoria