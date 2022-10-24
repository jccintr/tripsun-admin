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

const TableAtividades = ({prestadores,filter,onEdit}) => {
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
    {prestadores.filter(
      (prestador) =>
      prestador.nome.toUpperCase().includes(filter.toUpperCase())).map((prestador) => (
              <Tr key={prestador.id}>
              
              <Td isNumeric>{prestador.id}</Td>
              <Td>{prestador.nome}</Td>
              <Td>{prestador.nome_cidade}</Td>
              <Td>
                  <Image
                    boxSize='50px'
                    borderRadius='10px'
                    objectFit='cover'
                    src={`${Api.base_storage}/${prestador.imagem}`}
                    alt={prestador.nome}
                  />
              </Td>
              <Td>
                 <Button onClick={()=>onEdit(prestador.id)} colorScheme='red' mr={3} >
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