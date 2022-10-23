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

const TableCategorias = ({categorias,filter,onEdit}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        <Th>id</Th>
        <Th>Nome</Th>
        <Th>Imagem</Th>
        <Th></Th>
      </Tr>
    </Thead>

    <Tbody>
    {categorias.filter(
      (categoria) =>
      categoria.nome.toUpperCase().includes(filter.toUpperCase())).map((categoria) => (
              <Tr key={categoria.id}>
              
              <Td isNumeric>{categoria.id}</Td>
              <Td>{categoria.nome}</Td>
              <Td>
                  <Image
                    boxSize='50px'
                    borderRadius='10px'
                    objectFit='cover'
                    src={`${Api.base_storage}/${categoria.imagem}`}
                    alt={categoria.nome}
                  />
              </Td>
              <Td>
                 <Button onClick={()=>onEdit(categoria.id)} colorScheme='red' mr={3} >
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

export default TableCategorias