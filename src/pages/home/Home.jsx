import React, {useEffect,useState} from 'react'
import "./home.scss";
import { useLocation,useNavigate } from 'react-router-dom';

const Home = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const [tk,setTk] = useState('');
 
 /*
  useEffect(() => {
    
   
    if(!token) {
      navigate('/');
    }

  }, []);

*/

  return (
    <div className="home">
        <div className="homeContainer">
          <h1>Home Screen - Ainda não disponível</h1>
        
        </div>
    </div>
  )
}

export default Home