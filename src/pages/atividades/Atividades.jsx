import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast, VStack } from '@chakra-ui/react'
import "./atividades.scss";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,Divider
} from '@chakra-ui/react'

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
    HStack,Textarea,Checkbox,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,Image,Grid,Text
  } from '@chakra-ui/react';

import TableAtividades from '../../components/tableAtividades/TableAtividades';
import CardImage from '../../components/cardImage/CardImage';


const Atividades = () => {
const [dataCalendario, setDataCalendario] = useState(new Date());

const { isOpen, onOpen, onClose } = useDisclosure()
const { isOpen: isOpenModalImage , onOpen: onOpenModalImage, onClose: onCloseModalImage } = useDisclosure()
const { isOpen: isOpenModalHorarios , onOpen: onOpenModalHorarios, onClose: onCloseModalHorarios } = useDisclosure()

const [imagens,setImagens] = useState([]);
//===================================================
const [servicos,setServicos] = useState([]);
const [idServico,setIdServico] = useState(null);
//===================================================
const [cidades,setCidades] = useState([]);
const [idCidade,setIdCidade] = useState(null);
//===================================================
const [parceiros,setParceiros] = useState([]);
const [idParceiro,setIdParceiro] = useState(null);
//===================================================
const [categorias,setCategorias] = useState([]);
const [idCategoria,setIdCategoria] = useState(null);
//===================================================
const [subcategorias,setSubcategorias] = useState([]);
const [idSubcategoria,setIdSubcategoria] = useState(null);
//===================================================
const [horarios,setHorarios] = useState([]);
const [vagasAtividade,setVagasAtividade] = useState('');
const [horarioAtividade,setHorarioAtividade] = useState('');
const [duracaoAtividade,setDuracaoAtividade] = useState('');
//===================================================
const [nome,setNome] = useState('');
const [descricao,setDescricao] = useState('');
const [destaque,setDestaque] = useState(false);
const [endereco,setEndereco] = useState('');
const [pontoEncontro,setPontoEncontro] = useState('');
const [latitude,setLatitude] = useState('');
const [longitude,setLongitude] = useState('');
const [itensObrigatorios,setItensObrigatorios]= useState('');
const [itensFornecidos,setItensFornecidos]= useState('');
const [atrativos,setAtrativos] = useState('');
const [duracao,setDuracao] = useState('');
const [horario,setHorario] = useState('');
const [percentualPlataforma,setPercentualPlataforma] = useState('');
const [valor,setValor] = useState('');
const toast = useToast();
const [filter,setFilter] = useState('');
const [editando,setEditando] = useState(false);
const initialRef = useRef(null)
const [novaImagem,setNovaImagem] = useState('');
const [isLoading,setIsLoading] = useState(false);



useEffect(()=>{
  const getAtividades = async () => {
  let json = await Api.getAtividades();
      setServicos(json);
}
getAtividades();
}, []);

useEffect(()=>{
const getCidades = async () => {
    let json = await Api.getCidades();
    setCidades(json);
}
getCidades();
}, []);

useEffect(()=>{
  const getParceiros = async () => {
      let json = await Api.getParceiros();
      setParceiros(json);
  }
  getParceiros();
  }, []);


useEffect(()=>{
const getCategorias = async () => {
  let json = await Api.getCategorias();
  setCategorias(json);
}
getCategorias();
}, []);

useEffect(()=>{
const getSubcategorias = async () => {
  let json = await Api.getSubcategorias();
  setSubcategorias(json);
}
getSubcategorias();
}, []);



const ClearStates = () => {

  setNome('');
  setIdCidade(null);
  setIdCategoria(null);
  setIdSubcategoria(null);
  setIdParceiro(null);
  setDestaque(false);
  setDescricao('');
  setEndereco('');
  setDuracao('');
  setPercentualPlataforma('');
  setValor('');
  setItensFornecidos('');
  setItensObrigatorios('');
  setAtrativos('');
  setHorario('');
  setLatitude('');
  setLongitude('');

}

const formataData = (data) => {
  return data.substring(8,10)+'/'+data.substring(5,7)+'/'+data.substring(0,4);
}

const onSalvar = async (e) => {
  setIsLoading(true);
  e.preventDefault();
  const fd = new FormData();
  fd.append('nome',nome);
  let categoria_id = idCategoria;

  let subcategoria_id = idSubcategoria;
  let cidade_id = idCidade;
  let prestador_id = idParceiro;
  let itens_fornecidos = itensFornecidos;
  let itens_obrigatorios = itensObrigatorios;
  let descricao_curta = descricao;
  let ponto_encontro = pontoEncontro;
  let percentual_plataforma = percentualPlataforma;
  

  if(!editando){
      let response = await Api.addAtividade(nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,valor);

      if(response.status===201){
          let json = await Api.getAtividades();
          ClearStates();
          setServicos(json);
          toast({
          title: 'Parabéns !',
          description: "Você adicionou uma nova atividade.",
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

  let response = await Api.updateAtividade(idServico,nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,valor);
  if(response.status===200){
    let json = await Api.getAtividades();
    setServicos(json);
    ClearStates();
    toast({
      title: 'Parabéns !',
      description: "Você atualizou uma atividade.",
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

 
  setNovaImagem(e.target.files[0]);

}



const onAdd = () => {
  setIdServico(null);
  setIdParceiro(null);
  setIdCategoria(null);
  setIdSubcategoria(null);
  setNome('');
  setDescricao('');
  setDestaque(false);
  setEndereco('');
  setPontoEncontro('');
  setLatitude('');
  setLongitude('');
  setItensObrigatorios('');
  setItensFornecidos('')
  setAtrativos('');
  setDuracao('')
  setPercentualPlataforma('');
  setValor('');
  setEditando(false);
  onOpen();
}

const onEdit = async (id) => {

  let json = await Api.getAtividadebyId(id);
  setIdServico(json.id);
  setIdParceiro(json.prestador_id);
  setIdCategoria(json.categoria_id);
  setIdSubcategoria(json.subcategoria_id);
  setIdCidade(json.cidade_id);
  setNome(json.nome);
  setDescricao(json.descricao_curta);
  setDestaque(json.destaque);
  setEndereco(json.endereco);
  setPontoEncontro(json.ponto_encontro);
  setLatitude(json.latitude);
  setLongitude(json.longitude);
  setItensObrigatorios(json.itens_obrigatorios);
  setItensFornecidos(json.itens_fornecidos)
  setAtrativos(json.atrativos);
  setHorario(json.horario);
  setDuracao(json.duracao);
  setPercentualPlataforma(json.percentual_plataforma);
  setValor(json.valor);
  setEditando(true);
  onOpen();
  }

  const abreModalImagens = async (idServico) => {
    let json = await Api.getImagensByServico(idServico);
    setIdServico(idServico);
    setImagens(json);
    onOpenModalImage();
  }

  const abreModalHorarios = async (idServico) => {
    let mes = dataCalendario.getMonth() + 1;
    let data = dataCalendario.getFullYear() + '-' + mes + '-' + dataCalendario.getDate();
    setIdServico(idServico);
    let json = await Api.getHorariosByDay(idServico,data);
    setHorarios(json);
    
    onOpenModalHorarios();
  }

  const onChangeData = async (value) => {
     
    setDataCalendario(value);
    let mes = value.getMonth() + 1;
    let data = value.getFullYear() + '-' + mes + '-' + value.getDate();
    let json = await Api.getHorariosByDay(idServico,data);
    setHorarios(json);
  }

  const deleteImage = async (id) => {
     let response = await Api.deleteImagem(id);
     let json = await Api.getImagensByServico(idServico);
    setImagens(json);
  }

  const adicionaImagem = async () => {
    const fd = new FormData();
    fd.append('servico_id',idServico);
    fd.append('imagem',novaImagem);
    let response = await Api.addImagem(fd);
    if(response.status===201){
      let json = await Api.getImagensByServico(idServico);
      setImagens(json);
    }
  }

  const adicionaHorario = async () => {
    
    let response = await Api.addHorario(idServico,dataCalendario.getDate(),dataCalendario.getMonth()+1,dataCalendario.getFullYear(),horarioAtividade,duracaoAtividade,vagasAtividade,true);
    
    if(response.status===201){
      let mes = dataCalendario.getMonth() + 1;
      let data = dataCalendario.getFullYear() + '-' + mes + '-' + dataCalendario.getDate();
      let json = await Api.getHorariosByDay(idServico,data);
      setHorarios(json);
      toast({
        title: 'Parabéns !',
        description: "Você adicionou um novo horário.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

  }


return (
  <div className="atividades">
     <Navbar onClick={onAdd} setFilter={setFilter} title="Atividades"/>
    <div className="parceirosContainer">
       <TableAtividades servicos={servicos} filter={filter} onEdit={onEdit} onOpenModalImage={abreModalImagens} onOpenModalHorarios={abreModalHorarios}/>
      <div className="gridContainer">

      </div>

    </div>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editando?'Editando':'Nova'} Atividade</ModalHeader>
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
                      placeholder='Nome da atividade...'
                      ref={initialRef}
                    />
              </FormControl>
              <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Parceiro:
                    </FormLabel>
                    <Select
                        placeholder='Selecione um parceiro'
                        value={idParceiro}
                        onChange={e => setIdParceiro(e.target.value)}>
                          {parceiros.map((parceiro)=> (
                            <option value={parceiro.id}>{parceiro.nome}</option>
                          ))}
                    </Select>
                </FormControl>
               <HStack>
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Categoria:
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
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Subcategoria:
                    </FormLabel>
                    <Select
                        placeholder='Selecione uma subcategoria'
                        value={idSubcategoria}
                        onChange={e => setIdSubcategoria(e.target.value)}>
                          {subcategorias.filter((subcategoria)=>subcategoria.categoria_id == idCategoria).map((subcategoria)=> (
                            <option value={subcategoria.id}>{subcategoria.nome}</option>
                          ))}
                    </Select>
                </FormControl>
               </HStack>
              <FormControl>
                  <Checkbox onChange={e=>setDestaque(!destaque)} isChecked={destaque} defaultChecked={true}>
                         Atividade em Destaque
                  </Checkbox>
              </FormControl>
              <Tabs>
                  <TabList>
                    <Tab>Localização</Tab>
                    <Tab>Detalhes</Tab>
                    <Tab>Outros</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Endereço:
                            </FormLabel>
                            <Input
                                value={endereco}
                                onChange={e => setEndereco(e.target.value)}
                                placeholder='Endereço da atividade...'
                               />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Ponto de Encontro:
                          </FormLabel>
                          <Input
                              value={pontoEncontro}
                              onChange={e => setPontoEncontro(e.target.value)}
                              placeholder='Ponto de encontro da atividade...'
                             />
                        </FormControl>
                      <HStack>
                         <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Latitude:
                            </FormLabel>
                            <Input
                                value={latitude}
                                onChange={e => setLatitude(e.target.value)}
                                placeholder='Latitude...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Longitude:
                            </FormLabel>
                            <Input
                                value={longitude}
                                onChange={e => setLongitude(e.target.value)}
                                placeholder='Longitude...'
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
                    </TabPanel>
                    <TabPanel>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Descrição:
                            </FormLabel>
                            <Textarea
                              placeholder='Descrição da atividade...'
                              value={descricao}
                              onChange={e => setDescricao(e.target.value)}
                              resize="none"
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Itens Obrigatórios:
                            </FormLabel>
                            <Textarea
                              placeholder='Itens obrigatórios...'
                              value={itensObrigatorios}
                              onChange={e => setItensObrigatorios(e.target.value)}
                              resize="none"
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Itens Fornecidos:
                            </FormLabel>
                            <Textarea
                              placeholder='Itens fornecidos...'
                              value={itensFornecidos}
                              onChange={e => setItensFornecidos(e.target.value)}
                              resize="none"
                            />
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Atrativos:
                            </FormLabel>
                            <Textarea
                              placeholder='Atrativos da atividade...'
                              value={atrativos}
                              onChange={e => setAtrativos(e.target.value)}
                              resize="none"
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Horário:
                          </FormLabel>
                          <Input
                              value={horario}
                              onChange={e => setHorario(e.target.value)}
                              placeholder='Horario da atividade...'
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Duração:
                          </FormLabel>
                          <Input
                              value={duracao}
                              onChange={e => setDuracao(e.target.value)}
                              placeholder='Duração da atividade...'
                            />
                        </FormControl>
                        <HStack>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Valor:
                          </FormLabel>
                          <NumberInput
                            precision={2} defaultValue={valor}
                          >
                            <NumberInputField
                             value={valor}
                             onChange={e => setValor(e.target.value)}
                             placeholder='Valor da atividade...'

                            />
                          </NumberInput>
                         </FormControl>
                         <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Percentual da Plataforma:
                          </FormLabel>
                          <NumberInput
                            precision={0} defaultValue={percentualPlataforma}
                            onChange={(valueString) => setPercentualPlataforma(valueString)}
                          >
                            <NumberInputField
                             value={percentualPlataforma}

                             placeholder='Percentual da plataforma...'

                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                         </FormControl>
                         </HStack>
                    </TabPanel>
                  </TabPanels>
              </Tabs>
           </form>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={isLoading} loadingText="Salvando" type="submit" form="add" colorScheme='red' mr={3} >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModalImage} onClose={onCloseModalImage} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Imagens da Atividade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form id="imagens" onSubmit={onCloseModalImage}> 
          {imagens.length > 0 ? <Grid templateColumns='repeat(4, 1fr)' gap={6}>
          {imagens.map((imagem)=> (
                      <CardImage imagem={imagem} deleteImage={deleteImage}/>
                          ))}
                          
          </Grid> :  <HStack justify='center' align='center'><Text fontSize='20px' color='red'>Nenhuma imagem encontrada.</Text></HStack>}  
         
             <HStack>
             
              <FormControl>
                    <FormLabel>
                      <Text as='b'>Adicionar imagem:</Text>
                     </FormLabel>
                    <input type="file"  id="imagem" name="imagem" onChange={handlerImagem}/>
                  </FormControl>  
                  <Button color='red'  onClick={adicionaImagem}>Adicionar</Button>
              </HStack>              
            </form>
            
          </ModalBody>

          <ModalFooter>
          <Button onClick={onCloseModalImage} colorScheme='red' mr={3} >
            Fechar
          </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
    <Modal isOpen={isOpenModalHorarios} onClose={onCloseModalHorarios} size='xl'>
       <ModalOverlay />
       <ModalContent>
          <ModalHeader>Horários da Atividade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <HStack justify='center' align='center'>
            <div style={{marginBottom: 20}}>
            <Calendar 
              onChange={setDataCalendario} 
              value={dataCalendario} 
              showNeighboringMonth={false}
            
              onClickDay={(value, event) => onChangeData(value)}
              />
            </div>
          </HStack>
          <Divider orientation='horizontal' />
            <HStack justify='center' align='center'>
              
              <FormControl>
                <FormLabel>
                  Hora:
                </FormLabel>
                <Input  
                   value={horarioAtividade}
                   onChange={e => setHorarioAtividade(e.target.value)}
                   placeholder="Horário da atividade" 
                   size="md"  
                   type="time" />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Duração:
                </FormLabel>
                <Input  
                   value={duracaoAtividade}
                   onChange={e => setDuracaoAtividade(e.target.value)}
                   placeholder="Horário da atividade" 
                   size="md"  
                   type="time" />
              </FormControl>
              <FormControl>
                   <FormLabel>
                     Vagas:
                   </FormLabel>
                   <NumberInput
                            precision={0} defaultValue={1}
                            
                    >
                        <NumberInputField
                          value={vagasAtividade}
                          onChange={e => setVagasAtividade(e.target.value)}
                           placeholder='Quantidade de vagas'
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>
                  Ação:
                </FormLabel>
                <Button color='red'  onClick={adicionaHorario}>Adicionar</Button>
              </FormControl>
             
            </HStack>
            {horarios.length > 0 ?
            <TableContainer>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Data</Th>
                    <Th>Hora</Th>
                    <Th>Duração</Th>
                    <Th>Vagas</Th> 
                  </Tr>
                </Thead>
                <Tbody>
                {horarios.map((horario) => (
                          <Tr key={horario.id}>
                              <Td >{formataData(horario.data)}</Td>
                              <Td>{horario.hora}</Td>
                              <Td>{horario.duracao}</Td>
                              <Td isNumeric>{horario.quant}</Td>
                          </Tr>
                          ))}
                </Tbody>
              </Table>
            </TableContainer> : <HStack justify='center' align='center'><Text fontSize='20px' color='red'>Nenhum horário cadastrado.</Text></HStack> }
           
          </ModalBody>
          <ModalFooter>
          <Button onClick={onCloseModalHorarios} colorScheme='red' mr={3} >
            Fechar
          </Button>
          </ModalFooter>
       </ModalContent>
    

    </Modal>
  </div>
)






}

export default Atividades
