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
    TableContainer,Image,
  } from '@chakra-ui/react'

const TableParceiros = ({parceiros,filter}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        <Th>id</Th>
        <Th>Nome</Th>
        <Th>Cidade</Th>
        <Th>Logotipo</Th>
      </Tr>
    </Thead>
    <Tbody>
    {parceiros.filter(
      (parceiro) =>
      parceiro.nome.toUpperCase().includes(filter.toUpperCase())).map((parceiro) => (
              <Tr key={parceiro.id}>
              
              <Td isNumeric>{parceiro.id}</Td>
              <Td>{parceiro.nome}</Td>
              
              <Td>
                  <Image
                    boxSize='50px'
                    borderRadius='10px'
                    objectFit='cover'
                    src={`${Api.base_storage}/${parceiro.imagem}`}
                    alt={parceiro.nome}
                  />
              </Td>
             
             
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableParceiros