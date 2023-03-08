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

const TableParceiros = ({parceiros,filter,onEdit}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        {/*<Th>id</Th>*/}
        <Th>Nome</Th>
        <Th>Cidade</Th>
        <Th>Imagem</Th> 
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
    {parceiros.filter(
      (parceiro) =>
      parceiro.nome.toUpperCase().includes(filter.toUpperCase())).map((parceiro) => (
              <Tr key={parceiro.id}>
              
              {/*<Td isNumeric>{parceiro.id}</Td>*/}
              <Td>{parceiro.nome}</Td>
              <Td>{parceiro.nome_cidade}</Td>
              <Td>
                  <Image
                    boxSize='50px'
                    borderRadius='10px'
                    objectFit='cover'
                    src={`${Api.base_storage}/${parceiro.logotipo}`}
                    alt={parceiro.nome}
                  />
              </Td>
              <Td>
              <FaEdit title="Editar" onClick={()=>onEdit(parceiro.id)}  className="icon" size={22} />
               
              </Td>
             
             
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableParceiros