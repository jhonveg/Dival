import { createContext, useContext, useState, useEffect } from 'react'
import { LoginRequest, registerRequest, verifyTokenRequest, ProfileRequest, updateProfileRequest, updateUsernameRequest, getUsersRequest, deleteUserRequest, getUserRequest, updateUserSchemaRequest, AddUserData, updateUserPassword, logoutRequest } from '../api/auth.api'
import { uploadAvatarRequest, updateAvatarRequest } from '../api/avatars.api'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import { AlertError, AlertSuccess, AlertWarning } from '../Components/Alert'

export const AuthContext = createContext();



export const useAuth = () => {


  const Context = useContext(AuthContext);
  if (!Context) {
    throw new Error('UseAuth deberia estar dentro de un provider')
  }

  return Context
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [Autenticado, setAutenticacion] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)
  const [changeProfile, setChange] = useState(null)
  const [profile, setProfile] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [avatarStatus, setAvatarStatus] = useState([])
  const [pages, setPages] = useState([])
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [loadingUpdateUserSchema, setLoadingUserSchema] = useState(false)

  const navigate = useNavigate();


  const signup = async (user) => {

    try {

      setLoadingUserSchema(true)
      const res = await registerRequest(user)
      if (res.status === 201) {
        setAllUsers(res.data)
        AlertSuccess({
          title: 'Registro exitoso'
        })
        setLoadingUserSchema(false)

      }
      // sessionStorage.setItem('miToken', res.data.token);
      setUser(res.data)
      setAutenticacion(true)

    } catch (error) {
      console.log(error)
      setUser(null)
      setAutenticacion(false)
      console.log(error.response)
      setErrors(error.response.data)
      setLoadingUserSchema(false)

    }


  }


  const signin = async (user) => {

    try {
      setLoadingUserSchema(true)

      const res = await LoginRequest(user);

      // sessionStorage.setItem('miToken', res.data.token);
      setUser(res.data)
      
      if(res.status === 201 ){
        AlertSuccess({
          title: 'Inicio de sesión exitoso'
        })
        setLoadingUserSchema(false)

      } 
      setAutenticacion(true)
      setLoadingUserSchema(false)

    } catch (error) {

      setLoadingUserSchema(false)
      if (Array.isArray(error.response.data)) {
     

        return setErrors(error.response.data)

      }

      setErrors([error.response.data.message])
    }



  }


  const logout = async () => {


    // sessionStorage.removeItem('miToken');    
try {
 
  Cookies.remove("token")
  const res = await logoutRequest();

  if(res.status === 200){
    AlertSuccess({
      title: "Cierre de sesión exitoso."
    })

    navigate("/login")
    setAutenticacion(false);
    setUser(null);
    setProfile([])
    sessionStorage.removeItem('autenticacion');

  
  }


} catch (error) {
  console.log(error)
  setAutenticacion(false);
  setUser(null);
}


  }

  const getProfile = async () => {
    try {


      const res = await ProfileRequest();
      setProfile(res.data)
      return res.data

    } catch (error) {
     
      console.log(error)
    }

  }


  const getUsers = async (page = 1, limit = 1000) => {
     
    

    try {
      const res = await getUsersRequest(page, limit);
      setAllUsers(res.data.users)
      setPages(res.data.totalPages)
      return res.data

    } catch (error) { 

      console.log(error, "Error getsusers")

      if (Array.isArray(error.response.data)) {

        return setErrors(error.response.data)

      }

      setErrors([error.response.data.message])
    }

  }

  const updateUser = async (id, email) => {

    try {
      const res = await updateProfileRequest(id, email)
      if (res && res.status === 201) {

        AlertSuccess({
          
          title: 'Correo actualizado correctamente',


        })
        
        getProfile();

        return res
        
      


      } else {

        AlertError({
          icon: 'error',
          title: "Error o status no 201",

        })

        setChange(false);

      }
    } catch (error) {
      setChange(false)
      if (Array.isArray(error.response.data)) {

        return setErrors(error.response.data)

      }

      setErrors([error.response.data.message])


    }

  }


  const updateUserName = async (id, email) => {

    try {
      const res = await updateUsernameRequest(id, email)
      if (res && res.status === 201) {
        AlertSuccess({

          icon: "success",
          title: "Nombre de usuario cambiado correctamente",

        });
        
        getProfile();
        return res

      } else {
        AlertError({

          icon: "error",
          title: "Error o status no 201",
          background: "#de0909",
        });
        setChange(false);

      }
    } catch (error) {
      setChange(false)
      if (Array.isArray(error.response.data)) {

        return setErrors(error.response.data)

      }

      setErrors([error.response.data.message])


    }

  }



  const getUser = async (id) => {

    try {
      const res = await getUserRequest(id)
      return res.data


    } catch (error) {

      console.log(error)
    }
  }

  const deleteUser = async (id) => {

    const user = await getUserRequest(id)


    try {



      if (profile.id == id) {

        AlertError({
          position: 'bottom-center',
          icon: "error",
          title: "No puedes eliminarte",
          timer: 5000

        })



      } else if (user.data.rol == "admin") {
        AlertError({
          position: 'bottom-center',
          icon: "error",
          title: "No puedes eliminar a otro administrador",
          timer: 5000

        })
      }

      else {

        const confirmacion = window.confirm(`¿Estás seguro de eliminar a ${user.data.email}?`)

        if (confirmacion) {
          const res = await deleteUserRequest(id)
          if (res.status == 200) {
            setAllUsers(allUsers.filter(user => user._id !== id))
          }

          AlertSuccess({
            icon: "success",
            title: "Usuario eliminado correctamente.",
            timer: 5000
          })


        } else {
          AlertWarning({
            icon: "info",
            title: "Eliminación cancelada",
            timer: 5000
          });
        }




      }

    } catch (error) {
      console.log(error)
    }


  }



  const createAvatar = async (avatar) => {

    try {
      setLoadingAvatar(true)
      const res = await uploadAvatarRequest(avatar);

      setAvatarStatus(res.status)
    

      if (res.status === 200) {
        AlertSuccess({
          icon: 'success',
          title: `${res.data.message}`
        })
        
        setLoadingAvatar(false)
        getProfile();

      } else {
        AlertError({
          icon: 'error',
          title: `${res.data.message}`
        })
        setLoadingAvatar(false)

      }

      setLoadingAvatar(false)


    }
    catch (error) {

      setLoadingAvatar(false)

      AlertError({
        icon: 'error',
        title: `${error.response.data.message}  `
      })


      if (Array.isArray(error.response.data)) {

        return setErrors(error.response.data)

      }

      setErrors([error.response.data.message])

    }

  }





  const updateAvatar = async (avatar) => {

    try {
      setLoadingAvatar(true)

      const res = await updateAvatarRequest(avatar)
      setAvatarStatus(res.status)

       
      if (res.status === 200) {
        AlertSuccess({
          title: `${res.data.message}`
        })
        setAvatarStatus(res.status)
        setLoadingAvatar(false)
        getProfile()
        


      } else {
        AlertError({
          icon: 'error',
          title: 'Ocurrió un error al subir'
          
        }
        )
        setLoadingAvatar(false)
        setAvatarStatus(res.status)

      }
      setLoadingAvatar(false)



    } catch (error) {

      AlertError({
        icon: 'error',
        title: `${error.response.data.message}`
      })

      console.log(error)
      setLoadingAvatar(false)



      if (Array.isArray(error.response.data)) {

        return setErrors(error.response.data)

      }

      setErrors([error.response.data.message])

    }


  }







  const updateUserSchema = async (id, user) => {

    try {

      setLoadingUserSchema(true)
      const res = await updateUserSchemaRequest(id, user)
    
      if (res.status === 201) {

        setLoadingUserSchema(false)

        setAllUsers((prevUsers) => {
          const usuariosActualizados = prevUsers.map((usuarioExistente) => usuarioExistente._id == id ? { ...usuarioExistente, ...user } : usuarioExistente)
          return usuariosActualizados
        })

        AlertSuccess({
          position: 'bottom-center',
          icon: 'success',
          title: 'Usuario actualizado correctamente'

        })



      } else {
        AlertError({
          icon: 'error',
          title: 'Ocurrió un error'
        })

      }
      return res

    } catch (error) {
      setLoadingUserSchema(false)

      console.log(error)
      setErrors([error.response.data.message])
      AlertError({
        position: 'bottom-center',
        icon: 'error',
        title: `${error.response.data.message}`
      })

    }
    

  }

  useEffect(() => {

    if (errors.length > 0) {

      const timer = setTimeout(() => {
        setErrors([])
      }, 10000)




      return () => clearTimeout(timer)
    }

  }, [errors])



  useEffect(() => {
    async function checkLogin() {


      const cookies = Cookies.get();
      // const token = sessionStorage.getItem('miToken');
      
      if (!cookies.token) {
        setAutenticacion(false)
        setLoading(false)
      
        setUser(null)
        return
     
      }

      try {

        const res = await verifyTokenRequest(cookies.token);  

        if (!res.data) {
          setAutenticacion(false)
          setLoading(false)
          return;

        }


        setAutenticacion(true);
        setUser(res.data)
        setLoading(false)
      } catch (error) {
       
        if(error){
          AlertError({
            icon: 'error',
            title: `${error.response.data.message}`
          })

          navigate("/login")
        }
        setAutenticacion(false)
        setUser(null)
        setLoading(false)
      }

    }

    checkLogin();

  }, [])


  useEffect(() => {
    // Al cargar el componente, intenta obtener la información de autenticación desde el almacenamiento persistente
    const storedAuth = sessionStorage.getItem('autenticacion');

    if (storedAuth) {
      setAutenticacion(JSON.parse(storedAuth));
    }

    // Resto del código del useEffect ...

  }, []);

  useEffect(() => {
    if (Autenticado === false || Autenticado === null) {
      sessionStorage.removeItem('autenticacion');
    } else {
      sessionStorage.setItem('autenticacion', JSON.stringify(Autenticado));
    }
  }, [Autenticado]);


const addUserPersonalData = async (data) =>{
  try {
    const res = await AddUserData(data);


    if(res.status === 201){
    
      AlertSuccess({
        icon: 'sucess',
        title: `${res.data.message}`,
        timer: 1000
      })

      await getProfile()
      return res

    }


    return res
  } catch (error) {
    
    if(error){
      AlertError({
        icon: 'error',
        title: `${error.response.data.message}`
      })
    }


    setErrors([error.response.data.message])

  }
}

    const updateNewUserPassword = async (data) => {
      try {
          const respuesta = await updateUserPassword(data)
    
          AlertSuccess({
            title: `${respuesta.data.message}`
          })

        return respuesta
      } catch (error) {
        console.log(error)
        AlertError({
          title: `${error.response.data.message || error.response.data[0]}`
        })
      }
    }

    
  return (

    <AuthContext.Provider value={{ signup, user, Autenticado, errors, signin, loading, logout, updateUser, changeProfile, profile, getProfile, updateUserName,  getUsers, allUsers, deleteUser, createAvatar, avatarStatus, updateAvatar, getUser, updateUserSchema, pages, loadingAvatar, addUserPersonalData, updateNewUserPassword, loadingUpdateUserSchema}}>

      {children}

    </AuthContext.Provider>

  )


}