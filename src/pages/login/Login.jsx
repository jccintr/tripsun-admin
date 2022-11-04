import React, {useState} from 'react'
import { Box,Image,Container,Center,FormControl,FormLabel,Input,Button,Stack} from '@chakra-ui/react'
import logo from "../../assets/logo_tripsun.png";

import styles from "./styles.module.css";


const onSignIn = () =>{

}

const Login = () => {
  const [usuario,setUsuario] = useState('');
  const [senha,setSenha] = useState('');




  return (
     <div className={styles.container}>
     <div className={styles.form}>
     <img className={styles.logo} src={logo} alt="logo tripsun" />
       <Stack w="full">
         <form id="login" onSubmit={onSignIn}>
            <FormControl style={{marginBottom:10}}>
                <FormLabel>
                  <p className={styles.label}>Nome de Usuário:</p>
                </FormLabel>
                <Input
                    isRequired
                    value={usuario}
                    onChange={e => setUsuario(e.target.value)}
                    placeholder='Seu Email...'

                  />
            </FormControl>
            <FormControl style={{marginBottom:10}}>
                <FormLabel>
                  <p className={styles.label}>Senha de Acesso:</p>
                </FormLabel>
                <Input
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    placeholder='Sua senha...'

                  />
            </FormControl>
            <Button colorScheme='red' size='lg'>ENTRAR</Button>


         </form>
         </Stack>
     </div>
     </div>


  )
}

export default Login
