import React, {useState} from 'react';
import {Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Text,HStack} from '@chakra-ui/react';
import {Select,FormControl,FormLabel,Input,Divider} from '@chakra-ui/react';
import {TableContainer,Table,Thead,Tr,Th,Tbody,Td} from '@chakra-ui/react';
import { FaRegTrashAlt } from "react-icons/fa";
import DataTable from 'react-data-table-component';

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};


const ModalHorarios = ({isOpen,onClose,horarios,onDeleteHorario,adicionaHorario}) => {
  const [diaSemana,setDiaSemana] = useState(null);
  const [horas,setHoras] = useState('');
  let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  

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
      name: 'Dia',
      width:'100px',
      selector: row => days[row.weekday],
    },
    {
      name: 'Horarios',
      selector: row => row.horas,
      },
   
    {
      name: '',
       cell: row =><FaRegTrashAlt title="Excluir horário" style={{color: '#f00'}} onClick={()=>onDeleteHorario(row.id)} size={18} />
                    
    },
  
    
];
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
       <ModalOverlay />
       <ModalContent>
          <ModalHeader>Horários da Atividade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>


            <HStack style={{marginBottom:10}} justify='center' align='center'>
            <FormControl w='200px'>
                    <FormLabel>
                      Dia da Semana:
                    </FormLabel>
                    <Select
                        placeholder='Selecione'
                        value={diaSemana}
                        onChange={e => setDiaSemana(e.target.value)}>
                          {days.map((day,index)=> (
                            <option value={index}>{day}</option>
                          ))}
                    </Select>
                </FormControl>

            <FormControl >
                <FormLabel>
                  Horários:
                </FormLabel>
                <Input
                    value={horas}
                    onChange={e => setHoras(e.target.value)}
                    placeholder='Horários da atividade...'
                    />
            </FormControl>

            </HStack>
            <HStack style={{marginBottom:10}}>
               <Button  width={{base:'100%'}} color='red'  onClick={()=>adicionaHorario(diaSemana,horas)}>Adicionar</Button>
            </HStack>
            <Divider orientation='horizontal' />
            {/*
            {horarios.length > 0 ?
            <TableContainer>
              <Table variant='striped'>
                <Thead>
                  <Tr>
                    <Th>Dia da Semana</Th>
                    <Th>Horários Disponíveis</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                {horarios.map((horario) => (
                    <Tr key={horario.id}>
                        <Td>{days[horario.weekday]}</Td>
                        <Td>{horario.horas}</Td>
                        <Td><FaRegTrashAlt title="Excluir horário" style={{color: '#f00'}} onClick={()=>onDeleteHorario(horario.id)} size={18} /></Td>
                    </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer> : <HStack justify='center' align='center'><Text fontSize='16px' color='red'>Nenhum horário cadastrado.</Text></HStack> }
                */}
                <DataTable
            columns={columns}
            data={horarios}
            highlightOnHover
            noDataComponent="Registros não encontrados."
            pagination
            paginationComponentOptions={paginationComponentOptions}
            customStyles={customStyles}
        />
          </ModalBody>
          <ModalFooter>
          <Button onClick={onClose} colorScheme='red' mr={3} >
            Fechar
          </Button>
          </ModalFooter>
       </ModalContent>


    </Modal>
  )
}


export default ModalHorarios