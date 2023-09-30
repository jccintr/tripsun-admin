import React ,{ useState, useEffect} from 'react'
import Api from '../../Api';
import { useNavigate } from "react-router-dom";
import { useToast,Spinner } from '@chakra-ui/react'
import {useDisclosure,Button,Image} from '@chakra-ui/react'
import {Flex,Heading,Box} from '@chakra-ui/react'
import DataTable from 'react-data-table-component';
import ModalCidade from '../../components/modals/ModalCidade';
import SearchField from '../../components/SearchField';

const paginationComponentOptions = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  

const Cidades2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cidades,setCidades] = useState([]);
  const [cidade,setCidade] = useState({id:null,nome:'',estado:'',imagem:''});
  const navigate = useNavigate();
  const toast = useToast();
  const [searchText,setSearchText] = useState('');
  const [editando,setEditando] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [loadingData,setLoadingData] = useState(false);

  const cidadesFiltrado = cidades.filter(cidade => cidade.nome && cidade.nome.toLowerCase().includes(searchText.toLowerCase()),);


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
        cell: row => <Image p={2} rounded={'full'} w='60px' h='60px' src={`${Api.base_storage}/${row.imagem}`} />,
      },
    {
      name: 'Nome',
      selector: row => row.nome,
    },
    {
        name: 'Estado',
        selector: row => row.estado,
      },
      
    {
      name: '',
      cell: row =><Button m="2" onClick={()=>onEdit(row)} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='xs'>EDITAR</Button>
    },
    
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
    fd.append('nome',cidade.nome);
    fd.append('estado',cidade.estado);
    fd.append('imagem',cidade.imagem);
   
    if(!editando){
        let response = await Api.addCidade(fd);
        if(response.status===201){
          let json = await Api.getCidades();
          setCidade({id:null,nome:'',estado:'',imagem:''});
          setCidades(json);
          toast({title: 'Parabéns !',description: "Você adicionou uma nova cidade.",status: 'success',duration: 3000,isClosable: true,});
          onClose();
          setIsLoading(false);
      } else {
        toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
      }
      setIsLoading(false);
  } else {
    let response = await Api.updateCidade(cidade.id,fd);
    if(response.status===200){
      let json = await Api.getCidades();
      setCidade({id:null,nome:'',estado:'',imagem:''});
      setCidades(json);
      toast({title: 'Parabéns !',description: "Você atualizou uma cidade.",status: 'success',duration: 3000,isClosable: true,});
      onClose();
  } else {
    toast({title: 'Atenção !',description: "Campos obrigatórios não informados.",status: 'error',duration: 3000,isClosable: true,})
  }
 setIsLoading(false);
  }
  
    
}

const onAdd = () => {
  setCidade({id:null,nome:'',estado:'',imagem:''});
  setEditando(false);
  onOpen();
}

const onEdit = async (cidade) => {
  let json = await Api.getCidadebyId(cidade.id);
  setCidade(json);
  //setCidade(cidade)
  setEditando(true);
  onOpen(); 
 }

 return (
    <Flex w='full'  minH={'100vh'} height='100vh' direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
       <Heading color='red.500' mb='4' fontSize={['1xl','2xl']}>Cidades</Heading>
       
       {loadingData ? <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>: <Box w={{ base: '350px', md: '500px', lg: '1000px' }} rounded={'lg'} bg={'white'} boxShadow={['none','lg']} p={[0,8]}>
          <Button onClick={onAdd} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='sm'>ADICIONAR CIDADE</Button>
          <SearchField setSearchText={setSearchText} placeholder={'Pesquisar nas cidades'}/>
          <DataTable
                columns={columns}
                data={cidadesFiltrado}
                highlightOnHover
                noDataComponent="Registros não encontrados."
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
       </Box>}
      <ModalCidade isOpen={isOpen} editando={editando} onClose={onClose} cidade={cidade} setCidade={setCidade} onSalvar={onSalvar} isLoading={isLoading}/>
    </Flex>
  )


}

export default Cidades2