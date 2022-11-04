import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cidades from "./pages/cidades/Cidades";
import Categorias from "./pages/categorias/Categorias";
import Subcategorias from "./pages/subcategorias/Subcategorias";
import Parceiros from "./pages/parceiros/Parceiros";
import Atividades from "./pages/atividades/Atividades";
import Usuarios from "./pages/usuarios/Usuarios";
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import AddCidade from "./pages/addCidade/AddCidade";



function App() {

  return (
    <div className="app">
       <BrowserRouter>
       <Sidebar/>
          <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/cidades" element={<Cidades/>}/>
              <Route path="/cidades/add" element={<AddCidade/>}/>
              <Route path="/categorias" element={<Categorias/>}/>
              <Route path="/subcategorias" element={<Subcategorias/>}/>
              <Route path="/parceiros" element={<Parceiros/>}/>
              <Route path="/atividades" element={<Atividades/>}/>
              <Route path="/usuarios" element={<Usuarios/>}/>
          </Routes>
       </BrowserRouter>
    </div>
  );

}

export default App;
