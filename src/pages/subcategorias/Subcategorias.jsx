import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
//import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
//import "./subcategorias.scss";
import styles from "./styles.module.css";

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
const [idSubcategoria,setIdSubcategoria] = useState(null);
const [idCategoria,setIdCategoria] = useState(null);
const [nome,setNome] = useState('');
const [imagem,setImagem] = useState('');
const [marcador,setMarcador] = useState('');
const imgRef = useRef();
const marcadorRef = useRef();
//const navigate = useNavigate();
const toast = useToast();
const [filter,setFilter] = useState('');
const [editando,setEditando] = useState(false);
const initialRef = useRef(null)
const [isLoading,setIsLoading] = useState(false);



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
    setIsLoading(true);
    e.preventDefault();
    const fd = new FormData();
    
    fd.append('nome',nome);
    fd.append('categoria_id',idCategoria);
    fd.append('imagem',imagem);
    fd.append('marcador',marcador);

    
    if(!editando){
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
    setIsLoading(false);
  } else {
    let response = await Api.updateSubcategoria(idSubcategoria,fd);
    if(response.status===200){
      let json = await Api.getSubcategorias();
      setNome('');
      setImagem('');
      setSubcategorias(json);
      toast({
        title: 'Parabéns !',
        description: "Você atualizou uma Subcategoria.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
  } else {
    toast({
      title: 'Atenção !',
      description: "Campos obrigatórios não informados.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
  }
  setIsLoading(false);
  }
      
}
    
const handlerImagem = (e) => {

  if(e.target.files[0]){
    imgRef.current.src = URL.createObjectURL(e.target.files[0]);
    
  }
  
  setImagem(e.target.files[0]);

}
    
const handlerMarcador = (e) => {

  if(e.target.files[0]){
    marcadorRef.current.src = URL.createObjectURL(e.target.files[0]);
    
  }
  
  setMarcador(e.target.files[0]);

}

const onAdd = () => {
  setNome('');
  setImagem('');
  setIdCategoria(null);
  setIdSubcategoria(null);
  setEditando(false);
  onOpen();
  
}

const onEdit = async (id) => {
  let json = await Api.getSubcategoriabyId(id);
  setIdSubcategoria(json.id);
  setIdCategoria(json.categoria_id);
  setNome(json.nome);
  setImagem(`${Api.base_storage}/${json.imagem}`)
  setMarcador(`${Api.base_storage}/${json.marcador}`)
  setEditando(true);
  onOpen();
 }
    

    return (
        <div className={styles.subcategorias}>
           <Navbar onClick={onAdd} setFilter={setFilter} title="Subcategorias"/>
           <TableSubcategorias subCategorias={subcategorias} filter={filter} onEdit={onEdit}/>
           <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{editando?'Editando':'Nova'} Subcategoria</ModalHeader>
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
                                ref={initialRef}
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
                          <img   className={styles.imagem} ref={imgRef}/>
                        </FormControl>
                        <FormControl>
                          <FormLabel>
                            Marcador:
                          </FormLabel>
                          <input type="file" id="marcador" name="marcador" onChange={handlerMarcador}/>
                        </FormControl>
                      
                        <FormControl>
                          <img  className={styles.imagem} ref={marcadorRef}/>
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
        </div>
      )



}

export default Subcategorias