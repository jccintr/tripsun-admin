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
  import {FaEdit,FaUnlockAlt } from "react-icons/fa";

const TableUsuariosParceiros = ({usuarios,filter,onEdit,onTrocaSenha}) => {
  return (
    <TableContainer>
  <Table variant='striped'>
    
    <Thead>
      <Tr>
        <Th>id</Th>
        <Th>Nome</Th>
        <Th>Email</Th>
        <Th>Telefone</Th>
        <Th></Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody>
    {usuarios.filter(
      (usuario) =>
      usuario.name.toUpperCase().includes(filter.toUpperCase())).map((usuario) => (
              <Tr key={usuario.id}>
              
              <Td isNumeric>{usuario.id}</Td>
              <Td>{usuario.name}</Td>
              <Td>{usuario.email}</Td>
              <Td>{usuario.telefone}</Td>
              <Td>
              <FaEdit title="Editar" onClick={()=>onEdit(usuario.id)}  className="icon" size={22} />
                 
              </Td>
              <Td>
              <FaUnlockAlt title="Alterar senha" onClick={()=>onTrocaSenha(usuario.id)}  className="icon" size={22} />
                 
              </Td>
          
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableUsuariosParceiros