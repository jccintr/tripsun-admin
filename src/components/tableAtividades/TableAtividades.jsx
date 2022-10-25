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

const TableAtividades = ({servicos,filter,onEdit}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        <Th>id</Th>
        <Th>Nome</Th>
        <Th>Cidade</Th>
        <Th>Imagem</Th> 
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
    {servicos.filter(
      (servico) =>
      servico.nome.toUpperCase().includes(filter.toUpperCase())).map((servico) => (
              <Tr key={servico.id}>
              
              <Td isNumeric>{servico.id}</Td>
              <Td>{servico.nome}</Td>
              <Td>{servico.nome_cidade}</Td>
              <Td>
                  <Image
                    boxSize='50px'
                    borderRadius='10px'
                    objectFit='cover'
                    src={`${Api.base_storage}/${servico.imagem}`}
                    alt={servico.nome}
                  />
              </Td>
              <Td>
                 <Button onClick={()=>onEdit(servico.id)} colorScheme='red' mr={3} >
                    Editar
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