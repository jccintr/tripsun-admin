import React, {useRef} from 'react';
import {Input,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,FormControl,FormLabel,Select,HStack} from '@chakra-ui/react';
import {Tabs, TabList, TabPanels, Tab, TabPanel,Checkbox,Textarea} from '@chakra-ui/react';
import { NumberInput,NumberInputField,NumberIncrementStepper,NumberDecrementStepper,NumberInputStepper } from '@chakra-ui/react';

const ModalAtividade = ({isOpen,onClose,onSalvar,editando,atividade,setAtividade,isLoading,cidades,parceiros,categorias,subcategorias}) => {
  const initialRef = useRef(null)

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editando?'Editando':'Nova'} Atividade</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
           <form id="add" onSubmit={onSalvar}>
              <FormControl style={{marginBottom:10}} isRequired>
                  <FormLabel>
                    Nome:
                  </FormLabel>
                  <Input
                      value={atividade.nome}
                      onChange={e => setAtividade({...atividade,nome:e.target.value})}
                      placeholder='Nome da atividade...'
                      ref={initialRef}
                    />
              </FormControl>
              <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Parceiro:
                    </FormLabel>
                    <Select
                        placeholder='Selecione um parceiro'
                        value={atividade.prestador_id}
                        onChange={e => setAtividade({...atividade,prestador_id: e.target.value})}>
                          {parceiros.map((parceiro)=> (
                            <option key={parceiro.id} value={parceiro.id}>{parceiro.nome}</option>
                          ))}
                    </Select>
                </FormControl>
               <HStack>
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Categoria:
                    </FormLabel>
                    <Select
                        placeholder='Selecione uma categoria'
                        value={atividade.categoria_id}
                        onChange={e => setAtividade({...atividade,categoria_id: e.target.value})}>
                          {categorias.map((categoria)=> (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                          ))}
                    </Select>
                </FormControl>
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Subcategoria:
                    </FormLabel>
                    <Select
                        placeholder='Selecione uma subcategoria'
                        value={atividade.subcategoria_id}
                        onChange={e => setAtividade({...atividade,subcategoria_id: e.target.value})}>
                          {subcategorias.filter((subcategoria)=>subcategoria.categoria_id == atividade.categoria_id).map((subcategoria)=> (
                            <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nome}</option>
                          ))}
                    </Select>
                </FormControl>
               </HStack>
              <FormControl>
                  <Checkbox onChange={e=>setAtividade({...atividade,destaque:!atividade.destaque})} isChecked={atividade.destaque} defaultChecked={true}>
                         Atividade em Destaque
                  </Checkbox>
              </FormControl>
              <Tabs>
                  <TabList>
                    <Tab>Localização</Tab>
                    <Tab>Detalhes</Tab>
                    <Tab>Outros</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Endereço:
                            </FormLabel>
                            <Input
                                value={atividade.endereco}
                                onChange={e => setAtividade({...atividade,endereco:e.target.value})}
                                placeholder='Endereço da atividade...'
                               />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Ponto de Encontro:
                          </FormLabel>
                          <Input
                              value={atividade.ponto_encontro}
                              onChange={e => setAtividade({...atividade,ponto_encontro:e.target.value})}
                              placeholder='Ponto de encontro da atividade...'
                             />
                        </FormControl>
                      <HStack>
                         <FormControl style={{marginBottom:10}} isRequired>
                            <FormLabel>
                              Latitude:
                            </FormLabel>
                            <Input
                                value={atividade.latitude}
                                onChange={e => setAtividade({...atividade,latitude:e.target.value})}
                                placeholder='Latitude...'
                              />
                        </FormControl>
                        <FormControl style={{marginBottom:10}} isRequired>
                            <FormLabel>
                              Longitude:
                            </FormLabel>
                            <Input
                                value={atividade.longitude}
                                onChange={e => setAtividade({...atividade,longitude:e.target.value})}
                                placeholder='Longitude...'
                              />
                        </FormControl>
                       </HStack>
                       <FormControl style={{marginBottom:10}} isRequired>
                          <FormLabel>
                            Cidade:
                          </FormLabel>
                          <Select
                              placeholder='Selecione uma cidade'
                              value={atividade.cidade_id}
                              onChange={e => setAtividade({...atividade,cidade_id: e.target.value})}>
                                {cidades.map((cidade)=> (
                                  <option key={cidade.id} value={cidade.id}>{cidade.nome}-{cidade.estado}</option>
                                ))}
                          </Select>
                       </FormControl>
                    </TabPanel>
                    <TabPanel>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Descrição:
                            </FormLabel>
                            <Textarea
                              placeholder='Descrição da atividade...'
                              value={atividade.descricao_curta}
                              onChange={e => setAtividade({...atividade,descricao_curta:e.target.value})}
                              resize="none"
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Itens Obrigatórios:
                            </FormLabel>
                            <Textarea
                              placeholder='Itens obrigatórios...'
                              value={atividade.itens_obrigatorios}
                              onChange={e => setAtividade({...atividade,itens_obrigatorios:e.target.value})}
                              resize="none"
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Itens Fornecidos:
                            </FormLabel>
                            <Textarea
                              placeholder='Itens fornecidos...'
                              value={atividade.itens_fornecidos}
                              onChange={e => setAtividade({...atividade,itens_fornecidos:e.target.value})}
                              resize="none"
                            />
                        </FormControl>
                    </TabPanel>
                    <TabPanel>
                        <FormControl style={{marginBottom:10}}>
                            <FormLabel>
                              Atrativos:
                            </FormLabel>
                            <Textarea
                              placeholder='Atrativos da atividade...'
                              value={atividade.atrativos}
                              onChange={e => setAtividade({...atividade,atrativos:e.target.value})}
                              resize="none"
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Horário:
                          </FormLabel>
                          <Input
                              value={atividade.horario}
                              onChange={e => setAtividade({...atividade,horario:e.target.value})}
                              placeholder='Horario da atividade...'
                            />
                        </FormControl>
                        <HStack>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Duração:
                          </FormLabel>
                          <Input
                              value={atividade.duracao}
                              onChange={e => setAtividade({...atividade,duracao:e.target.value})}
                              placeholder='Duração da atividade...'
                            />
                        </FormControl>
                        <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Vagas:
                          </FormLabel>
                          <NumberInput
                            precision={0} defaultValue={atividade.vagas}
                            onChange={(valueString) => setAtividade({...atividade,vagas:valueString})}
                          >
                            <NumberInputField
                             value={atividade.vagas}
                             placeholder='Vagas...'
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                         </FormControl>
                         </HStack>
                        <HStack>
                        <FormControl style={{marginBottom:10}} isRequired>
                          <FormLabel>
                            Preço:
                          </FormLabel>
                          <NumberInput
                            precision={2} defaultValue={atividade.preco}
                          >
                            <NumberInputField
                             value={atividade.preco}
                             onChange={e => setAtividade({...atividade,preco:e.target.value})}
                             placeholder='Preço da atividade...'
                            />
                          </NumberInput>
                         </FormControl>
                         <FormControl style={{marginBottom:10}} isRequired>
                          <FormLabel>
                            Percentual da Plataforma:
                          </FormLabel>
                          <NumberInput
                            precision={0} defaultValue={atividade.percentual_plataforma}
                            onChange={(valueString) => setAtividade({...atividade,percentual_plataforma:valueString})}
                          >
                            <NumberInputField
                             value={atividade.percentualPlataforma}
                             placeholder='Percentual da plataforma...'
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                         </FormControl>
                         </HStack>
                    </TabPanel>
                  </TabPanels>
              </Tabs>
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

export default ModalAtividade