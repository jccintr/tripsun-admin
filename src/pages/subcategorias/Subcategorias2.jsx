import React ,{ useState, useEffect} from 'react'
import Api from '../../Api';
import { useToast,Spinner } from '@chakra-ui/react'
import {useDisclosure,Button,Image} from '@chakra-ui/react'
import {Flex,Heading,Box} from '@chakra-ui/react'
import DataTable from 'react-data-table-component';

import ModalSubcategoria from '../../components/modals/ModalSubcategoria';
import SearchField from '../../components/SearchField';

const paginationComponentOptions = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };




const Subcategorias2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [categorias,setCategorias] = useState([]);
  const [subCategorias,setSubcategorias] = useState([]);
  const [subCategoria,setSubcategoria] = useState({id:null,nome:'',categoria_id:0,imagem:'',marcador:''});
  const toast = useToast();
  const [editando,setEditando] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [loadingData,setLoadingData] = useState(false);
  const [searchText,setSearchText] = useState('');

  const subCategoriasFiltrado = subCategorias.filter(subcategoria => subcategoria.nome && subcategoria.nome.toLowerCase().includes(searchText.toLowerCase()),);

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
        name: 'Categoria',
        selector: row => row.nome_categoria,
      },
    {
        name: 'Marcador',
        width: '100px',
        center: true,
        hide: 'sm',
        cell: row => <Image p={2}  w='60px' h='60px' src={`${Api.base_storage}/${row.marcador}`} />,
      },
    
    {
      name: '',
      cell: row =><Button m="2" onClick={()=>onEdit(row)} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='xs'>EDITAR</Button>
    },
    
];


useEffect(()=>{
    const getSubcategorias = async () => {
        setLoadingData(true);
        let json = await Api.getSubcategorias();
        setSubcategorias(json);
        setLoadingData(false);
    }
    getSubcategorias();
  }, []);

useEffect(()=>{
  const getCategorias = async () => {
  
      let json = await Api.getCategorias();
      setCategorias(json);
      
  }
  getCategorias();
}, []);


const onSalvar = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const fd = new FormData();
   
    fd.append('nome',subCategoria.nome);
    fd.append('categoria_id',subCategoria.categoria_id);
    fd.append('imagem',subCategoria.imagem);
    fd.append('marcador',subCategoria.marcador);

    
    if(!editando){
        let response = await Api.addSubcategoria(fd);
        if(response.status===201){
            let json = await Api.getSubcategorias();
            setSubcategoria({id:null,nome:'',categoria_id:0,imagem:'',marcador:''});
            setSubcategorias(json);
            toast({title: 'Parabéns !',description: "Você adicionou uma nova subcategoria.",status: 'success',duration: 3000,isClosable: true,});
            onClose();
        } else {
            toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
        }
        setIsLoading(false);
  } else {
        
        let response = await Api.updateSubcategoria(subCategoria.id,fd);
        
        if(response.status===200){
            let json = await Api.getSubcategorias();
            setSubcategoria({id:null,nome:'',categoria_id:0,imagem:'',marcador:''});
            setSubcategorias(json);
            toast({
                title: 'Parabéns !',
                description: "Você atualizou uma Subcategoria.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } else {
            toast({title: 'Atenção !',description: "Campos obrigatórios não informados.",status: 'error',duration: 3000,isClosable: true,})
        }
        setIsLoading(false);
        }
      
}

const onAdd = () => {
  setSubcategoria({id:null,nome:'',categoria_id:0,imagem:'',marcador:''});
  setEditando(false);
  onOpen();
}


 const onEdit = async (subcategoria) => {
   
    let json = await Api.getSubcategoriabyId(subcategoria.id);
   
    setSubcategoria(json);
    setEditando(true);
    onOpen();
   }




return (
    <Flex w='full'  minH={'100vh'} direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
        <Heading color='red.500' mb='4' fontSize={['1xl','2xl']}>Subcategorias</Heading>
        {loadingData ? <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>: <Box w={{ base: '350px', md: '500px', lg: '1000px' }} rounded={'lg'} bg={'white'} boxShadow={['none','lg']} p={[0,8]}>
          <Button onClick={onAdd} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='sm'>ADICIONAR SUBCATEGORIA</Button>
          <SearchField setSearchText={setSearchText} placeholder={'Pesquisar nas subcategorias'}/>
          <DataTable
                columns={columns}
                data={subCategoriasFiltrado}
                highlightOnHover
                noDataComponent="Registros não encontrados."
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
       </Box>}
        <ModalSubcategoria isOpen={isOpen} editando={editando} onClose={onClose} subCategoria={subCategoria} setSubcategoria={setSubcategoria} onSalvar={onSalvar} isLoading={isLoading} categorias={categorias}/>
    </Flex>      

)



}

export default Subcategorias2
