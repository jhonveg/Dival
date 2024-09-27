import React, { useEffect, useState, useRef } from "react";
import { useInscripcion } from "../../Context/inscripcionContext";
import user_placeholder from "../../assets/icon_placeholder.png";

export const InscripcionesPage = () => {
  const { todasInscripciones } = useInscripcion();
  const [showData, setShowData] = useState("");
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  
  const containerRef = useRef(null);
  const { inscripciones, rechazarInscripcion, aceptarInscripcion, inscripcionUsuario } = useInscripcion();


  

  useEffect(() => {
    const getInscripciones = async () => {
      try {
        const res = await todasInscripciones();
      } catch (error) {
        console.log(error, "error de inscripciones page");
      }
    };

    getInscripciones();
  }, []);

  useEffect(() => {
    if (showData) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [showData]);

  const showUserData = () => {
    setShowData("user");
  };

  return (
  
  <div className="md:max-w-screen mx-auto shadow mt-20 p-4 relative rounded-md min-h-screen">
  {inscripciones && inscripciones.length > 0 ? (
    <>
      {!showData && (
        <h1 className="text-2xl md:text-3xl uppercase font-bold mb-4 p-2 bg-zinc-800 text-white rounded-md text-center">
          Listado de pre inscripciones
        </h1>
      )}
      <div className={`overflow-x-auto  transition-all delay-100 ${showData && 'blur-sm pointer-events-none'} `}>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b font-bold text-center">Usuario</th>
              <th className="py-2 px-4 md:px-6 border-b font-bold text-center">Curso</th>
              <th className="py-2 px-4 md:px-6 border-b font-bold text-center">Fecha pre inscripción</th>
              <th className="py-2 px-4 md:px-6 border-b text-center font-bold">Estado</th>
              <th className="py-2 px-4 md:px-6 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inscripciones.map((i) => (
              <tr key={i._id}>
                <td className="py-2 px-4 md:px-6 border-b flex items-center justify-center">
                  <img
                    src={i.userId && i.userId.avatar ? i.userId.avatar.secure_url : user_placeholder}
                    alt="Imagen de Usuario"
                    className="w-8 h-8 rounded-full mr-2 justify-start"
                  />
                  <span className="text-center">{i.userId.username}</span>
                </td>
                <td className="border-b text-center">{i.courseId.nombreCurso}</td>
                <td className="border-b text-center">{new Date(i.dateRegistered).toLocaleString('es-CO')}</td>
                <td className="border-b mx-auto justify-center relative text-green-600 text-center">
                  {i.pre_inscrito === true && "Pre Inscrito"}
                </td>
                <td className="rounded-md p-1 border-b text-right flex items-center space-x-3">
                  <button
                    onClick={() => {
                      showUserData();
                      setUserData(i.userId.datos_de_usuario);
                      setUserEmail(i.userId.email);
                    }}
                    className="bg-gradient-to-r from-dival to-dival text-white font-bold text-md rounded-md px-4 py-2 hover:scale-105 relative left-5"
                  >
                    Información
                  </button>
                  <div className="flex">
                    <button
                      onClick={() => {
                        aceptarInscripcion(i._id);
                      }}
                      className="text-green-800 rounded-md px-4 py-2 font-bold relative left-5 hover:scale-105"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => {
                        rechazarInscripcion(i._id);
                      }}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white relative -right-5 font-bold rounded-md px-4 py-2 hover:scale-105"
                    >
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <p className="text-center">No hay pre inscripciones para mostrar.</p>
  )}
  {showData === "user" && (
    <div className="relative  transition delay" ref={containerRef}>
      <ViewTableCourses data={userData} close={setShowData} email={userEmail} />
    </div>
  )}
</div>

  );
};

export const ViewTableCourses = ({ data, close, email }) => {
  const [hiddenSecondName, setHiddenSecondName] = useState(false);

  const [hiddenSecondSurname, setHiddenSecondSurname] = useState(false);


  useEffect(() => {
    if (data[0].segundo_nombre === "no aplica") {
      return setHiddenSecondName(true);
    }
  }, []);

  useEffect(() => {
    if (data[0].segundo_apellido === "no aplica") {
      return setHiddenSecondSurname(true);
    }
  }, []);

  return (
   <div className="mx-auto max-w-lg ">
  {data.map((item, index) => (
    <div key={index} className="bg-zinc-800 rounded-lg shadow-lg p-6 mb-4">
      <button
        onClick={() => {
          close();
        }}
        className="absolute top-3 bg-red-500 p-2 rounded-md mb-32 ml-52 md:ml-[440px] text-gray-600 hover:text-red-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Nombre completo:</h2>
        <p className="text-lg text-white">
          <span>{item.primer_nombre} </span>
          {!hiddenSecondName && <span>{item.segundo_nombre} </span>}
          <span>{item.primer_apellido} </span>
          {!hiddenSecondSurname && <span>{item.segundo_apellido} </span>}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Sexo:</h2>
        <p className="text-lg text-white">{item.sexo}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Fecha de nacimiento:</h2>
        <p className="text-lg text-white">
          {new Date(item.fecha_nacimiento).toLocaleDateString()}
        </p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Número de teléfono:</h2>
        <p className="text-lg text-white">{item.numero_telefono}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Correo electrónico:</h2>
        <p className="text-lg text-white lowercase">{email}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Tipo de documento:</h2>
        <p className="text-lg text-white">{item.tipo_documento}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Número de documento:</h2>
        <p className="text-lg text-white">{item.numero_documento}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Preferencias de contacto:</h2>
        <p className="text-lg text-white">{item.preferencia_contacto}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Municipio de residencia:</h2>
        <p className="text-lg text-white">{item.municipio}</p>
      </div>

      {/* 
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Dirección de residencia:</h2>
        <p className="text-lg text-gray-600">Proximamente...</p>
      </div>
      */}
    </div>
  ))}
</div>

  );
};

export const DropdownWithButtons = () => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          Opciones
          {/* Icono de flecha para indicar si el dropdown está abierto o cerrado */}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {/* Dropdown panel */}
      <div
        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1" role="none">
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Option 1
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Option 2
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Option 3
          </button>
        </div>
      </div>
    </div>
  );
};
