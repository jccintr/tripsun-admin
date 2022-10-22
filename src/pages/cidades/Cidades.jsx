import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import "./cidades.scss";
//import "./style.css";
import imagemVazia from "../../assets/empty-image.png";

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
} from '@chakra-ui/react'
import TableCidades from '../../components/tableCidades/TableCidades';





const Cidades = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cidades,setCidades] = useState([]);
  const [cidade,setCidade] = useState(null);
  const [nome,setNome] = useState('');
  const [estado,setEstado] = useState('')
  const [imagem,setImagem] = useState('');
  const [imagemCarregada,setImagemCarregada] = useState(false);
  const imgRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [filter,setFilter] = useState('');
  const [editando,setEditando] = useState(false);



  
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
    
       let json = await Api.getCidades();
       setCidades(json);
    }
    getCidades();
  }, []);

  

  const onSalvar = async (e) => {
    e.preventDefault();
    const fd = new FormData();
   

    fd.append('nome',nome);
    fd.append('estado',estado);
    fd.append('imagem',imagem);
   
    let response = await Api.addCidade(fd);
    if(response.status===201){
       let json = await Api.getCidades();
       setNome('');
       setEstado('');
       setImagem('');
       setCidades(json);
       toast({
        title: 'Parabéns !',
        description: "Você adicionou uma nova cidade.",
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
  
    
  }
  setImagem(e.target.files[0]);
 

}

const onSelect = (e) => {
  setEstado(e.target.value);
  alert(e.target.value);
}

const onAdd = () => {
  setNome('');
  setEstado('');
  setImagem('');
  setEditando(false);
  onOpen();
}

const onEdit = async (id) => {
  let json = await Api.getCidadebyId(id);
  setNome(json.nome);
  setEstado(json.estado);
  setImagem(`${Api.base_storage}/${json.imagem}`)
  
  setImagemCarregada(false);
  setEditando(true);
  onOpen();
 
}


  return (
    <div className="cidades">
       <Navbar onClick={onAdd} setFilter={setFilter} title="Cidades"/>
      <div className="cidadesContainer">
         <TableCidades cidades={cidades} filter={filter} onEdit={onEdit}/>
        <div className="gridContainer">
         
        </div>
     
      </div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editando?'Editando':'Nova'} Cidade</ModalHeader>
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
                        placeholder='Nome da cidade...'
                      />
                </FormControl>
                <FormControl style={{marginBottom:10}}>
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
                  <input type="file" id="imagem" name="imagem" onChange={handlerImagem}/>
                </FormControl>
               
                  <FormControl>

                    <img  style={{marginTop:20,borderRadius:10}} className="imagem"  ref={imgRef} alt="Imagem da Cidade"/>
                   
                 
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

export default Cidades