import { useContext, useState } from "react";
import { createContext } from "react";
import {
  inscripcionRequest,
  getInspcricionesRequest,
  getInscritosRequest,
  rechazarPreInscripcionRequest,
  aceptarPreInscripcionRequest,
  getPreInscripcionById,
  getInscripcionById,
} from "../api/inscripcion.api";
import {
  AlertError,
  AlertSuccess,
  AlertWarning,
} from "../Components/Alert";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const InscripcionContext = createContext();

export const useInscripcion = () => {
  const Context = useContext(InscripcionContext);
  if (!Context) {
    throw new Error("UseInscripcion deberia estar dentro de un provider");
  }

  return Context;
};

export const InscripcionProvider = ({ children }) => {
  const [inscripcion, setInscripcion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inscripciones, setInscripciones] = useState([]);
  const [inscritos, setInscritos] = useState([]);
  

  const navigate = useNavigate();

  const inscripcionUsuario = async (id, data) => {
    try {
      setLoading(true);
      const res = await inscripcionRequest(id, data);
      if (res.status === 200) {
        AlertSuccess({
          icon: "success",
          title: `${res.data.message}`,
        });

        setLoading(false);
        
      }
      setLoading(false);
      return res
  
    } catch (error) {
      setLoading(false);
      console.log(error);
      AlertError({
        icon: "error",
        title: `${error.response.data.message}`,
      });

      if (error.response.status === 400) {
        navigate("/datos/personales/curso");
      }
    }
  };


  const todasInscripciones = async () => {
    try {
      const res = await getInspcricionesRequest();
      setInscripciones(res.data);

      return res;
    } catch (error) {
      AlertError({
        icon: "error",
        title: `${error.response.data.message}`,
      });
      console.log(error);
    }
  };

  const obtenerInscritos = async () => {
    try {
      const res = await getInscritosRequest();
      setInscritos(res.data);
      return res;
    } catch (error) {
      AlertError({
        icon: "error",
        title: `${error.response.data.message}`,
      });
      console.log(error);
    }
  };

  
  const obtenerPreInscripcionPorId = async (id) => {

    try {

      const res = await getPreInscripcionById(id)
      return res

    } catch (error) {
      
      AlertError({
        icon: "error",
        title: `${error.response.data.message}`,
      });
      console.log(error);
    }
    
  }


  const obtenerInscripcionPorId = async (id) => {

    try {

      const res = await getInscripcionById(id)
      return res

    } catch (error) {
      
      AlertError({
        icon: "error",
        title: `${error.response.data.message}`,
      });
      console.log(error);
    }
    
  }

  const rechazarInscripcion = async (id, anular = false) => {
    try {
      const confirm = await toast.promise(
        new Promise((resolve, reject) => {
          toast.dark(
            <div className="space-x-2">
              <p>{anular ? "Estás seguro de anular la inscripción?" : "¿Estás seguro de rechazar la inscripción?"}</p>
              <button
                className="bg-green-600 rounded-md p-2"
                onClick={() => resolve(true)}
              >
                Confirmar
              </button>
              <button
                className="bg-red-600 rounded-md p-2"
                onClick={() => resolve(false)}
              >
                Cancelar
              </button>
            </div>
          );
        }),
        {
          position: "top-center",
          success: "Acción confirmada",
          error: "Acción cancelada",
        }
      );

      if (confirm) {
        const res = await rechazarPreInscripcionRequest(id);

        if (res.status === 200) {
          AlertSuccess({
            title: `${res.data.message}`,
          });

          setInscripciones(
            inscripciones.filter((inscripcion) => inscripcion._id !== id)
          );
          setInscritos(inscritos.filter((inscritos) => inscritos._id !== id));
        }
      } else {
        AlertWarning({
          icon: "error",
          title: `Acción cancelada`,
        });

        return 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const aceptarInscripcion = async (id) => {
    try {
      const confirm = await toast.promise(
        new Promise((resolve, reject) => {
          toast.success(
            <div className="space-x-2">
              <p>¿Estás seguro de inscribir a este usuario?</p>
              <button
                className="bg-green-600 rounded-md p-2 text-white "
                onClick={() => resolve(true)}
              >
                Confirmar
              </button>
              <button
                className="bg-red-600 rounded-md p-2 text-white"
                onClick={() => resolve(false)}
              >
                Cancelar
              </button>
            </div>
          );
        }),
        {
          position: "top-center",
          success: "Acción confirmada",
          error: "Acción cancelada",
        }
      );

      if (confirm) {
        const res = await aceptarPreInscripcionRequest(id);
        if (res.status === 200) {
          AlertSuccess({
            title: `${res.data.message}`,
          });

          setInscripciones(inscripciones.filter((i) => i._id !== id));
        }
      }else {

        AlertWarning({
          icon: "error",
          title: `Acción cancelada`,
        });

        return 

        
      }

    } catch (error) {
      AlertError({
        icon: "error",
        title: `${error.response.data.message}`,
      });
      console.log(error);
    }
  };
  return (
    <InscripcionContext.Provider
      value={{
        inscripcionUsuario,
        inscripcion,
        loading,
        todasInscripciones,
        inscripciones,
        rechazarInscripcion,
        obtenerInscritos,
        inscritos,
        aceptarInscripcion,
        obtenerPreInscripcionPorId,
        obtenerInscripcionPorId
      }}
    >
      {children}
    </InscripcionContext.Provider>
  );
};
