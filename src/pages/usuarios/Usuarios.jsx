import React ,{ useState, useEffect,useRef} from 'react'
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import "./usuarios.scss";
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
} from '@chakra-ui/react'
import TableUsuarios from '../../components/tableUsuarios/TableUsuarios';

const Usuarios = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [usuarios,setUsuarios] = useState([]);
  const [idUsuario,setIdUsuario] = useState([]);
  
  const [nome,setNome] = useState('');
  const [email,setEmail] = useState('');
  const [telefone,setTelefone] = useState('');
  const imgRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [filter,setFilter] = useState('');
  const [editando,setEditando] = useState(false);
  const initialRef = useRef(null)
  
  

  useEffect(()=>{
    const getUsuarios = async () => {
       let json = await Api.getUsuarios();
       setUsuarios(json);
    }
    getUsuarios();
  }, []);

  const onSalvar = async (e) => {
    e.preventDefault();
   
    const fd = new FormData();
    fd.append('nome',nome);
   // fd.append('estado',estado);
   // fd.append('imagem',imagem);
   
    if(!editando){
        let response = await Api.addCidade(fd);
        if(response.status===201){
          let json = await Api.getUsuarios();
          setNome('');
          setTelefone('');
          setUsuarios(json);
          toast({
            title: 'Parabéns !',
            description: "Você adicionou um novo usuário.",
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
    let response = await Api.updateUsuario(idUsuario,nome,telefone);
    if(response.status===200){
      let json = await Api.getUsuarios();
      setNome('');
      setEmail('');
      setTelefone('');
      setUsuarios(json);
      toast({
        title: 'Parabéns !',
        description: "Você atualizou um usuário.",
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
  }
  setImagem(e.target.files[0]);
 
}

*/

const onAdd = () => {
 alert('Usuários só podem ser adicionados pelo aplicativo móvel.')
}

const onEdit = async (id) => {
  let json = await Api.getUsuariobyId(id);
  setIdUsuario(json.id);
  setNome(json.name);
  setTelefone(json.phone);
  setEditando(true);
  onOpen(); 
 }


  return (
    <div className="usuarios">
       <Navbar onClick={onAdd} setFilter={setFilter} title="Usuários"/>
      <div className="usuariosContainer">
         <TableUsuarios usuarios={usuarios} filter={filter} onEdit={onEdit}/>
        <div className="gridContainer">
         
        </div>
     
      </div>
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editando?'Editando':'Novo'} Usuário</ModalHeader>
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
                        placeholder='Nome do usuário...'
                        ref={initialRef}
                      />
                </FormControl>
                
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Telefone:
                    </FormLabel>
                    <Input 
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        placeholder='Telefone do usuário...'
                    />
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

export default Usuarios 