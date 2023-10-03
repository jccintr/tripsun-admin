import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cidades from "./pages/cidades/Cidades";
import Cidades2 from "./pages/cidades/Cidades2";
import Categorias2 from "./pages/categorias/Categorias2";
import Subcategorias2 from "./pages/subcategorias/Subcategorias2";
import Parceiros2 from "./pages/parceiros/Parceiros2";
import Atividades2 from "./pages/atividades/Atividades2";
import Usuarios2 from "./pages/usuarios/Usuarios2";
import Agendamentos2 from "./pages/agendamentos/Agendamentos2";
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
                  <Route path="/" element={<Login />} />
                  <Route element={<PrivateRoutes />} >
                    <Route element={<MainLayout setLogged={setLogged}/>}>
                        <Route path="/cidades" element={<Cidades2/>}/>
                        <Route path="/categorias" element={<Categorias2/>}/>
                        <Route path="/subcategorias" element={<Subcategorias2/>}/>
                        <Route path="/parceiros" element={<Parceiros2/>}/>
                        <Route path="/atividades" element={<Atividades2/>}/>
                        <Route path="/usuarios" element={<Usuarios2/>}/>
                        <Route path="/agendamentos" element={<Agendamentos2/>}/>
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
