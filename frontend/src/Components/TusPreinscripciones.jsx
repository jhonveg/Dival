import { useEffect, useState } from "react";
import { useInscripcion } from "../Context/inscripcionContext";
import not_found_image from '../assets/image-not-found.png'



export const TusPreInscripciones = ({ pre_inscripcion}) => {
  const { obtenerPreInscripcionPorId } = useInscripcion();
  const [misPreinscripciones, setMisPreinscripciones] = useState();

  useEffect(() => {
   
    if (pre_inscripcion) {
      
      const getPreInscripcionById = async () => {
        const res = await obtenerPreInscripcionPorId(pre_inscripcion);
        setMisPreinscripciones(res.data);
      };

      getPreInscripcionById();
    }
  }, [pre_inscripcion]);

  return (
    <div className="container mx-auto px-4 py-8">
     
      <h1 className="text-3xl font-bold mb-4">
        {pre_inscripcion && "Tus pre inscripciones"}{" "}
  
      </h1>
      
      {pre_inscripcion && (
       <>
        <p className="">Estaremos contactándonos contigo para seguir con el proceso de inscripción.</p>
        <p className="text-sm">Recuerda tener tus datos personales actualizados.</p>
       
       </>
      )}



      <div className="shadow-sm rounded-md  shadow-black p-4 mt-2">
        {pre_inscripcion && (
          <>
            {misPreinscripciones &&
              misPreinscripciones[0].courseId &&
              misPreinscripciones.map((pre, index) => (
               
               
                <div key={index} className="relative hover:scale-105 delay-150 grayscale hover:grayscale-0  cursor-pointer ease-in-out transition-all">
                <div 
                  className="absolute h-auto w-full  inset-0 bg-cover bg-center bg-no-repeat   "
                  style={{ 
                    backgroundImage: `url(${pre.courseId.imagen && pre.courseId.imagen.secure_url ? pre.courseId.imagen.secure_url : `${not_found_image}`})`, 
                    borderRadius: 10,
                    backgroundPositionY: -32
                    
                    
                  }}
                ></div>

                <div className="relative z-10 p-4 bg-zinc-800 bg-opacity-80 ">
                  <p className="text-center text-lg font-semibold uppercase text-white ">
                    {pre.courseId.nombreCurso}
                  </p>
                  <p className="text-center text-white">Fecha de Preinscripción</p>
                  <p className="text-center text-white text-xs mb-4">{new Date(pre.dateRegistered).toLocaleString("es-CO")}</p>
                </div>
              </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};






export const Tusinscripciones = ({ inscripcion }) => {
  const { obtenerInscripcionPorId } = useInscripcion();
  const [misInscripciones, setMisInscripciones] = useState();

 
  useEffect(() => {
   
    if (inscripcion) {
      
      const getInscripcionById = async () => {
        const res = await obtenerInscripcionPorId(inscripcion);
        setMisInscripciones(res.data);
      };

      getInscripcionById();
    }
  }, [inscripcion]);

  return (
    <div className="container mx-auto px-4 py-8">
     
      <h1 className="text-3xl font-bold mb-4">
       Estás inscrito en
       
      </h1>
      
      
        <p className="">¡Nos alegra mucho que formes parte de nuestra academia!</p>
        <p className="text-sm">Estos son los cursos a los que estás inscrito actualmente</p>
       
    
    



      <div className="shadow-sm rounded-md  shadow-black p-4 mt-2">
        {inscripcion && (
          <>

            {misInscripciones &&
              misInscripciones[0].courseId &&
              misInscripciones.map((pre, index) => (
               
               
                <div key={index} className="relative hover:scale-105 delay-150 grayscale hover:grayscale-0  cursor-pointer ease-in-out transition-all">
                <div 
                  className="absolute h-auto w-full  inset-0 bg-cover bg-center bg-no-repeat   "
                  style={{ 
                    backgroundImage: `url(${pre.courseId.imagen && pre.courseId.imagen.secure_url ? pre.courseId.imagen.secure_url : `${not_found_image}`})`, 
                    borderRadius: 10,
                    backgroundPositionY: -32
                    
                    
                  }}
                ></div>

                <div className="relative z-10 p-4 bg-zinc-800 bg-opacity-80 ">
                  <p className="text-center text-lg font-semibold uppercase text-white ">
                    {pre.courseId.nombreCurso}
                  </p>
                  <p className="text-center text-white">Fecha de Inscripción</p>
                  <p className="text-center text-white text-xs mb-4">{new Date(pre.dateRegistered).toLocaleString("es-CO")}</p>
                </div>
              </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};


