import React ,{ useState, useEffect} from 'react'
import Api from '../../Api';
import { useToast,Spinner } from '@chakra-ui/react'
import {useDisclosure,Button,Image} from '@chakra-ui/react'
import {Flex,Heading,Box} from '@chakra-ui/react'
import DataTable from 'react-data-table-component';
import ModalAtividade from '../../components/modals/ModalAtividade';
import ModalIconeAtividade from '../../components/modals/ModalIconeAtividade';
import ModalImagensAtividade from '../../components/modals/ModalImagensAtividade';
import SearchField from '../../components/SearchField';
import ModalHorarios from '../../components/modals/ModalHorarios';

const paginationComponentOptions = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };


const Atividades2 = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenModalIcone , onOpen: onOpenModalIcone, onClose: onCloseModalIcone } = useDisclosure()
    const { isOpen: isOpenModalImagens , onOpen: onOpenModalImagens, onClose: onCloseModalImagens } = useDisclosure()
    const { isOpen: isOpenModalHorarios , onOpen: onOpenModalHorarios, onClose: onCloseModalHorarios } = useDisclosure()
    const [atividades,setAtividades] = useState([]);
    const [atividade,setAtividade] = useState({});
    const [parceiros,setParceiros] = useState([]);
    const [cidades,setCidades] = useState([]);
    const [categorias,setCategorias] = useState([]);
    const [subcategorias,setSubcategorias] = useState([]);
    const toast = useToast();
    const [editando,setEditando] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [loadingData,setLoadingData] = useState(false);
    const [searchText,setSearchText] = useState('');
    
    const [icone,setIcone] = useState(null);
    const [novoIcone,setNovoIcone] = useState(null);
    const [novoIconeScreen,setNovoIconeScreen] = useState(null);

    const [imagens,setImagens] = useState([]);
    const [novaImagem,setNovaImagem] = useState('');

    const [horarios,setHorarios] = useState([]);
    const [dataCalendario, setDataCalendario] = useState(new Date());

    const atividadesFiltrado = atividades.filter(atividade => atividade.nome && atividade.nome.toLowerCase().includes(searchText.toLowerCase()),);

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
    // {
    //   name: 'id',
    //   selector: row => row.id,
    // },
    {
      name: 'Nome',
      selector: row => row.nome,
    },
    {
      name: 'Parceiro',
      selector: row => row.prestador.nome,
      },
    {
      name: 'Cidade',
      selector: row => row.nome_cidade,
    },
    {
      name: '',
      width:'340px',
       cell: row =><><Button m="2"  onClick={()=>onEdit(row)} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='xs' w='100'>EDITAR</Button>
              <Button m="2" onClick={()=>openModalIcon(row)} bg={'blue.500'} color={'white'} _hover={{bg: 'blue.600',}} size='xs'>ÍCONE</Button>
              <Button m="2"  onClick={()=>abreModalImagens(row)} bg={'green.500'} color={'white'} _hover={{bg: 'green.600',}} size='xs'>IMAGENS</Button>
              <Button m="2"  onClick={()=>abreModalHorarios(row)} bg={'orange.500'} color={'white'} _hover={{bg: 'orange.600',}} size='xs'>HORÁRIOS</Button>
                    </>
    },
    /*
    {
      name: '',
       cell: row =><Button m="2"  onClick={()=>onEdit(row)} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='xs' w='100'>EDITAR</Button>
                    
    },
    {
      name: '',
       cell: row =><Button m="2" onClick={()=>openModalIcon(row)} bg={'blue.500'} color={'white'} _hover={{bg: 'blue.600',}} size='xs'>ÍCONE</Button>
               
    },
    {
      name: '',
       cell: row =><Button m="2"  onClick={()=>abreModalImagens(row)} bg={'green.500'} color={'white'} _hover={{bg: 'green.600',}} size='xs'>IMAGENS</Button>
                  
    },
    {
      name: '',
       cell: row =><Button m="2"  onClick={()=>abreModalHorarios(row)} bg={'orange.500'} color={'white'} _hover={{bg: 'orange.600',}} size='xs'>HORÁRIOS</Button>
               
    },
   */
    
];

useEffect(()=>{
    const getAtividades = async () => {
    setLoadingData(true);
    let json = await Api.getAtividades();
        setAtividades(json);
        setLoadingData(false);
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

  const handlerImagem = async (e) => {
    setNovaImagem(e.target.files[0]);
    adicionaImagem();
  }

  const deleteImage = async (id) => {
    let response = await Api.deleteImagem(id);
    let json = await Api.getImagensByServico(atividade.id);
   setImagens(json);
 }

 const adicionaImagem = async () => {
  const fd = new FormData();
   fd.append('servico_id',atividade.id);
  fd.append('imagem',novaImagem);
  let response = await Api.addImagem(fd);
  if(response.status===201){
    let json = await Api.getImagensByServico(atividade.id);
    setImagens(json);
  }
}

const abreModalImagens = async (atividade) => {
  setAtividade(atividade);
  let json = await Api.getImagensByServico(atividade.id);
  setImagens(json);
  onOpenModalImagens();
}

const abreModalHorarios = async (atividade) => {
  setAtividade(atividade);
  let mes = dataCalendario.getMonth() + 1;
  let data = dataCalendario.getFullYear() + '-' + mes + '-' + dataCalendario.getDate();
  let json = await Api.getHorariosByServico(atividade.id);
  setHorarios(json);
  onOpenModalHorarios();
}

  
const onSalvar = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let categoria_id = atividade.categoria_id;
    let subcategoria_id = atividade.subcategoria_id;
    let cidade_id = atividade.cidade_id;
    let prestador_id = atividade.prestador_id;
    let nome = atividade.nome;
    let destaque = atividade.destaque;
    let latitude = atividade.latitude;
    let longitude = atividade.longitude;
    let duracao = atividade.duracao;
    let horario = atividade.horario;
    let endereco = atividade.endereco;
    let ponto_encontro = atividade.ponto_encontro;
    let percentual_plataforma = atividade.percentual_plataforma;
    let descricao_curta = atividade.descricao_curta;
    let atrativos = atividade.atrativos;
    let itens_fornecidos = atividade.itens_fornecidos;
    let itens_obrigatorios = atividade.itens_obrigatorios;
    let preco = atividade.preco;
    let vagas = atividade.vagas;
    
    if(!editando){
        let response = await Api.addAtividade(nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,preco,vagas);
        if(response.status===201){
            let json = await Api.getAtividades();
            setAtividades(json);
            toast({title: 'Parabéns !',description: "Você adicionou uma nova atividade.",status: 'success',duration: 3000,isClosable: true,});
          onClose();
        } else {
          toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
  
        }
        setIsLoading(false);
   } else {
    let response = await Api.updateAtividade(atividade.id,nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,preco,vagas);
    if(response.status===200){
      let json = await Api.getAtividades();
      setAtividades(json);
      toast({title: 'Parabéns !',description: "Você atualizou uma atividade.",status: 'success',duration: 3000,isClosable: true,});
      onClose();
  } else {
    toast({title: 'Atenção !',description: "Campos obrigatórios não informados.",status: 'error',duration: 3000,isClosable: true,})
  }
  setIsLoading(false);
  
  }
  
  
  }

  const openModalIcon = async (atividade) => {
    let json = await Api.getAtividadebyId(atividade.id);
    setAtividade(json);
    setIcone(json.imagem);
    setNovoIcone(null);
    setNovoIconeScreen(null);
    onOpenModalIcone();
  }

  const onSalvarIcone = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const fd = new FormData();
    fd.append('icone',novoIcone);
    let response = Api.addIcone(atividade.id,fd);
    toast({
      title: 'Parabéns !',
      description: "Você atualizou o icone de uma atividade.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setIsLoading(false);
    onCloseModalIcone();
    
  }

  const onAdd = () => {
    setAtividade({
        id: null,
        categoria_id: null,
        subcategoria_id: null,
        cidade_id: null,
        prestador_id: null,
        nome: '',
        destaque: true,
        latitude:'',
        longitude:'',
        duracao:'',
        horario:'',
        endereco: '',
        ponto_encontro: '',
        percentual_plataforma: 2,
        descricao_curta:'',
        atrativos: '',
        itens_fornecidos: '',
        itens_obrigatorios: '',
        preco: '',
        vagas: 1
        //valor: 0
      });
    setEditando(false);
    onOpen();
  }
  
  const onEdit = async (atividade) => {
  
    let json = await Api.getAtividadebyId(atividade.id);
    setAtividade(json);
    setEditando(true);
    onOpen();
    }

    const handlerIcone = async (e) => {
      if(e.target.files[0]){
        setNovoIcone(e.target.files[0]);
        setNovoIconeScreen(URL.createObjectURL(e.target.files[0]));
       }
    }

    const adicionaHorario = async (diaSemana,horas) => {

      let response = await Api.addHorario(atividade.id,diaSemana,horas);
  
      if(response.status===201){
  
        let json = await Api.getHorariosByServico(atividade.id);
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
  
    const onDeleteHorario = async (id) => {
      let response = await Api.deleteHorario(id);
      let json = await Api.getHorariosByServico(atividade.id);
      setHorarios(json);
    }
  


  return (
    <Flex w='full'  minH={'100vh'}  direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
    <Heading color='red.500' mb='4' fontSize={['1xl','2xl']}>Atividades</Heading>
    {loadingData ? <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>: <Box w={{ base: '350px', md: '500px', lg: '1000px' }} rounded={'lg'} bg={'white'} boxShadow={['none','lg']} p={[0,8]}>
      <Button onClick={onAdd} bg={'red.500'} color={'white'} _hover={{bg: 'red.600',}} size='sm'>ADICIONAR ATIVIDADE</Button>
      <SearchField setSearchText={setSearchText} placeholder={'Pesquisar nas atividades'}/>
      <DataTable
            columns={columns}
            data={atividadesFiltrado}
            highlightOnHover
            noDataComponent="Registros não encontrados."
            pagination
            paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
        />
   </Box>}
    <ModalAtividade
     isOpen={isOpen} 
     editando={editando} 
     onClose={onClose}
     atividade={atividade}
     setAtividade={setAtividade}
     categorias={categorias}
     subcategorias={subcategorias}  
     cidades={cidades}
     parceiros={parceiros}
     onSalvar={onSalvar} 
     isLoading={isLoading} 
     />
    <ModalIconeAtividade 
     isOpen={isOpenModalIcone}
     onClose={onCloseModalIcone}
     onSalvar={onSalvarIcone}
     handlerIcone={handlerIcone}
     novoIconeScreen={novoIconeScreen}
     isLoading={isLoading}
     icone={icone}
    />
    <ModalImagensAtividade 
    isOpen={isOpenModalImagens}
    onClose={onCloseModalImagens}
    imagens={imagens}
    deleteImage={deleteImage}
    handlerImagem={handlerImagem}
    />
    <ModalHorarios
    isOpen={isOpenModalHorarios}
    onClose={onCloseModalHorarios}
    horarios={horarios}
    onDeleteHorario={onDeleteHorario}
    adicionaHorario={adicionaHorario}
    />
</Flex>  
  )
}

export default Atividades2