import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Login2 from "./pages/login2/Login2";
import Cidades from "./pages/cidades/Cidades";
import Categorias from "./pages/categorias/Categorias";
import Subcategorias from "./pages/subcategorias/Subcategorias";
import Parceiros from "./pages/parceiros/Parceiros";
import Atividades from "./pages/atividades/Atividades";
import Usuarios from "./pages/usuarios/Usuarios";
//import UsuariosParceiros from "./pages/usuariosParceiros/UsuariosParceiros";
import Agendamentos from "./pages/agendamentos/Agendamentos";
import {BrowserRouter,Routes, Route } from "react-router-dom";
//import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import MainLayout from "./pages/MainLayout/MainLayout";
import PrivateRoutes from "./PrivateRoutes";
import { useState,useContext } from "react";
import { DataProvider } from "./context/DataContext";
import DataContext from "./context/DataContext";



function App() {
  const {setLogged,logged} = useContext(DataContext);
 
  return (
    <div className="app">
      <DataProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Login2 />} />
                  <Route element={<PrivateRoutes />} >
                    <Route element={<MainLayout setLogged={setLogged}/>}>
                        <Route path="/cidades" element={<Cidades/>}/>
                        <Route path="/categorias" element={<Categorias/>}/>
                        <Route path="/subcategorias" element={<Subcategorias/>}/>
                        <Route path="/parceiros" element={<Parceiros/>}/>
                        <Route path="/atividades" element={<Atividades/>}/>
                        <Route path="/usuarios" element={<Usuarios/>}/>
                        <Route path="/agendamentos" element={<Agendamentos/>}/>
                        <Route path="/home" element={<Home/>}/>
                      
                    </Route>
                  </Route>
              </Routes>
          </BrowserRouter>
       </DataProvider>
    </div>
  );
}

export default App;
