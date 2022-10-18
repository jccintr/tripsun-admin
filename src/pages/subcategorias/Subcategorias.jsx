import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import "./subcategorias.scss";

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

  import TableSubcategorias from '../../components/tableSubcategorias/TableSubcategorias';
  

const Subcategorias = () => {
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categorias,setCategorias] = useState([]);
  const [subcategorias,setSubcategorias] = useState([]);
  const [idCategoria,setIdCategoria] = useState([]);
  const [nome,setNome] = useState('');
  const [imagem,setImagem] = useState('');
  const [imagemCarregada,setImagemCarregada] = useState(false);
  const imgRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [filter,setFilter] = useState('');


    useEffect(()=>{
        const getSubcategorias = async () => {
        
           let json = await Api.getSubcategorias();
           setSubcategorias(json);
          
        }
        getSubcategorias();
      }, []);

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
        fd.append('categoria_id',idCategoria);
        fd.append('imagem',imagem);
       
        let response = await Api.addSubcategoria(fd);
        if(response.status===201){
           let json = await Api.getSubcategorias();
           setNome('');
           setIdCategoria('');
           setImagem('');
           setSubcategorias(json);
           toast({
            title: 'Parabéns !',
            description: "Você adicionou uma nova subcategoria.",
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
        <div className="subcategorias">
           <Navbar onClick={onOpen} setFilter={setFilter} title="Subcategorias"/>
          <div className="subcategoriasContainer">
             <TableSubcategorias subCategorias={subcategorias} filter={filter}/>
            <div className="gridContainer">
             
            </div>
         
          </div>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Nova Subcategoria</ModalHeader>
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
                            placeholder='Nome da subcategoria...'
                          />
                    </FormControl>
                    <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Pertence a Categoria:
                    </FormLabel>
                    <Select 
                        placeholder='Selecione uma categoria'
                        value={idCategoria}
                        onChange={e => setIdCategoria(e.target.value)}>
                          {categorias.map((categoria)=> (
                            <option value={categoria.id}>{categoria.nome}</option>
                          ))}
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

export default Subcategorias