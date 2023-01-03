import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cidades from "./pages/cidades/Cidades";
import Categorias from "./pages/categorias/Categorias";
import Subcategorias from "./pages/subcategorias/Subcategorias";
import Parceiros from "./pages/parceiros/Parceiros";
import Atividades from "./pages/atividades/Atividades";
import Usuarios from "./pages/usuarios/Usuarios";
import {BrowserRouter,Routes, Route } from "react-router-dom";
//import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
//import AddCidade from "./pages/addCidade/AddCidade";
import MainLayout from "./pages/MainLayout/MainLayout";
import PrivateRoutes from "./PrivateRoutes";



function App() {
  return (
    <div className="app">
       <BrowserRouter>
           <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoutes auth={true}/>} >
                <Route element={<MainLayout/>}>
                    <Route path="/cidades" element={<Cidades/>}/>
                    <Route path="/categorias" element={<Categorias/>}/>
                    <Route path="/subcategorias" element={<Subcategorias/>}/>
                    <Route path="/parceiros" element={<Parceiros/>}/>
                    <Route path="/atividades" element={<Atividades/>}/>
                    <Route path="/usuarios" element={<Usuarios/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Route>
              </Route>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
