import { createContext,useState,useEffect } from "react";


const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [logged,setLogged] = useState(false);
    const [loggedUser,setLoggedUser] = useState(null);

  return (
      <DataContext.Provider value={{
        logged,
        setLogged,
        loggedUser,
        setLoggedUser
      

      }}>
        {children}
      </DataContext.Provider>
  )

}

export default DataContext;
