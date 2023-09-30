import React ,{ useState, useEffect} from 'react'
import Api from '../../Api';
import { useNavigate } from "react-router-dom";
import { useToast,Spinner } from '@chakra-ui/react'
import {useDisclosure,Button,Image} from '@chakra-ui/react'
import {Flex,Heading,Box} from '@chakra-ui/react'
import DataTable from 'react-data-table-component';
import ModalCategoria from '../../components/modals/ModalCategoria';
import SearchField from '../../components/SearchField';

const paginationComponentOptions = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };




const Categorias2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categorias,setCategorias] = useState([]);
  const [categoria,setCategoria] = useState({id:null,nome:'',imagem:''});
  const navigate = useNavigate();
  const toast = useToast();
  const [editando,setEditando] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [loadingData,setLoadingData] = useState(false);
  const [searchText,setSearchText] = useState('');

  const categoriasFiltrado = categorias.filter(categoria => categoria.nome && categoria.nome.toLowerCase().includes(searchText.toLowerCase()),);

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
      name: '',
      cell: row =><Button m="2" onClick={()=>onEdit(row)} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='xs'>EDITAR</Button>
    },
    
];


  useEffect(()=>{
      const getCategorias = async () => {
          setLoadingData(true);
          let json = await Api.getCategorias();
          setCategorias(json);
          setLoadingData(false);
      }
      getCategorias();
  }, []);

  const onSalvar = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const fd = new FormData();

    fd.append('nome',categoria.nome);
    fd.append('imagem',categoria.imagem);

    if(!editando){
      let response = await Api.addCategoria(fd);
      if(response.status===201){
        let json = await Api.getCategorias();
        setCategoria({id:null,nome:'',imagem:''});
        //setNome('');
        //setImagem('');
        setCategorias(json);
        toast({title: 'Parabéns !', description: "Você adicionou uma nova categoria.",status: 'success',duration: 3000,isClosable: true,});
        onClose();
        setIsLoading(false);
    } else {
      toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
      
    }
    setIsLoading(false);
} else {
  let response = await Api.updateCategoria(categoria.id,fd);
  if(response.status===200){
    let json = await Api.getCategorias();
    setCategoria({id:null,nome:'',imagem:''});
    setCategorias(json);
    toast({title: 'Parabéns !',description: "Você atualizou uma categoria.",status: 'success', duration: 3000,isClosable: true,});
    onClose();
} else {
  toast({title: 'Atenção !',description: "Campos obrigatórios não informados.",status: 'error', duration: 3000, isClosable: true,})
}
setIsLoading(false);
}


}


const onAdd = () => {
  setCategoria({id:null,nome:'',imagem:''});  
  setEditando(false);
  onOpen();
}

const onEdit = async (categoria) => {
  let json = await Api.getCategoriabyId(categoria.id);
  setCategoria(json);
  setEditando(true);
  onOpen();
 }




return (
    <Flex w='full'  minH={'100vh'} height='100vh' direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
        <Heading color='red.500' mb='4' fontSize={['1xl','2xl']}>Categorias</Heading>
        {loadingData ? <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>: <Box w={{ base: '350px', md: '500px', lg: '1000px' }} rounded={'lg'} bg={'white'} boxShadow={['none','lg']} p={[0,8]}>
          <Button onClick={onAdd} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='sm'>ADICIONAR CATEGORIA</Button>
          <SearchField setSearchText={setSearchText} placeholder={'Pesquisar nas categorias'}/>
          <DataTable
                columns={columns}
                data={categoriasFiltrado}
                highlightOnHover
                noDataComponent="Registros não encontrados."
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
       </Box>}
        <ModalCategoria isOpen={isOpen} editando={editando} onClose={onClose} categoria={categoria} setCategoria={setCategoria} onSalvar={onSalvar} isLoading={isLoading}/>
    </Flex>      

)



}

export default Categorias2
