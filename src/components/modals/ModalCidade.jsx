import React, {useRef} from 'react';
import {Input,Select,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,} from '@chakra-ui/react'

const estados = [
    { sigla: 'AC',nome: 'Acre' },
    { sigla:'AL',nome: 'Alagoas' },
    { sigla: 'AP',nome: 'Amapá' },
    { sigla: 'AM',nome: 'Amazonas' },
    { sigla: 'BA',nome: 'Bahia' },
    { sigla:'CE',nome: 'Ceará' },
    { sigla:'DF',nome: 'Distrito Federal' },
    { sigla:'ES',nome: 'Espírito Santo' },
    { sigla: 'GO',nome: 'Goías' },
    { sigla:'MA',nome: 'Maranhão' },
    { sigla :'MT',nome: 'Mato Grosso' },
    { sigla:'MS',nome: 'Mato Grosso do Sul' },
    { sigla :'MG',nome: 'Minas Gerais' },
    { sigla:'PA',nome: 'Pará' },
    { sigla :'PB',nome: 'Paraíba' },
    { sigla:'PR',nome: 'Paraná' },
    { sigla:'PE',nome: 'Pernambuco' },
    { sigla :'PI',nome: 'Piauí' },
    { sigla :'RJ',nome: 'Rio de Janeiro' },
    { sigla:'RN',nome: 'Rio Grande do Norte' },
    { sigla:'RS',nome: 'Rio Grande do Sul' },
    { sigla:'RO',nome: 'Rondônia' },
    { sigla :'RR',nome: 'Roraíma' },
    { sigla:'SC',nome: 'Santa Catarina' },
    { sigla :'SP',nome: 'São Paulo' },
    { sigla :'SE',nome: 'Sergipe' },
    { sigla :'TO',nome: 'Tocantins' },
  ];

const ModalCidade = ({isOpen,onClose,onSalvar,editando,cidade,setCidade,isLoading}) => {
  const initialRef = useRef(null)
  const imgRef = useRef();

  const handlerImagem = (e) => {
    if(e.target.files[0]){
       imgRef.current.src = URL.createObjectURL(e.target.files[0]);
    }
    setCidade({...cidade,imagem: e.target.files[0]})
  }

  
  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{editando?'Editando':'Nova'} Cidade</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
         <form id="add" onSubmit={onSalvar}>
            <FormControl style={{marginBottom:10}} isRequired>
                <FormLabel>
                  Nome:
                </FormLabel>
                <Input 
                    value={cidade.nome}
                    onChange={e => setCidade({...cidade,nome: e.target.value})}
                    placeholder='Nome da cidade...'
                    ref={initialRef}
                  />
            </FormControl>
            <FormControl style={{marginBottom:10}} isRequired>
                <FormLabel>
                  Estado:
                </FormLabel>
                <Select 
                    placeholder='Selecione um estado'
                    value={cidade.estado}
                    onChange={e => setCidade({...cidade,estado: e.target.value})}>
                       {estados.map((estado)=> (
                        <option value={estado.sigla}>{estado.nome}</option>
                      ))}
                </Select>
            </FormControl>
            <FormControl>
              <FormLabel>
                Imagem:
              </FormLabel>
              <input type="file"  id="imagem" name="imagem" onChange={handlerImagem}/>
            </FormControl>
            <FormControl>
              <img  style={{marginTop:20,borderRadius:10}} className="imagem" ref={imgRef}  />
            </FormControl>
     
         </form>
      </ModalBody>
      <ModalFooter>
        <Button isLoading={isLoading} loadingText="Salvando" type="submit" form="add" colorScheme='red' mr={3} >
          Salvar
        </Button>
    
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default ModalCidade