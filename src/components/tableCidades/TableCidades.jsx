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
    TableContainer,Image,Button
  } from '@chakra-ui/react'
  

const TableCidades = ({cidades,filter,onEdit}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        <Th>id</Th>
        <Th>Nome</Th>
        <Th>Estado</Th>
        <Th>Imagem</Th>
        <Th></Th>
      </Tr>
    </Thead>

    <Tbody>
    {cidades.filter(
      (cidade) =>
      cidade.nome.toUpperCase().includes(filter.toUpperCase())).map((cidade) => (
              <Tr key={cidade.id}>
              
              <Td isNumeric>{cidade.id}</Td>
              <Td>{cidade.nome}</Td>
              <Td>{cidade.estado}</Td>
              <Td>
                  <Image
                    boxSize='50px'
                    borderRadius='10px'
                    objectFit='cover'
                    src={`${Api.base_storage}/${cidade.imagem}`}
                    alt={cidade.nome}
                  />
              </Td>
              <Td>
                 <Button onClick={()=>onEdit(cidade.id)} colorScheme='red' mr={3} >
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

export default TableCidades