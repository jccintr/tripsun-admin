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
    TableContainer,Image,Button,
  } from '@chakra-ui/react'

const TableAtividades = ({servicos,filter,onEdit,onOpenModalImage}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        <Th>id</Th>
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
              
              <Td isNumeric>{servico.id}</Td>
              <Td>{servico.nome}</Td>
              <Td>{servico.prestador.nome}</Td>
              <Td>{servico.nome_cidade}</Td>
              
              <Td>
                 <Button onClick={()=>onEdit(servico.id)} colorScheme='red' mr={3} >
                    Editar
                  </Button>
              </Td>
              <Td>
                 <Button onClick={()=>onOpenModalImage(servico.id)} colorScheme='red' mr={3} >
                    Imagens
                  </Button>
              </Td>
             
             
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableAtividades