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
                 <Button onClick={()=>onEdit(usuario.id)} colorScheme='red' mr={3} >
                    Editar
                  </Button>
              </Td>
              <Td>
                 <Button onClick={()=>onTrocaSenha(usuario.id)} colorScheme='red' mr={3} >
                    Alterar Senha
                  </Button>
              </Td>
          
            </Tr>
              ))}
      
     
    </Tbody>
   
  </Table>
</TableContainer>
  )
}

export default TableUsuariosParceiros