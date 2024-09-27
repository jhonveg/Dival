import { useState } from "react";
import { useCourses } from "../Context/CoursesContext";
import image_not_found from "../assets/image-not-found.png";
import { useInscripcion } from "../Context/inscripcionContext";
import Loading from "./Loading";
import { useNavigate} from "react-router-dom";
import { useStatesProfile } from "../Context/useStateContext";

const CardCursos = ({ course}) => {
  const { updatePreinscripcionCourses } = useCourses();
  const { inscripcionUsuario, loading } = useInscripcion();
  const [showMessage, setShowMessage] = useState(false);
  const [userEnter, setUserEnter] = useState(false);
  const [showDescription, setDescription] = useState(false);
  const {setItemProfile} = useStatesProfile();
  const navigate = useNavigate();
  

  const submitInscription = async (id) => {
    const res = await inscripcionUsuario(id);
    if(res.status === 200){
      updatePreinscripcionCourses();
      navigate("/profile")
      setItemProfile("pre-inscrito")

    }
  };

  return (
    <div
      onMouseEnter={() => {
        setUserEnter(true);
      }}
      onMouseLeave={() => {
        setUserEnter(false);
      }}
      className={`max-w-lg mx-auto rounded-xl  overflow-hidden transition duration-300 ease-in-out transform z-0 relative  ${
        userEnter ? "md:opacity-100 opacity-100 " : "md:opacity-90 opacity-100 "
      } `}
    >
      {course.imagen ? (
        <a
          href={course.imagen.secure_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={`w-screen h-52 object-cover rounded-t-xl fade-in `}
            src={course.imagen.secure_url}
            alt="Banner"
          />
        </a>
      ) : (
        <img
          className="w-screen h-52 object-cover rounded-t-xl fade-in"
          src={image_not_found}
          alt="Banner"
        />
      )}

      <div
        className="p-4 text-center  fade-in-2 slide-up-2 border-b border-black "
      
      >
        <h2 className="font-bold text-2xl mb-2 text-black shadow-sm shadow-black  rounded-md p-1 uppercase">
          {course.nombreCurso}
        </h2>

        {!showDescription && (
          <p className="text-black-600 text-base mb-4 text-justify ">
            {course.descripcionCurso.slice(0, 100)}
          </p>
        )}

          <p  className={`text-black-600 text-base mb-4 transition-all shadow-md text-justify p-1 ${showDescription ? "show-description" : "hide-description"} `}>
            {course.descripcionCurso}
          </p>


        <div className="flex justify-end items-center  ">
          <div className="ml-1 ">
            {course.cuposDisponibles > 0 ? (
              <div className="flex ">
                <div className="md:-ml-[40px]  md:mr-0 mr-[53px] md:left-12  left-1 justify-start fixed bg-gradient-to-r from-blue-700  to-blue-800 shadow-sm shadow-black  text-white p-2 rounded-md ">
                  <button
                    onClick={() => {
                      submitInscription(course._id);
                    }}
                    className=" mx-auto tracking-wide"
                  >
                    {loading ? (
                      <>
                        <p>Procesando...</p>
                        <Loading />
                      </>
                    ) : (
                      <p>Pre inscribirse</p>
                    )}
                  </button>
                </div>

                <p
                  className={
                    course && course.cuposDisponibles === 0
                      ? "text-red-500 text-4xl font-extrabold "
                      : "text-gray-700 text-4xl font-bold"
                  }
                >
                  {course.cuposDisponibles}
                </p>

                <div className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onMouseEnter={() => {
                  setShowMessage(true);
                }}
                onMouseLeave={() => {
                  setShowMessage(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end items-center mb-2 text-xs">
          {course && course.cuposDisponibles == 0 ? (
            <p className="text-red-700">No hay cupos disponibles</p>
          ) : (
            <p className="text-gray-700">Cupos disponibles</p>
          )}
        </div>
        <button
          className={`text-white bg-zinc-800 p-2  text-xs rounded-md ${!showDescription && "animate-pulse"}  `}
          onClick={() => {
            setDescription((prev) => !prev);
          }}
        >
          {showDescription ? "Mostrar menos" : "Mostrar más   "}
        </button>
      </div>

      {showMessage && (
        <p className="bg-zinc-800 rounded-md    p-2 w-screen md:ml-28  ml-24 text-center  text-white absolute bottom-0 left-1/4 transform -translate-x-1/2 z-10 ">
          Pronto habrán cupos disponibles, mantente atento.
        </p>
      )}
    </div>
  );
};

export default CardCursos;
