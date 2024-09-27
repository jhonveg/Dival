import { useAuth } from "../Context/authContext"
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFoundPage from "../Pages/404/NotFound";
const ProtectedAdmin = () => {

  const { Autenticado, profile, getProfile, loading, admin } = useAuth();
  const navigate = useNavigate();
  const [authenticationComplete, setAuthenticationComplete] = useState(null);


  useEffect(() => {
    const authenticateUser = async () => {
      const res = await getProfile();
      if(res.rol == "admin"){
        setAuthenticationComplete(true);

       } else{
      
         setAuthenticationComplete(false);
       }
    
      
    };

    authenticateUser();
  }, []);


  if (loading) return <h1 className="mx-auto">Cargando...</h1>
 

    if(!Autenticado) {
     return <NotFoundPage/>
    }

    if(authenticationComplete === false ){
      return <NotFoundPage/>
    }

    return <Outlet/>




}
export default ProtectedAdmin