import React ,{ useState, useEffect} from 'react'
import Api from '../../Api';
import {Flex,Heading,Box} from '@chakra-ui/react'
import DataTable from 'react-data-table-component';
import { useToast,Spinner } from '@chakra-ui/react'
import SearchField from '../../components/SearchField';
import {useDisclosure,Button} from '@chakra-ui/react';
import ModalUsuario from '../../components/modals/ModalUsuario';

const paginationComponentOptions = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };



const Usuarios2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [usuarios,setUsuarios] = useState([]);
  const [usuario,setUsuario] = useState({});
  const [searchText,setSearchText] = useState('');
  const toast = useToast();
  const [isLoading,setIsLoading] = useState(false);
  const [loadingData,setLoadingData] = useState(false);

  const usuariosFiltrado = usuarios.filter(usuario => usuario.name && usuario.name.toLowerCase().includes(searchText.toLowerCase()),);

  const customStyles = {
    headCells: {
      style: {
        color: '#000000',
        fontSize: '14px',
        fontWeight: 'bold',
       },
    },
   
  };

  const columns = [
    
    {
      name: 'Nome',
      selector: row => row.name,
    },
    {
        name: 'Email',
        selector: row => row.email,
     },
     {
        name: 'Telefone',
        selector: row => row.telefone,
     },
      
    {
      name: '',
      cell: row =><Button m="2" onClick={()=>onEdit(row)} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='xs'>EDITAR</Button>
    },
    
];
  
  

  useEffect(()=>{
    const getUsuarios = async () => {
      setLoadingData(true);
       let json = await Api.getUsuariosClientes();
       setUsuarios(json);
       setLoadingData(false);
    }
    getUsuarios();
  }, []);


const onSalvar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let response = await Api.updateUsuario(usuario.id,usuario.name,usuario.telefone);
    if(response.status===200){
      let json = await Api.getUsuariosClientes();
      setUsuarios(json);
      toast({title: 'Parabéns !',description: "Você atualizou um usuário.",status: 'success',duration: 3000,isClosable: true,});
      onClose();
    } else {
      toast({title: 'Atenção !',description: "Campos obrigatórios não informados.",status: 'error',duration: 3000,isClosable: true,})
    }
    setIsLoading(false);
    
}

const onEdit = async (usuario) => {
  
  let json = await Api.getUsuariobyId(usuario.id);
  setUsuario(json);
  onOpen(); 
 }


  return (
    <Flex w='full'  minH={'100vh'}  direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
       <Heading color='red.500' mb='4' fontSize={['1xl','2xl']}>Clientes</Heading>
       
       {loadingData ? <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>: <Box w={{ base: '350px', md: '500px', lg: '1000px' }} rounded={'lg'} bg={'white'} boxShadow={['none','lg']} p={[0,8]}>
          <SearchField setSearchText={setSearchText} placeholder={'Pesquisar nos clientes'}/>
          <DataTable
                columns={columns}
                data={usuariosFiltrado}
                highlightOnHover
                noDataComponent="Registros não encontrados."
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
       </Box>}
       <ModalUsuario isOpen={isOpen}  onClose={onClose} usuario={usuario} setUsuario={setUsuario} onSalvar={onSalvar} isLoading={isLoading}/>
    </Flex>
  )
}

export default Usuarios2 