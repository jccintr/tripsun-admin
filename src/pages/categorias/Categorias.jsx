import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast,Spinner } from '@chakra-ui/react'
import styles from "./styles.module.css";
import {useDisclosure,Input,Select,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,} from '@chakra-ui/react';
import TableCategorias from '../../components/tableCategorias/TableCategorias';


const Categorias = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categorias,setCategorias] = useState([]);
  const [idCategoria,setIdCategoria] = useState(null);
  const [nome,setNome] = useState('');
  const [imagem,setImagem] = useState('');
  const imgRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [filter,setFilter] = useState('');
  const [editando,setEditando] = useState(false);
  const initialRef = useRef(null)
  const [isLoading,setIsLoading] = useState(false);
  const [loadingData,setLoadingData] = useState(false);

  useEffect(()=>{
      const getCategorias = async () => {
          setLoadingData(true);
          let json = await Api.getCategorias();
          setCategorias(json);
          setLoadingData(false);
      }
      getCategorias();
  }, []);

  const onSalvar = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const fd = new FormData();

    fd.append('nome',nome);
    fd.append('imagem',imagem);

    if(!editando){
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
        setIsLoading(false);
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
  let response = await Api.updateCategoria(idCategoria,fd);
  if(response.status===200){
    let json = await Api.getCategorias();
    setNome('');
    setImagem('');
    setCategorias(json);
    toast({
      title: 'Parabéns !',
      description: "Você atualizou uma categoria.",
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

const onAdd = () => {
  setNome('');
  setImagem('');
  setIdCategoria(null);
  setEditando(false);
  onOpen();
}

const onEdit = async (id) => {
  let json = await Api.getCategoriabyId(id);
  setIdCategoria(json.id);
  setNome(json.nome);
  setImagem(`${Api.base_storage}/${json.imagem}`)
  setEditando(true);
  onOpen();
 }




return (
  <div className={styles.container}>
      <Navbar onClick={onAdd} setFilter={setFilter} title="Categorias"/>
      
      {loadingData ? <div className={styles.spinner}>
              <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>
            </div>:categorias.length>0&&<TableCategorias categorias={categorias} filter={filter} onEdit={onEdit}/>}

      {!loadingData && categorias.length===0&&<div className={styles.spinner}><p className={styles.noRecordText}>Nenhum registro encontrado!</p></div>}
   
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
                      value={nome}
                      onChange={e => setNome(e.target.value)}
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
  </div>
)



}

export default Categorias
