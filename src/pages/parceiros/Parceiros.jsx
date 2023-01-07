import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast,Spinner } from '@chakra-ui/react'
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
    AlertDescription,HStack,
  } from '@chakra-ui/react';

  import TableParceiros from '../../components/tableParceiros/TableParceiros';
  

const Parceiros = () => {
  
const { isOpen, onOpen, onClose } = useDisclosure()
const [parceiros,setParceiros] = useState([]);
const [cidades,setCidades] = useState([]);
const [idCidade,setIdCidade] = useState('');
const [idParceiro,setIdParceiro] = useState(null);
const [usuarios,setUsuarios] = useState([]);
const [idUsuario,setIdUsuario] = useState(null);
const [nome,setNome] = useState('');
const [endereco,setEndereco] = useState('');
const [bairro,setBairro] = useState('');
const [cep,setCep] = useState('');
const [contato,setContato] = useState('');
const [telefone,setTelefone] = useState('');
const [cnpj,setCnpj] = useState('');
const [ie,setIe] = useState('');
const [imagem,setImagem] = useState('');
const [imagemCarregada,setImagemCarregada] = useState(false);
const imgRef = useRef();
const navigate = useNavigate();
const toast = useToast();
const [filter,setFilter] = useState('');
const [editando,setEditando] = useState(false);
const initialRef = useRef(null)
const [isLoading,setIsLoading] = useState(false);
const [loadingData,setLoadingData] = useState(false);




useEffect(()=>{
    const getParceiros = async () => {
      setLoadingData(true);
      let json = await Api.getParceiros();
      setParceiros(json);
      setLoadingData(false);
  }
    getParceiros();
  }, []);

useEffect(()=>{
  const getCidades = async () => {
    
        let json = await Api.getCidades();
      setCidades(json);
   }
  getCidades();
}, []);

useEffect(()=>{
  const getUsuariosParceiros = async () => {
  let json = await Api.getUsuariosParceiros();
      setUsuarios(json);
}
getUsuariosParceiros();
}, []);

  const onSalvar = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const fd = new FormData();
    

    fd.append('nome',nome);
    fd.append('cidade_id',idCidade);
    fd.append('usuario_id',idUsuario);
    fd.append('logotipo',imagem);
    fd.append('endereco',endereco);
    fd.append('bairro',bairro);
    fd.append('cep',cep);
    fd.append('contato',contato);
    fd.append('telefone',telefone);
    fd.append('cnpj',cnpj);
    fd.append('ie',ie);
    
    if(!editando){
        let response = await Api.addParceiro(fd);
        if(response.status===201){
            let json = await Api.getParceiros();
            setNome('');
            setIdCidade('');
            setIdUsuario('');
            setImagem('');
            setEndereco('');
            setBairro('');
            setCep('');
            setContato('');
            setTelefone('');
            setCnpj('');
            setIe('');
            setParceiros(json);
            toast({
            title: 'Parabéns !',
            description: "Você adicionou uma novo parceiro.",
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

    let response = await Api.updateParceiro(idParceiro,fd);
    if(response.status===200){
      let json = await Api.getParceiros();
      setParceiros(json);
      setNome('');
      setIdCidade('');
      setIdUsuario('');
      setImagem('');
      setEndereco('');
      setBairro('');
      setCep('');
      setContato('');
      setTelefone('');
      setCnpj('');
      setIe('');
      toast({
        title: 'Parabéns !',
        description: "Você atualizou um parceiro.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setIsLoading(false);
  } else {
    toast({
      title: 'Atenção !',
      description: "Campos obrigatórios não informados.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    })
    setIsLoading(false);
  }
  

  }

    
  }
    
  const handlerImagem = (e) => {
  
    if(e.target.files[0]){
      imgRef.current.src = URL.createObjectURL(e.target.files[0]);
      setImagemCarregada(true);
    }
    
    setImagem(e.target.files[0]);
  
  }

  
    
  const onAdd = () => {
    setIdParceiro(null);
    setNome('');
    setEndereco('');
    setBairro('');
    setCep('');
    setContato('');
    setTelefone('');
    setCnpj('');
    setIe('');
    setImagem('');
    setIdCidade(null);
    setIdUsuario(null);
    setEditando(false);
    onOpen();
  }
   
  const onEdit = async (id) => {
    let json = await Api.getParceirobyId(id);
    setIdParceiro(json.id);
    setNome(json.nome);
    setEndereco(json.endereco);
    setBairro(json.bairro);
    setIdCidade(json.cidade_id);
    setIdUsuario(json.usuario_id);
    setCep(json.cep);
    setContato(json.contato);
    setTelefone(json.telefone);
    setCnpj(json.cnpj);
    setIe(json.ie);
    setImagem(`${Api.base_storage}/${json.imagem}`)
    setEditando(true);
    onOpen(); 
    }
    

    return (
        <div className={styles.container}>
           <Navbar onClick={onAdd} setFilter={setFilter} title="Parceiros"/>
           {loadingData ? <div className={styles.spinner}>
              <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>
            </div>:<TableParceiros parceiros={parceiros} filter={filter} onEdit={onEdit}/>}
            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl' >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{editando?'Editando':'Novo'} Parceiro</ModalHeader>
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
                            placeholder='Nome do parceiro...'
                            ref={initialRef}
                          />
                    </FormControl>
                  
                    <FormControl style={{marginBottom:10}}>
                        <FormLabel>
                          Endereço:
                        </FormLabel>
                        <Input 
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                            placeholder='Endereço...'
                          />
                          
                    </FormControl>
                    

                  
                    <HStack>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Bairro:
                            </FormLabel>
                            <Input 
                                value={bairro}
                                onChange={e => setBairro(e.target.value)}
                                placeholder='Bairro...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              CEP:
                            </FormLabel>
                            <Input 
                                value={cep}
                                onChange={e => setCep(e.target.value)}
                                placeholder='CEP...'
                              />
                        </FormControl>
                    </HStack>
                
                    <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Cidade:
                    </FormLabel>
                    <Select 
                        placeholder='Selecione uma cidade'
                        value={idCidade}
                        onChange={e => setIdCidade(e.target.value)}>
                          {cidades.map((cidade)=> (
                            <option value={cidade.id}>{cidade.nome}-{cidade.estado}</option>
                          ))}
                    </Select>
                </FormControl>
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Usuário Prestador:    
                    </FormLabel>
                    <Select 
                        placeholder='Selecione um usuário'
                        value={idUsuario}
                        onChange={e => setIdUsuario(e.target.value)}>
                          {usuarios.map((usuario)=> (
                            <option value={usuario.id}>{usuario.name}</option>
                          ))}
                    </Select>
                </FormControl>
                <HStack>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Contato:
                            </FormLabel>
                            <Input 
                                value={contato}
                                onChange={e => setContato(e.target.value)}
                                placeholder='Contato...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Telefone:
                            </FormLabel>
                            <Input 
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                                placeholder='Telefone...'
                              />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              CNPJ/CPF:
                            </FormLabel>
                            <Input 
                                value={cnpj}
                                onChange={e => setCnpj(e.target.value)}
                                placeholder='CNPJ ou CPF...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              IE/RG:
                            </FormLabel>
                            <Input 
                                value={ie}
                                onChange={e => setIe(e.target.value)}
                                placeholder='IE ou RG...'
                              />
                        </FormControl>
                    </HStack>
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

export default Parceiros