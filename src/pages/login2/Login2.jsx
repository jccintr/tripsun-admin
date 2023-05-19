import React, {useState,useContext} from 'react'
import logo from "../../assets/logo_tripsun.png";
import { useNavigate } from 'react-router-dom';
import Api from "../../Api";

import DataContext from '../../context/DataContext';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';

  
  
  const Login2 = () => {
    const {setLogged,setLoggedUser} = useContext(DataContext);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const onSignIn = async () =>{

            setIsLoading(true);
            let response = await Api.signIn(email,password);
            if(response.status===200){
                let json = await response.json();
                setLoggedUser(json);
                setLogged(true);
                navigate('/home');
            }
            else{
                toast({
                title: 'Acesso não autorizado !',
                description: "Nome de usuário e ou senha inválidos.",
                status: 'error',
                duration: 3000,
                isClosable: true,
                });
                setIsLoading(false);
            }
       }

{
    /*
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
    */
}


    return (
        <Flex
       
           h='100vh'
           w='full'
            align={'center'}
            justify={'center'}
            bg={['white','gray.100']}
        >
        
        <Stack spacing={8} mx='auto'  maxW='md' w={['full','full','full','full']}  py={12} >
          <Box
            rounded={'lg'}
            bg={'white'}
            boxShadow={['none','lg']}
            p={8}
            
            >
            <Stack spacing={4}>
            <img  src={logo} alt="logo tripsun" />
            
              <FormControl id="email" isRequired>
                <FormLabel>Email:</FormLabel>
                <Input
                    
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Seu Email...'
                    type="email"
                 />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Senha:</FormLabel>
                <Input
                     
                     type="password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     placeholder='Sua senha...'
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Link color={'red'}>Esqueceu a senha ?</Link>
                </Stack>
                <Button isDisabled={!(password.length>0 && email.length>0)} isLoading={isLoading} onClick={onSignIn}  width="full" colorScheme='red' size='lg'>ENTRAR</Button>
              </Stack>
             
             
            </Stack>
          </Box>
          </Stack>
      </Flex>
    )
  }
  
  export default Login2