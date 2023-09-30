import React,{useRef} from 'react';
import {Input,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,Select} from '@chakra-ui/react';

const ModalSubcategoria = ({isOpen,onClose,onSalvar,editando,subCategoria,setSubcategoria,categorias,isLoading}) => {
    const initialRef = useRef(null)
    const imgRef = useRef();
    const marcadorRef = useRef();

    const handlerImagem = (e) => {
        if(e.target.files[0]){
           imgRef.current.src = URL.createObjectURL(e.target.files[0]);
        }
        setSubcategoria({...subCategoria,imagem: e.target.files[0]})
      }

               
      const handlerMarcador = (e) => {
      
        if(e.target.files[0]){
          marcadorRef.current.src = URL.createObjectURL(e.target.files[0]);
          
        }
        setSubcategoria({...subCategoria,marcador: e.target.files[0]})
        
      }


    return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{editando?'Editando':'Nova'} Subcategoria</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
          <form id="add" onSubmit={onSalvar}>
            <FormControl style={{marginBottom:10}} isRequired>
                <FormLabel>
                  Nome:
                </FormLabel>
                <Input
                    value={subCategoria.nome}
                    onChange={e => setSubcategoria({...subCategoria,nome: e.target.value})}
                    placeholder='Nome da subcategoria...'
                    ref={initialRef}
                  />
            </FormControl>
            <FormControl style={{marginBottom:10}} isRequired>
                <FormLabel>
                    Pertence a Categoria:
                </FormLabel>
                <Select 
                    placeholder='Selecione uma categoria'
                    value={subCategoria.categoria_id}
                    onChange={e => setSubcategoria({...subCategoria,categoria_id: e.target.value})}>
                       {categorias.map((categoria)=> (<option value={categoria.id}>{categoria.nome}</option>))}
                </Select>
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

            <FormControl>
                <FormLabel>
                Marcador:
                </FormLabel>
                <input type="file" id="marcador" name="marcador" onChange={handlerMarcador}/>
            </FormControl>
            
            <FormControl>
                <img  ref={marcadorRef}/>
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

export default ModalSubcategoria