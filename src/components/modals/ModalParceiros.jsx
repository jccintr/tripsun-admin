import React,{useRef} from 'react';
import {Input,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,Select,HStack} from '@chakra-ui/react';


const ModalParceiros = ({isOpen,onClose,onSalvar,editando,parceiro,setParceiro,cidades,isLoading}) => {
    const initialRef = useRef(null)
    const imgRef = useRef();


    const handlerImagem = (e) => {
  
        if(e.target.files[0]){
          imgRef.current.src = URL.createObjectURL(e.target.files[0]);
          //setImagemCarregada(true);
        }
        setParceiro({...parceiro,imagem: e.target.files[0]})
        
      
      }

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl' >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{editando?'Editando':'Novo'} Parceiro</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
         <form id="add" onSubmit={onSalvar}>
            <FormControl style={{marginBottom:10}} isRequired>
                <FormLabel>
                  Nome:
                </FormLabel>
                <Input 
                    value={parceiro.nome}
                    onChange={e => setParceiro({...parceiro,nome: e.target.value})}
                    placeholder='Nome do parceiro...'
                    ref={initialRef}
                  />
            </FormControl>
          
            <FormControl style={{marginBottom:10}}>
                <FormLabel>
                  Endereço:
                </FormLabel>
                <Input 
                    value={parceiro.endereco}
                    onChange={e => setParceiro({...parceiro,endereco: e.target.value})}
                    placeholder='Endereço...'
                  />
            </FormControl>
            <HStack>
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Bairro:
                    </FormLabel>
                    <Input 
                        value={parceiro.bairro}
                        onChange={e => setParceiro({...parceiro,bairro: e.target.value})}
                        placeholder='Bairro...'
                      />
                </FormControl>
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      CEP:
                    </FormLabel>
                    <Input 
                        value={parceiro.cep}
                        onChange={e => setParceiro({...parceiro,cep: e.target.value})}
                        placeholder='CEP...'
                      />
                </FormControl>
            </HStack>
            <FormControl style={{marginBottom:10}} isRequired>
            <FormLabel>
              Cidade:
            </FormLabel>
            <Select 
                placeholder='Selecione uma cidade'
                value={parceiro.cidade_id}
                onChange={e => setParceiro({...parceiro,cidade_id: e.target.value})}>
                  {cidades.map((cidade)=> (
                    <option value={cidade.id}>{cidade.nome}-{cidade.estado}</option>
                  ))}
            </Select>
        </FormControl>
        
        <HStack>
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Contato:
                    </FormLabel>
                    <Input 
                        value={parceiro.contato}
                        onChange={e => setParceiro({...parceiro,contato: e.target.value})}
                        placeholder='Contato...'
                      />
                </FormControl>
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Telefone:
                    </FormLabel>
                    <Input 
                        value={parceiro.telefone}
                        onChange={e => setParceiro({...parceiro,telefone: e.target.value})}
                        placeholder='Telefone...'
                      />
                </FormControl>
                <FormControl style={{marginBottom:10}} isRequired isReadOnly={editando}>
                    <FormLabel>
                      Email:
                    </FormLabel>
                    <Input 
                        value={parceiro.email}
                        onChange={e => setParceiro({...parceiro,email: e.target.value})}
                        placeholder='Email...'
                      />
                </FormControl>
            </HStack>
            <HStack>
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      CNPJ/CPF:
                    </FormLabel>
                    <Input 
                        value={parceiro.cnpj}
                        onChange={e => setParceiro({...parceiro,cnpj: e.target.value})}
                        placeholder='CNPJ ou CPF...'
                      />
                </FormControl>
                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      IE/RG:
                    </FormLabel>
                    <Input 
                        value={parceiro.ie}
                        onChange={e => setParceiro({...parceiro,ie: e.target.value})}
                        placeholder='IE ou RG...'
                      />
                </FormControl>
            </HStack>
            {!editando&&<HStack>
            <FormControl style={{marginBottom:10}} isRequired>
                <FormLabel>
                  Senha de Acesso:
                </FormLabel>
                <Input 
                    type="password"
                    value={parceiro.password}
                    onChange={e => setParceiro({...parceiro,password: e.target.value})}
                    placeholder='Senha de Acesso...'
                    
                  />
            </FormControl>
            </HStack>}
            <FormControl>
              <FormLabel>
                Imagem:
              </FormLabel>
              <input type="file" id="imagem" name="imagem" onChange={handlerImagem}/>
            </FormControl>
           
            <FormControl>
              <img  style={{marginTop:20,borderRadius:10}} className="imagem" ref={imgRef}/>
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

export default ModalParceiros