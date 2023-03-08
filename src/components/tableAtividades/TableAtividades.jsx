import React  from 'react'
import Api from '../../Api';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,Button,
  } from '@chakra-ui/react'
  import { FaCalendarAlt,FaImages,FaEdit } from "react-icons/fa";
  


const TableAtividades = ({servicos,filter,onEdit,onOpenModalImage,onOpenModalHorarios}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        {/*<Th>id</Th>*/}
        <Th>Nome</Th>
        <Th>Parceiro</Th>
        <Th>Cidade</Th> 
        
      </Tr>
    </Thead>
    <Tbody>
    {servicos.filter(
      (servico) =>
      servico.nome.toUpperCase().includes(filter.toUpperCase())).map((servico) => (
              <Tr key={servico.id}>
              
                 {/* <Td isNumeric>{servico.id}</Td>*/}
                  <Td>{servico.nome.length>30 ? servico.nome.substring(0,30)+'...':servico.nome}</Td>
                  <Td>{servico.prestador.nome.length>30 ? servico.prestador.nome.substring(0,30)+'...':servico.prestador.nome}</Td>
                  <Td>{servico.nome_cidade}</Td>
                  <Td>
                    <FaEdit title="Editar" onClick={()=>onEdit(servico.id)}  className="icon" size={22} />
                   
                  </Td>
                  <Td>
                    <FaImages title="Imagens da Atividade" onClick={()=>onOpenModalImage(servico.id)}  className="icon" size={22} />
                  </Td>
                  <Td>
                    <FaCalendarAlt title="Horários da Atividade" onClick={()=>onOpenModalHorarios(servico.id)} className="icon" size={22} />
                  </Td>
             
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableAtividades