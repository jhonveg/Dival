import { useEffect, useState } from "react";
import {  Container } from "@mui/material";
import { Link } from "react-router-dom";
import { useCourses } from "../../Context/CoursesContext";
import CoursesForm from "./CoursesForm";
import image_not_found from "../../assets/image-not-found.png";
import FormImageCourse from "../Forms/FormImageCourse";
import { useRef } from "react";

const TableCursos = ({ cursos }) => {
  const { deleteCourse } = useCourses();
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewImagesForm, setViewImagesForm] = useState(false);
  const formContainerRef = useRef(null);




  useEffect(() =>{

    if(viewImagesForm){
      formContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }

  },[viewImagesForm])

  return (
    <Container maxWidth="lg">
      <div className="relative overflow-x-auto mt-2 md:rounded-lg  min-h-screen ">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ${
            editForm ? "blur-sm" : ""
          }`}
        >
          {Array.isArray(cursos) &&
            cursos.length > 0 &&
            cursos.map((curso) => (
              <div
                key={curso._id}
                className={`relative bg-zinc-900 p-6 rounded-md overflow-hidden hover:rounded-md ${
                  viewImagesForm && "blur-sm grayscale   pointer-events-none"
                }`}
              >
                {curso.imagen ? (
                  <div>
                    <img
                      className="w-full h-48 object-cover mb-4 rounded-md"
                      src={curso.imagen.secure_url}
                      alt={`Imagen de ${curso.nombreCurso}`}
                    />
                  </div>
                ) : (
                  <img
                    className="w-full h-48 object-cover mb-4 rounded-md"
                    src={image_not_found}
                    alt={`Imagen de ${image_not_found}`}
                  />
                )}
                <button
                  onClick={() => {
                    setViewImagesForm(true);
                    setSelectedCourse(curso._id);
                  }}
                  className="text-white mb-2 bg-gradient-to-r p-2 from-dival shadow-md shadow-black  rounded-md "
                >
                  Editar imagen
                </button>

                <p className="text-white mb-4">ID: {curso._id}</p>
                <p className="text-white mb-4">
                  Nombre de Curso: {curso.nombreCurso}
                </p>
                <p className="text-white mb-4">
                  Cupos Disponibles: {curso.cuposDisponibles}
                </p>
                <p className="text-white mb-4">
                  Fecha de creación: {new Date(curso.date).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between">
                  <div
                    onClick={() => {
                      setEditForm(true);
                      setSelectedCourse(curso._id);
                    }}
                    className="cursor-pointer  bg-green-700 rounded-md"
                  >
                    <Link to={`/cursos/${curso._id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div
                    onClick={() => deleteCourse(curso._id)}
                    className="cursor-pointer bg-red-700 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}

          {cursos && cursos.length === 0 && (
            <div className="px-2 ">
              <p className="text-white bg-zinc-800 p-2 rounded-md">No hay cursos creados.</p>
              <button
                onClick={() => setCreateForm((prevState) => !prevState)}
                className="text-blue-600"
              >
                {createForm
                  ? "Clic para cerrar el formulario"
                  : "Clic para crear un curso"}
              </button>
            </div>
          )}

          {createForm &&  (
            <div className="inset-0 flex items-center justify-center z-50 transition delay">
              <div className="p-4">
                <CoursesForm editCourseId={selectedCourse} />
              </div>
            </div>
          )}

         <div  >
         {viewImagesForm  && (
            <div  className="inset-0 flex items-center  absolute justify-center z-50 transition delay">
              <div   ref={formContainerRef} className="p-4">
                <button
                  onClick={() => {
                    setViewImagesForm(false);
                  }}
                  className="bg-red-800  rounded-md"
                >
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <FormImageCourse status={setViewImagesForm} id_update_image={selectedCourse} />
              </div>
            </div>
          )}
         </div>
        </div>
      </div>

      {/* 
        {createForm && (
          <div className='p-6 rounded-md overflow-hidden hover:rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>

            <div>

              <button onClick={() => { setCreateForm(false) }}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg></button>

            </div>

          </div>
        )} */}
    </Container>
  );
};

export default TableCursos;
