import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast,Spinner } from '@chakra-ui/react'
import styles from "./styles.module.css";
import {useDisclosure,Input,Select,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,} from '@chakra-ui/react'
import TableCidades from '../../components/tableCidades/TableCidades';

const Cidades = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cidades,setCidades] = useState([]);
  const [idCidade,setIdCidade] = useState(null);
  const [nome,setNome] = useState('');
  const [estado,setEstado] = useState('');
  const [imagem,setImagem] = useState('');
  const imgRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [filter,setFilter] = useState('');
  const [editando,setEditando] = useState(false);
  const initialRef = useRef(null)
  const [isLoading,setIsLoading] = useState(false);
  const [loadingData,setLoadingData] = useState(false);
  
  const estados = [
    { sigla: 'AC',nome: 'Acre' },
    { sigla:'AL',nome: 'Alagoas' },
    { sigla: 'AP',nome: 'Amapá' },
    { sigla: 'AM',nome: 'Amazonas' },
    { sigla: 'BA',nome: 'Bahia' },
    { sigla:'CE',nome: 'Ceará' },
    { sigla:'DF',nome: 'Distrito Federal' },
    { sigla:'ES',nome: 'Espírito Santo' },
    { sigla: 'GO',nome: 'Goías' },
    { sigla:'MA',nome: 'Maranhão' },
    { sigla :'MT',nome: 'Mato Grosso' },
    { sigla:'MS',nome: 'Mato Grosso do Sul' },
    { sigla :'MG',nome: 'Minas Gerais' },
    { sigla:'PA',nome: 'Pará' },
    { sigla :'PB',nome: 'Paraíba' },
    { sigla:'PR',nome: 'Paraná' },
    { sigla:'PE',nome: 'Pernambuco' },
    { sigla :'PI',nome: 'Piauí' },
    { sigla :'RJ',nome: 'Rio de Janeiro' },
    { sigla:'RN',nome: 'Rio Grande do Norte' },
    { sigla:'RS',nome: 'Rio Grande do Sul' },
    { sigla:'RO',nome: 'Rondônia' },
    { sigla :'RR',nome: 'Roraíma' },
    { sigla:'SC',nome: 'Santa Catarina' },
    { sigla :'SP',nome: 'São Paulo' },
    { sigla :'SE',nome: 'Sergipe' },
    { sigla :'TO',nome: 'Tocantins' },
  ];
 

  useEffect(()=>{
    const getCidades = async () => {
       setLoadingData(true);
       let json = await Api.getCidades();
       setCidades(json);
       setLoadingData(false);
    }
    getCidades();
  }, []);

  const onSalvar = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const fd = new FormData();
    fd.append('nome',nome);
    fd.append('estado',estado);
    fd.append('imagem',imagem);
   
    if(!editando){
        let response = await Api.addCidade(fd);
        if(response.status===201){
          let json = await Api.getCidades();
          setNome('');
          setEstado('');
          setImagem('');
          setCidades(json);
          toast({title: 'Parabéns !',description: "Você adicionou uma nova cidade.",status: 'success',duration: 3000,isClosable: true,});
          onClose();
          setIsLoading(false);
      } else {
        toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
      }
      setIsLoading(false);
  } else {
    let response = await Api.updateCidade(idCidade,fd);
    if(response.status===200){
      let json = await Api.getCidades();
      setNome('');
      setEstado('');
      setImagem('');
      setCidades(json);
      toast({title: 'Parabéns !',description: "Você atualizou uma cidade.",status: 'success',duration: 3000,isClosable: true,});
      onClose();
  } else {
    toast({title: 'Atenção !',description: "Campos obrigatórios não informados.",status: 'error',duration: 3000,isClosable: true,})
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

const onSelect = (e) => {
  setEstado(e.target.value);
}

const onAdd = () => {
  setNome('');
  setEstado('');
  setImagem('');
  setIdCidade(null);
  setEditando(false);
  onOpen();
}

const onEdit = async (id) => {
  let json = await Api.getCidadebyId(id);
  setIdCidade(json.id);
  setNome(json.nome);
  setEstado(json.estado);
  setImagem(`${Api.base_storage}/${json.imagem}`)
  setEditando(true);
  onOpen(); 
 }


  return (
    <div className={styles.container}>
       <Navbar onClick={onAdd} setFilter={setFilter} title="Cidades"/>

       {loadingData ? <div className={styles.spinner}>
              <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>
            </div>:cidades.length>0&&<TableCidades cidades={cidades} filter={filter} onEdit={onEdit}/> }
     
            {!loadingData && cidades.length===0&&<div className={styles.spinner}><p className={styles.noRecordText}>Nenhum registro encontrado!</p></div>}


        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editando?'Editando':'Nova'} Cidade</ModalHeader>
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
                        placeholder='Nome da cidade...'
                        ref={initialRef}
                      />
                </FormControl>
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Estado:
                    </FormLabel>
                    <Select 
                        placeholder='Selecione um estado'
                        value={estado}
                        onChange={e => setEstado(e.target.value)}>
                          {estados.map((estado)=> (
                            <option value={estado.sigla}>{estado.nome}</option>
                          ))}
                    </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>
                    Imagem:
                  </FormLabel>
                  <input type="file"  id="imagem" name="imagem" onChange={handlerImagem}/>
                </FormControl>
                <FormControl>
                  <img  style={{marginTop:20,borderRadius:10}} className="imagem" ref={imgRef}  />
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

export default Cidades 