import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import "./atividades.scss";

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
    NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper
  } from '@chakra-ui/react';

  import TableAtividades from '../../components/tableAtividades/TableAtividades';

const Atividades = () => {

const { isOpen, onOpen, onClose } = useDisclosure()
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
//const [subcategoriasFiltrado,setSubcategoriasFiltrado] = useState([]);
const [idSubcategoria,setIdSubcategoria] = useState(null);
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
  //setSubcategoriasFiltrado(json);
}
getSubcategorias();
}, []);

/*
const onSelectCategory = (e) => {
 
  let arr = subcategorias.filter((subcategoria)=>subcategoria.categoria_id == e.target.value);
 
  setSubcategoriasFiltrado(arr);
  setIdCategoria(e.target.value);
}
*/

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



const onSalvar = async (e) => {
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
  alert(percentualPlataforma);
  
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


}

  
}
  
/*
const handlerImagem = (e) => {

  if(e.target.files[0]){
    imgRef.current.src = URL.createObjectURL(e.target.files[0]);
    setImagemCarregada(true);
  }
  
  setImagem(e.target.files[0]);

}
*/

  
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
  


return (
  <div className="atividades">
     <Navbar onClick={onAdd} setFilter={setFilter} title="Atividades"/>
    <div className="parceirosContainer">
       <TableAtividades servicos={servicos} filter={filter} onEdit={onEdit}/>
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
          <Button type="submit" form="add" colorScheme='red' mr={3} >
            Salvar
          </Button>
         
        </ModalFooter>
      </ModalContent>
    </Modal>
  </div>
)






}

export default Atividades