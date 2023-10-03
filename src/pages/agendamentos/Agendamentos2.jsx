import React ,{ useState, useEffect} from 'react'
import Api from '../../Api';
import { Spinner } from '@chakra-ui/react'
import DataTable from 'react-data-table-component';
import {Flex,Heading,Box} from '@chakra-ui/react';
import SearchField from '../../components/SearchField';

const paginationComponentOptions = {
    rowsPerPageText: 'Registros por Página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };


const Agendamentos2 = () => {
    const [isLoading,setIsLoading] = useState(false);
    const [loadingData,setLoadingData] = useState(false);
    const [searchText,setSearchText] = useState('');
    const [agendamentos,setAgendamentos] = useState([]);
    

    const agendamentosFiltrado = agendamentos.filter(agendamento => agendamento.servico.nome && agendamento.servico.nome.toLowerCase().includes(searchText.toLowerCase()),);

    const customStyles = {
        headCells: {
          style: {
            color: '#000000',
            fontSize: '14px',
            fontWeight: 'bold',
           },
        },
       
      };

    useEffect(()=>{
        const getAgendamentos = async () => {
            setLoadingData(true);
            let json = await Api.getAgendamentos();
            setAgendamentos(json);
            setLoadingData(false);
        }
        getAgendamentos();
    }, []);

    const columns = [
        
        {
          name: 'Data',
          selector: row => formataData(row.data_agendamento),
        },
        {
            name: 'Hora',
            selector: row => formataHorario(row.data_agendamento),
        },
        {
            name: 'Serviço',
            selector: row => row.servico.nome,
        },
        {
            name: 'Cliente',
            selector: row => row.user.name,
        },
        {
            name: 'Quant',
            selector: row => row.quantidade,
        },
        {
            name: 'Total',
            selector: row => row.total,
        },
        {
            name: 'Comissão',
            selector: row => row.valor_plataforma,
        },
        {
            name: 'Status',
            selector: row => statusCobranca(row.cobranca_status),
        },        
        
    ];

    const formataData = (d) =>{
        let data = d.substring(0,10);
        let arr = data.split('-');
        return arr[2]+'/'+arr[1]+'/'+arr[0];
      }
      const formataHorario = (d) =>{
           return d.substring(11,16);
       }
    
       const Pendente = () =>{
        return (<span style={{color:'#f00'}}>AGUARDANDO PAGAMENTO</span>)
       }
    
       const statusCobranca = (statusAsaas) => {
        switch(statusAsaas) {
            case 'PAYMENT_CONFIRMED':
              return 'RECEBIDO';
              break;
            case 'PAYMENT_RECEIVED':
              return 'RECEBIDO';
              break;
            default:
              return <Pendente/>;
          } 
    }
    


  return (
    <Flex w='full'  minH={'100vh'}  direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
       <Heading color='red.500' mb='4' fontSize={['1xl','2xl']}>Agendamentos</Heading>
       
       {loadingData ? <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>: <Box w={{ base: '350px', md: '500px', lg: '1000px' }} rounded={'lg'} bg={'white'} boxShadow={['none','lg']} p={[0,8]}>
          <SearchField setSearchText={setSearchText} placeholder={'Pesquisar nos agendamentos'}/>
          <DataTable
                columns={columns}
                data={agendamentosFiltrado}
                highlightOnHover
                noDataComponent="Registros não encontrados."
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
       </Box>}
      
    </Flex>
  )
}

export default Agendamentos2