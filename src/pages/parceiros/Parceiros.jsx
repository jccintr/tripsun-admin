import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import "./parceiros.scss";

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
  const [idCidade,setIdCidade] = useState([]);
  const [nome,setNome] = useState('');
  const [imagem,setImagem] = useState('');
  const [imagemCarregada,setImagemCarregada] = useState(false);
  const imgRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [filter,setFilter] = useState('');


    useEffect(()=>{
        const getParceiros = async () => {
        
           let json = await Api.getParceiros();
           setParceiros(json);
           
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



      const onSalvar = async (e) => {
        e.preventDefault();
        const fd = new FormData();
       
    
        fd.append('nome',nome);
        fd.append('cidade_id',idCidade);
        fd.append('logotipo',imagem);
       
        let response = await Api.addParceiro(fd);
        if(response.status===201){
           let json = await Api.getParceiros();
           setNome('');
           setIdCidade('');
           setImagem('');
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
      
        
    }
    
    const handlerImagem = (e) => {
    
      if(e.target.files[0]){
        imgRef.current.src = URL.createObjectURL(e.target.files[0]);
        setImagemCarregada(true);
      }
     
      setImagem(e.target.files[0]);
    
    }
    
   
    

    return (
        <div className="parceiros">
           <Navbar onClick={onOpen} setFilter={setFilter} title="Parceiros"/>
          <div className="parceirosContainer">
             <TableParceiros parceiros={parceiros} filter={filter}/>
            <div className="gridContainer">
             
            </div>
         
          </div>
            <Modal isOpen={isOpen} onClose={onClose} size='xl' >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Novo Parceiro</ModalHeader>
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
                          />
                    </FormControl>
                  
                    <FormControl style={{marginBottom:10}}>
                        <FormLabel>
                          Endereço:
                        </FormLabel>
                        <Input 
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder='Endereço...'
                          />
                          
                    </FormControl>
                    

                  
                    <HStack>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Bairro:
                            </FormLabel>
                            <Input 
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                placeholder='Bairro...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              CEP:
                            </FormLabel>
                            <Input 
                                value={nome}
                                onChange={e => setNome(e.target.value)}
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
                <HStack>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Contato:
                            </FormLabel>
                            <Input 
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                placeholder='Contato...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Telefone:
                            </FormLabel>
                            <Input 
                                value={nome}
                                onChange={e => setNome(e.target.value)}
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
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                placeholder='CNPJ ou CPF...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              IE/RG:
                            </FormLabel>
                            <Input 
                                value={nome}
                                onChange={e => setNome(e.target.value)}
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
                <Button type="submit" form="add" colorScheme='red' mr={3} >
                  Salvar
                </Button>
               
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )



}

export default Parceiros