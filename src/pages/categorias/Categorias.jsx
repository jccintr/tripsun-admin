import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import "./categorias.scss";

import {useDisclosure,Input,Select,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    AlertDescription,
  } from '@chakra-ui/react';

  import TableCategorias from '../../components/tableCategorias/TableCategorias';
  

const Categorias = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categorias,setCategorias] = useState([]);
  const [nome,setNome] = useState('');
  const [imagem,setImagem] = useState('');
  const [imagemCarregada,setImagemCarregada] = useState(false);
  const imgRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [filter,setFilter] = useState('');


    useEffect(()=>{
        const getCategorias = async () => {
        
           let json = await Api.getCategorias();
           setCategorias(json);
           
        }
        getCategorias();
      }, []);

      const onSalvar = async (e) => {
        e.preventDefault();
        const fd = new FormData();
       
    
        fd.append('nome',nome);
        fd.append('imagem',imagem);
       
        let response = await Api.addCategoria(fd);
        if(response.status===201){
           let json = await Api.getCategorias();
           setNome('');
         
           setImagem('');
           setCategorias(json);
           toast({
            title: 'Parabéns !',
            description: "Você adicionou uma nova categoria.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onClose();
       } else {
        toast({
          title: 'Atenção !',
          description: "Preencha todos os campos por favor.",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
    
       }
      
        
    }
    
    const handlerImagem = (e) => {
    
      if(e.target.files[0]){
        imgRef.current.src = URL.createObjectURL(e.target.files[0]);
        setImagemCarregada(true);
      }
     
      setImagem(e.target.files[0]);
    
    }
    
   
    

    return (
        <div className="categorias">
           <Navbar onClick={onOpen} setFilter={setFilter} title="Categorias"/>
          <div className="categoriasContainer">
             <TableCategorias categorias={categorias} filter={filter}/>
            <div className="gridContainer">
             
            </div>
         
          </div>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Nova Categoria</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                 <form id="add" onSubmit={onSalvar}>
                    <FormControl style={{marginBottom:10}}>
                        <FormLabel>
                          Nome:
                        </FormLabel>
                        <Input 
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder='Nome da categoria...'
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
                <Button type="submit" form="add" colorScheme='red' mr={3} >
                  Salvar
                </Button>
               
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )



}

export default Categorias