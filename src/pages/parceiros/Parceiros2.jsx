import React ,{ useState, useEffect} from 'react'
import Api from '../../Api';
import { useToast,Spinner } from '@chakra-ui/react'
import {useDisclosure,Button,Image} from '@chakra-ui/react'
import {Flex,Heading,Box} from '@chakra-ui/react'
import DataTable from 'react-data-table-component';
import ModalParceiros from '../../components/modals/ModalParceiros';
import SearchField from '../../components/SearchField';

const paginationComponentOptions = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };


const Parceiros2 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [parceiros,setParceiros] = useState([]);
    const [cidades,setCidades] = useState([]);
    const [idCidade,setIdCidade] = useState('');
    const [idParceiro,setIdParceiro] = useState(null);
    const [usuarios,setUsuarios] = useState([]);
    const [parceiro,setParceiro] = useState({});
    const toast = useToast();
    const [editando,setEditando] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [loadingData,setLoadingData] = useState(false);
    const [searchText,setSearchText] = useState('');

    const parceirosFiltrado = parceiros.filter(parceiro => parceiro.nome && parceiro.nome.toLowerCase().includes(searchText.toLowerCase()),);

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
        name: '',
        width: '100px',
        center: true,
        hide: 'sm',
        cell: row => <Image p={2} rounded={'full'} w='60px' h='60px' src={`${Api.base_storage}/${row.logotipo}`} />,
      },
    {
      name: 'Nome',
      selector: row => row.nome,
    },
    {
      name: 'Cidade',
      selector: row => row.nome_cidade,
    },
    {
      name: '',
      cell: row =><Button m="2" onClick={()=>onEdit(row)} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='xs'>EDITAR</Button>
    },
    
];

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
  
  fd.append('nome',parceiro.nome);
  fd.append('cidade_id',parceiro.cidade_id);
  fd.append('logotipo',parceiro.logotipo);
  fd.append('endereco',parceiro.endereco);
  fd.append('bairro',parceiro.bairro);
  fd.append('cep',parceiro.cep);
  fd.append('contato',parceiro.contato);
  fd.append('email',parceiro.email);
  fd.append('telefone',parceiro.telefone);
  fd.append('cnpj',parceiro.cnpj);
  fd.append('ie',parceiro.ie);
  
  
  if(!editando){
      fd.append('password',parceiro.password)
      let response = await Api.addParceiro(fd);
      
      if(response.status===201){
          let json = await Api.getParceiros();
          setParceiros(json);
          setParceiro({id:null,nome:'',cidade_id:null,logotipo:'',endereco:'',bairro:'',cep:'',contato:'',email:'',telefone:'',cnpj:'',ie:'',password:''});
          toast({title: 'Parabéns !',description: "Você adicionou uma novo parceiro.",status: 'success',duration: 3000,isClosable: true,});
        onClose();
      } else {
      let json = await response.json();  
      toast({title: 'Atenção ! Ocorreu um erro.',description: json.erro,status: 'error',duration: 3000,isClosable: true,})

      }
      setIsLoading(false);
 } else {
  
  let response = await Api.updateParceiro(parceiro.id,fd);
  if(response.status===200){
    
    let json = await Api.getParceiros();
    setParceiros(json);
    setParceiro({id:null,nome:'',cidade_id:null,logotipo:'',endereco:'',bairro:'',cep:'',contato:'',email:'',telefone:'',cnpj:'',ie:'',password:''});
    toast({title: 'Parabéns !',description: "Você atualizou um parceiro.",status: 'success',duration: 3000,isClosable: true,});
    onClose();
    setIsLoading(false);
} else {
  toast({title: 'Atenção !',description: "Campos obrigatórios não informados.",status: 'error',duration: 3000,isClosable: true,})
  setIsLoading(false);
}


}

  
}

const onAdd = () => {
    setParceiro({id:null,nome:'',cidade_id:null,logotipo:'',endereco:'',bairro:'',cep:'',contato:'',email:'',telefone:'',cnpj:'',ie:'',password:''});
    setEditando(false);
    onOpen();
}
 
const onEdit = async (parceiro) => {
    let json = await Api.getParceirobyId(parceiro.id);
    //console.log(json);
    setParceiro(json);
    setEditando(true);
    onOpen(); 
  }


  return (
    <Flex w='full'  minH={'100vh'} height='100vh' direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
    <Heading color='red.500' mb='4' fontSize={['1xl','2xl']}>Parceiros</Heading>
    {loadingData ? <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>: <Box w={{ base: '350px', md: '500px', lg: '1000px' }} rounded={'lg'} bg={'white'} boxShadow={['none','lg']} p={[0,8]}>
      <Button onClick={onAdd} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='sm'>ADICIONAR PARCEIRO</Button>
      <SearchField setSearchText={setSearchText} placeholder={'Pesquisar nos parceiros'}/>
      <DataTable
            columns={columns}
            data={parceirosFiltrado}
            highlightOnHover
            noDataComponent="Registros não encontrados."
            pagination
            paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
        />
   </Box>}
    <ModalParceiros isOpen={isOpen} editando={editando} onClose={onClose} parceiro={parceiro} setParceiro={setParceiro} onSalvar={onSalvar} isLoading={isLoading} cidades={cidades}/>
</Flex>   
  )
}

export default Parceiros2