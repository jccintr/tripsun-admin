
// --host=192.168.0.107
//const BASE_API = 'localhost:8000/api';
const BASE_API = 'http://192.168.0.107:8000/api';
//const BASE_API = 'http://177.104.209.216:8000/api';

export default {
    base_storage: 'http://192.168.0.107:8000/storage',
   // base_storage: 'http://177.104.209.216:8000/storage',
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
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
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();        
        return json;
    },
    signUp: async (name, email, password) => {
        const req = await fetch(`${BASE_API}/register`, {
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
   addAtividade: async (nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,valor) => {
    const response = await fetch(`${BASE_API}/servicos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,valor})
    });
  return response;
  },
  getAtividadebyId: async (id) => {
    const req = await fetch(`${BASE_API}/servico/${id}`);
    const json = await req.json();
    return json;
  },
  updateAtividade: async (id,nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,valor) => {
    const response = await fetch(`${BASE_API}/servico/${id}/update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome,categoria_id,subcategoria_id,cidade_id,prestador_id,descricao_curta,atrativos,duracao,itens_fornecidos,itens_obrigatorios,horario,latitude,longitude,destaque,ponto_encontro,endereco,valor})
    });
   return response;
},
};