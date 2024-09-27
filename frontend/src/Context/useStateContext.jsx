
import { useContext,createContext, useState, useEffect } from "react";


export const StatesContext = createContext();


export const useStatesProfile = () => {
    const Context = useContext(StatesContext);
    if (!Context) {
      throw new Error("UseInscripcion deberia estar dentro de un provider");
    }
  
    return Context;
  };


  export const StatesProvider = ({ children }) => {

    const [itemProfile, setItemProfile] = useState("user-profile");

    useEffect(() =>{

      const resetItem = () => {
        setTimeout(() => {
          setItemProfile("user-profile")
        },20000)

        return () => clearTimeout(resetItem)
      }


      resetItem();
    },[itemProfile])




    return (
        <StatesContext.Provider value={{itemProfile, setItemProfile}}>

            {children}
        </StatesContext.Provider>
    )
  }