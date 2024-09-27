import { useAuth } from "../Context/authContext"
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
const {Autenticado, user, loading} = useAuth();


if(loading){

  return <h1>Cargando...</h1>
}


if(!loading && !Autenticado) return <Navigate to={"/login"} replace/>




  return (
    <Outlet/>
  )
}

export default ProtectedRoute