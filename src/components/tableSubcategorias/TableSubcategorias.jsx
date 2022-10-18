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

const TableSubcategorias = ({subCategorias,filter}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        <Th>id</Th>
        <Th>Nome</Th>
        <Th>Categoria</Th>
        <Th>Imagem</Th>
      </Tr>
    </Thead>
    <Tbody>
    {subCategorias.filter(
      (subCategoria) =>
      subCategoria.nome.toUpperCase().includes(filter.toUpperCase())).map((subCategoria) => (
              <Tr key={subCategoria.id}>
              
              <Td isNumeric>{subCategoria.id}</Td>
              <Td>{subCategoria.nome}</Td>
              <Td>{subCategoria.nome_categoria}</Td>
              <Td>
                  <Image
                    boxSize='50px'
                    borderRadius='10px'
                    objectFit='cover'
                    src={`${Api.base_storage}/${subCategoria.imagem}`}
                    alt={subCategoria.nome}
                  />
              </Td>
             
             
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableSubcategorias