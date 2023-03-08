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
  import {FaEdit } from "react-icons/fa";

const TableCategorias = ({categorias,filter,onEdit}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
       {/* <Th>id</Th>*/}
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
              
             {/* <Td isNumeric>{categoria.id}</Td>*/}
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
                 <FaEdit title="Editar" onClick={()=>onEdit(categoria.id)}  className="icon" size={22} />
                 
              </Td>
             
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableCategorias