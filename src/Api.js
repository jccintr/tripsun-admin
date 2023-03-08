
// --host=192.168.0.107
//const BASE_API = 'http://localhost:8000/api';
const BASE_API = 'https://tripsun.tk/api';

//const BASE_API = 'http://192.168.0.107:8000/api';
//const BASE_API = 'http://177.104.209.216:8000/api';

export default {
//base_storage: 'http://localhost:8000/storage',
//    base_storage: 'http://192.168.0.107:8000/storage',
   // base_storage: 'http://177.104.209.216:8000/storage',
 base_storage: 'https://tripsun.tk/storage',
   /*
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();subcategoria
        return json;
    },
    */
    signIn: async (email, password) => {
        const response = await fetch(`${BASE_API}/loginAdmin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        //const json = await req.json();
        return response;
    },
    signUpParceiro: async (nome,email,telefone,password) => {
        const response = await fetch(`${BASE_API}/signup2`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: nome,email,telefone, password})
        });
        return response;
    },
    /*
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/registersubcategoria`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
    },
    */
    /*
    logout: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    */

   // Rotas da Cidade
    getCidades: async () => {
        const req = await fetch(`${BASE_API}/cidades`);
        const json = await req.json();
        return json;
    },
    getCidadebyId: async (id) => {
        const req = await fetch(`${BASE_API}/cidade/${id}`);
        const json = await req.json();
        return json;
    },
    getCidade: async (id,lat,lng) => {
        const req = await fetch(`${BASE_API}/cidade`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,lat,lng})
        });
        const json = await req.json();
        return json;
    },
    addCidade: async (fd) => {
        const response = await fetch(`${BASE_API}/cidades`, {
            method: 'POST',
            body: fd
        });
       return response;
    },
    updateCidade: async (id,fd) => {
        const response = await fetch(`${BASE_API}/cidade/${id}/update`, {
            method: 'POST',
            body: fd
        });
       return response;
    },
    // Rotas da Categoria ===========================================================
    getCategorias: async () => {
        const req = await fetch(`${BASE_API}/categorias`);
        const json = await req.json();
        return json;
    },
    addCategoria: async (fd) => {
        const response = await fetch(`${BASE_API}/categorias`, {
            method: 'POST',
            body: fd
        });
       return response;
    },
    getCategoriabyId: async (id) => {
        const req = await fetch(`${BASE_API}/categoria/${id}`);
        const json = await req.json();
        return json;
    },
    updateCategoria: async (id,fd) => {
        const response = await fetch(`${BASE_API}/categoria/${id}/update`, {
            method: 'POST',
            body: fd
        });
       return response;
    },
    // Rotas da Subcategoria =======================================================
    getSubcategorias: async () => {
        const req = await fetch(`${BASE_API}/subcategorias`);
        const json = await req.json();
        return json;
    },
    addSubcategoria: async (fd) => {
        const response = await fetch(`${BASE_API}/subcategorias`, {
            method: 'POST',
            body: fd
        });
        return response;
    },
    getSubcategoriabyId: async (id) => {
        const req = await fetch(`${BASE_API}/subcategoria/${id}`);
        const json = await req.json();
        return json;
    },
    updateSubcategoria: async (id,fd) => {
        const response = await fetch(`${BASE_API}/subcategoria/${id}/update`, {
            method: 'POST',
            body: fd
        });
       return response;
    },
    // Rotas dos Parceiros ========================================================
    getParceiros: async () => {
        const req = await fetch(`${BASE_API}/prestadores`);
        const json = await req.json();
        return json;
    },
    addParceiro: async (fd) => {
        const response = await fetch(`${BASE_API}/prestadores`, {
            method: 'POST',
            body: fd
        });
      return response;
    },
    getParceirobyId: async (id) => {
        const req = await fetch(`${BASE_API}/prestador/${id}`);
        const json = await req.json();
        return json;
    },
    updateParceiro: async (id,fd) => {
        const response = await fetch(`${BASE_API}/prestador/${id}/update`, {
            method: 'POST',
            body: fd
        });
       return response;
    },
  // Rotas dos Servicos (Atividades) ========================================================
  getAtividades: async () => {
    const req = await fetch(`${BASE_API}/servicos`);
    const json = await req.json();
    return json;
   },
   addAtividade: async (nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,preco,vagas) => {
    const response = await fetch(`${BASE_API}/servicos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,preco,vagas})
    });
  return response;
  },
  getAtividadebyId: async (id) => {
    const req = await fetch(`${BASE_API}/servico/${id}`);
    const json = await req.json();
    return json;
  },
  updateAtividade: async (id,nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,valor) => {
    const response = await fetch(`${BASE_API}/servico/${id}/update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,percentual_plataforma,valor})
    });
   return response;
},
 // Rotas dos Usuarios ========================================================
 getUsuariosParceiros: async () => {
    const req = await fetch(`${BASE_API}/usuarios/prestadores`);
    const json = await req.json();
    return json;
   },
 getUsuariosClientes: async () => {
    const req = await fetch(`${BASE_API}/usuarios/clientes`);
    const json = await req.json();
    return json;
   },
   getUsuariobyId: async (id) => {
    const req = await fetch(`${BASE_API}/usuario/${id}`);
    const json = await req.json();
    return json;
   },
   updateUsuario: async (id,nome,telefone) => {
    const response = await fetch(`${BASE_API}/usuario/update/${id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome,telefone})
    });
   return response;
},
   updateSenhaUsuario: async (id,senha) => {
    const response = await fetch(`${BASE_API}/usuario/updatepassword/${id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({senha})
    });
   return response;
},

// Rotas das Imagens ========================================================
getImagensByServico: async (idServico) => {
    const req = await fetch(`${BASE_API}/imagens/${idServico}`);
    const json = await req.json();
    return json;
  },
  addImagem: async (fd) => {
    const response = await fetch(`${BASE_API}/imagens`, {
        method: 'POST',
        body: fd
    });
    return response;
},
deleteImagem: async (id) => {
    const response = await fetch(`${BASE_API}/imagens/delete/${id}`,
    {method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
   });
    //const json = await req.json();
    return response;
},
// Rotas dos Horarios ========================================================
getHorariosByServico: async (idServico) => {
    const req = await fetch(`${BASE_API}/horarios/${idServico}`);
    const json = await req.json();
    return json;
  },
  getHorariosByDay: async (idServico,data) => {
    const req = await fetch(`${BASE_API}/horarios/${idServico}/${data}`);
    const json = await req.json();
    return json;
  },
  addHorario: async (servico_id,weekDay,horas) => {
    const response = await fetch(`${BASE_API}/horarios`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({servico_id,weekDay,horas})
    });
  return response;
  },
  deleteHorario: async (id) => {
    const response = await fetch(`${BASE_API}/horarios/${id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        
    });
  return response;
  },
};
