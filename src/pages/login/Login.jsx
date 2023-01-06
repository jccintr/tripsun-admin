import React, {useState} from 'react'
import { Box,Image,Container,Center,FormControl,FormLabel,Input,Button,Stack} from '@chakra-ui/react'
import logo from "../../assets/logo_tripsun.png";
import { useNavigate } from 'react-router-dom';
import Api from "../../Api";



import styles from "./styles.module.css";




const Login = ({setLogged}) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();


  const onSignIn = async () =>{
   
    let response = await Api.signIn(email,password);
    if(response.status===200){
       let json = await response.json();
       const token = json.token;
       setLogged(true);
       navigate('/home');
    }
    else{
     alert('Nome de usuário e ou senha inválidos.');
    }
   // navigate('/cidades');
   
   }



  return (
     <div className={styles.container}>
     <div className={styles.form}>
     <img className={styles.logo} src={logo} alt="logo tripsun" />

         <form id="login" >
            <FormControl style={{marginBottom:10}}>
                <FormLabel>
                  <p className={styles.label}>Nome de Usuário:</p>
                </FormLabel>
                <Input
                    isRequired
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Seu Email...'

                  />
            </FormControl>
            <FormControl style={{marginBottom:10}}>
                <FormLabel>
                  <p className={styles.label}>Senha de Acesso:</p>
                </FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Sua senha...'

                  />
            </FormControl>
            <Button onClick={onSignIn} width={{base:'100%'}} colorScheme='red' size='lg'>ENTRAR</Button>
            

         </form>

     </div>
     </div>


  )
}

export default Login
