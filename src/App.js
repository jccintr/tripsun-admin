import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cidades from "./pages/cidades/Cidades";
import Categorias from "./pages/categorias/Categorias";
import Subcategorias from "./pages/subcategorias/Subcategorias";
import Parceiros from "./pages/parceiros/Parceiros";
import Atividades from "./pages/atividades/Atividades";
import Usuarios from "./pages/usuarios/Usuarios";
import UsuariosParceiros from "./pages/usuariosParceiros/UsuariosParceiros";
import {BrowserRouter,Routes, Route } from "react-router-dom";
//import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import MainLayout from "./pages/MainLayout/MainLayout";
import PrivateRoutes from "./PrivateRoutes";
import { useState } from "react";



function App() {
  const [logged,setLogged] = useState(false);
  return (
    <div className="app">
       <BrowserRouter>
           <Routes>
              <Route path="/" element={<Login setLogged={setLogged}/>} />
              <Route element={<PrivateRoutes logged={logged}/>} >
                <Route element={<MainLayout setLogged={setLogged}/>}>
                    <Route path="/cidades" element={<Cidades/>}/>
                    <Route path="/categorias" element={<Categorias/>}/>
                    <Route path="/subcategorias" element={<Subcategorias/>}/>
                    <Route path="/parceiros" element={<Parceiros/>}/>
                    <Route path="/atividades" element={<Atividades/>}/>
                    <Route path="/usuarios" element={<Usuarios/>}/>
                    <Route path="/usuariosparceiros" element={<UsuariosParceiros/>}/>
                    <Route path="/home" element={<Home/>}/>
                   
                </Route>
              </Route>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
