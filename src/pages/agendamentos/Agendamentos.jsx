import React, {useState,useEffect} from 'react'
import TableAgendamentos from '../../components/tableAgendamentos/TableAgendamentos';
import Api from '../../Api';
import Navbar from '../../components/navbar/Navbar';
import { useToast,Spinner } from '@chakra-ui/react'
import styles from "./styles.module.css";

const Agendamentos = () => {
   
    const [isLoading,setIsLoading] = useState(false);
    const [loadingData,setLoadingData] = useState(false);
    const [filter,setFilter] = useState('');
    const [agendamentos,setAgendamentos] = useState([]);
    const toast = useToast();

    useEffect(()=>{
        const getAgendamentos = async () => {
            setLoadingData(true);
            let json = await Api.getAgendamentos();
           
            setAgendamentos(json);
            setLoadingData(false);
        }
        getAgendamentos();
    }, []);

    const onAdd = () => {
 
        toast({
         title: 'Aviso !',
         description: "Agendamentos só podem ser feitos pelo aplicativo móvel.",
         status: 'error',
         duration: 3000,
         isClosable: true,
       });
       }

    return (
        <div className={styles.container}>
            <Navbar onClick={onAdd} setFilter={setFilter} title="Agendamentos"/>
            
            
            {loadingData ? <div className={styles.spinner}>
                               <Spinner color='#EB0303' emptyColor='gray.200' thickness='4px' size='xl'/>
                           </div>
                           :agendamentos.length>0&&<TableAgendamentos agendamentos={agendamentos}/>}

           {!loadingData && agendamentos.length===0&&<div className={styles.spinner}><p className={styles.noRecordText}>Nenhum registro encontrado!</p></div>}
           
        </div>
      )
}

export default Agendamentos