import React, { useEffect, useState } from "react";
import { Box, Container} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../Context/CoursesContext";
import { AlertWarning } from "../../Components/Alert";
import FormImageCourse from "../Forms/FormImageCourse";

const CoursesForm = ({ editCourseId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { updateCourses, createCourse, getCourse} =
    useCourses();
  const [openImageForm, setOpenImageForm] = useState(null);
  const [formId, setFormId] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadCourse() {
      if (params.id || editCourseId) {
        const res = await getCourse(params.id || editCourseId);
        setValue("nombreCurso", res.data.nombreCurso);
        setValue("descripcionCurso", res.data.descripcionCurso);
        setValue("cuposDisponibles", res.data.cuposDisponibles);
      }
    }

    loadCourse();
  }, []);

  // useEffect(() => {

  //     if(isUpload) {
  //         navigate("/cursos")
  //     }

  // },[isUpload])

  const submitCurso = handleSubmit(async (data, e) => {
    e.preventDefault();

    if(data.cuposDisponibles > 1000){
      return AlertWarning({
        icon: "warning",
        title: "No puedes poner cupos de esa longitud",
      });
    }

    if (isNaN(data.cuposDisponibles)) {
      AlertWarning({
        icon: "warning",
        title: "Cupos disponibles inválidos",
      });
    } else {
      data.cuposDisponibles = parseFloat(data.cuposDisponibles);

      if (params.id || editCourseId) {
        const res = await updateCourses(params.id || editCourseId, data);
        if (res.status === 200) {
          navigate("/admin/cursos");
        }
      } else {
        const result = await createCourse(data);
        if (result.status === 200) {
          setOpenImageForm(true);
          setFormId(result.data._id);
        }
      }

      // const timer = setTimeout(() => {
      //     navigate("/cursos")
      // }, 2000)

      // return () => clearTimeout(timer)
    }
  });

  return (
    <Container
      className="rounded-lg mt-20 min-h-screen"
      maxWidth="xs"
      sx={{ alignItems: "center" }}
    >
      <Box className="bg-gradient-to-r from-cyan-800 to-cyan-400 rounded-md shadow-md p-8 mt-4">
        {!openImageForm ? (
          <>
            {params.id || editCourseId ? (
              <p className="bg-gray-900 p-5 w-full rounded-md text-white text-lg mt-4 text-center">
                Modificar Curso
              </p>
            ) : (
              <p className="bg-gray-900 p-5 w-full rounded-md text-white text-lg mt-4 text-center">
                Crear un curso
              </p>
            )}

            <form
              onSubmit={submitCurso}
              className="mt-4"
              encType="multipart/form-data"
            >
              {errors.nombreCurso && (
                <p className="text-red-500 text-sm ml-4 font-bold">
                  Nombre del curso requerido
                </p>
              )}
              <input
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 mb-3"
                placeholder="Nombre del curso"
                autoFocus
                {...register("nombreCurso", { required: true })}
              />

              {errors.descripcionCurso && (
                <p className="text-red-500 text-sm ml-4 font-bold">
                  Descripción del curso requerida
                </p>
              )}
              <textarea
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 mb-3"
                aria-label="empty textarea"
                placeholder="Descripción"
                {...register("descripcionCurso", { required: true })}
              />

              {errors.cuposDisponibles && (
                <p className="text-red-500 text-sm ml-4 font-bold">
                  Cupos Disponibles requeridos
                </p>
              )}

              <input
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-52 p-2.5"
                placeholder="Cupos Disponibles"
                type="number"
                {...register("cuposDisponibles", { required: true })}
              />

              <Box>
                {params.id || editCourseId ? (
                  <button
                    type="submit"
                    className="bg-gradient-to-l from-green-600 shadow-xl p-5  rounded-md w-full mt-3  "
                  >
                    Modificar Curso
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-gradient-to-l from-green-600 p-5 rounded-md w-full mt-3  shadow-xl"
                  >
                    Crear Curso
                  </button>
                )}
              </Box>
            </form>
          </>
        ) : (
          <FormImageCourse id={formId} />
        )}
      </Box>
    </Container>
  );
};

export default CoursesForm;
