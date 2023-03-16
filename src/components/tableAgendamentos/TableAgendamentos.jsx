import React from 'react';

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,Image,Button,
  } from '@chakra-ui/react';


  const formataData = (d) =>{
    let data = d.substring(0,10);
    let arr = data.split('-');
    return arr[2]+'/'+arr[1]+'/'+arr[0];
  }
  const formataHorario = (d) =>{
       return d.substring(11,16);
   }


const TableAgendamentos = ({agendamentos}) => {
    return (
        <TableContainer>
      <Table variant='striped'>
        
        <Thead>
          <Tr>
            <Th>id</Th>
            <Th>Data</Th>
            <Th>Horario</Th>
            <Th>Serviço</Th>
             <Th>Cliente</Th>
            <Th>Quant</Th>
            <Th>Total</Th>
            <Th>Comissão</Th>
           
          </Tr>
        </Thead>
    
        <Tbody>
        {agendamentos.map((agendamento) => (
                  <Tr key={agendamento.id}>

                        <Td isNumeric>{agendamento.id}</Td>
                        <Td>{formataData(agendamento.data_agendamento)}</Td>
                        <Td>{formataHorario(agendamento.data_agendamento)}</Td>
                        <Td>{agendamento.servico.nome}</Td>
                        <Td>{agendamento.user.name}</Td>
                        <Td isNumeric>{agendamento.quantidade}</Td>
                        <Td isNumeric>{agendamento.total}</Td>
                        <Td isNumeric>{agendamento.valor_plataforma}</Td>
                        
                  </Tr>
                  ))}
          
         
        </Tbody>
       
      </Table>
    </TableContainer>
      )
}

export default TableAgendamentos