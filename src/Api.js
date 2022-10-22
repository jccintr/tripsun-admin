
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
      //  const json = await req.json();        
       // return json;
       return response;
    },
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
      //  const json = await req.json();        
       // return json;
       return response;
    },
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
      //  const json = await req.json();        
       // return json;
       return response;
    },
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
      //  const json = await req.json();        
       // return json;
       return response;
    },
  
   
};