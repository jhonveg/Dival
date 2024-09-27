import { createContext, useContext, useState } from "react";
import { createCoursesRequest, getCoursesRequest, updateCourseRequest, getCourseRequest, deleteCourseRequest } from "../api/course.api";
import { uploadCourseImageRequest, updateCourseImageRequest } from "../api/avatars.api";
import { AlertError, AlertSuccess, AlertInfo } from '../Components/Alert'


const CoursesContext = createContext()


export const useCourses = () => {

    const context = useContext(CoursesContext);

    if (!context) {
        throw new Error("useCourses debe estar dentro de un Provider")
    }

    return context;
}



export const CoursesProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [imageCourses, setImageCourses] = useState([]);
    const [isUpload, setUploadImageCourse] = useState(null)
    const [loadingCourses, setLoadingCurses] = useState(null)
  


    const getCourses = async () => {

        try {
            setLoadingCurses(true)
            const res = await getCoursesRequest()
            setCourses(res.data)
            if(res.status === 200) {
                setLoadingCurses(false)

            }
        } catch (error) {
            console.log(error ,"este es el error")
            setLoadingCurses(false)
          
            AlertInfo({
                icon: "info",
                title: `${error.response.data.message}`
            });
            
        }

    }

    const getCourse = async (id) => {
        try {

            const res = await getCourseRequest(id)
            setCourses(res.data)

            return res
        } catch (error) {
            console.log(error)

            AlertError({
                icon: "error",
                title: `${error.response.data.message}`
            });
        }
    }

    const updateCourses = async (id, data) => {
        try {
            const res = await updateCourseRequest(id, data);

            const dataArray = Array.isArray(res.data) ? res.data : [res.data];

            setCourses(dataArray);

            if (res.status === 200) {
                AlertSuccess({
                    icon: "success",
                    title: "Curso modificado con éxito"
                });

                return res
            } else {
                AlertError({
                    icon: "error",
                    title: "Error al modificar el curso"
                });
                return res

            }
        } catch (error) {
            console.log(error);
        }
    };


    const updatePreinscripcionCourses = async () => {
        try {
            setLoadingCurses(true);
            const res = await getCoursesRequest();
            setCourses(res.data);
            setLoadingCurses(false);
        } catch (error) {
            console.log(error);
            setLoadingCurses(false);
        }
    };


    const createCourse = async (data) => {
        try {
            const res = await createCoursesRequest(data);

            const dataArray = Array.isArray(res.data) ? res.data : [res.data];

            setCourses(dataArray);

            if (res.status === 200) {
             
                AlertInfo({
                    icon: "info",
                    title: "A continuación sube una imagen del curso."
                });


              
            } else {
                AlertError({
                    icon: "error",
                    title: "Error al crear el curso"
                });
            }

            return res
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCourse = async (id) => {



        try {
            const confirm = window.confirm(`¿Está seguro de eliminar el curso?`);
    
           
            if(confirm){

                const res = await deleteCourseRequest(id)
                if(res.status == 200){
                    setCourses(courses.filter(course => course._id !== id))
                }

                console.log(res)
                AlertSuccess({
                  icon: "success",
                  title: "Curso eliminado correctamente.",
                  timer: 5000
                })
      

            } else {
                AlertInfo({
                    icon: "info",
                    title: "Eliminación cancelada",
                    timer: 5000
                  });
            }





                    
        } catch (error) {
            console.log(error);
        }
    };


    const uploadCourseImage = async (id, data) => {
        try {
            setUploadImageCourse(true)
            const res = await uploadCourseImageRequest(id,data)
            setImageCourses(res.data.imagen)

            console.log(res, "esta es la respuesta de subida de imagen de curso", res.status)
           
            if(res.status === 200) {

                AlertSuccess({
                    icon: "success",
                    title: "Imagen  de curso agregada correctamente",
                    timer: 5000
                  });

                  setUploadImageCourse(false)

            } else {
                AlertError({
                    icon: "error",
                    title: "Ocurrió un error",
                    timer: 5000
                  });
                  setUploadImageCourse(false)
            }
            setUploadImageCourse(false)
            return res
           
        } catch (error) {

            setUploadImageCourse(false)
            console.log(error, "estes el error")
            if(error.response.status === 400) {
                AlertError({
                    icon: "error",
                    title: `${error.response.data.message}`,
                    timer: 5000
                  });
            } else {
                AlertError({
                    icon: "error",
                    title: `${error.response.data.message}`,
                    timer: 5000
                  });
            }
       
        }

    }
    

    const updateCourseImage = async (id,data) => {
      
        try {
            
            setUploadImageCourse(true)
            const res = await updateCourseImageRequest(id,data)
            if(res.status === 200) {

                AlertSuccess({
                    icon: "success",
                    title: `${res.data.message}`,
                    timer: 5000
                  });

                  setUploadImageCourse(false)

            } else {
                AlertError({
                    icon: "error",
                    title: `${res.data.message}`,
                    timer: 5000
                  });
                  setUploadImageCourse(false)
            }
            setUploadImageCourse(false)
            return res
           
        } catch (error) {
            setUploadImageCourse(false)
            console.log(error, "estes el error")
            if(error.response.status === 400) {
                AlertError({
                    icon: "error",
                    title: `${error.response.data.message}`,
                    timer: 5000
                  });
            } else {
                AlertError({
                    icon: "error",
                    title: `${error.response.data.message}`,
                    timer: 5000
                  });
            }
       
        }
    }
    

    return (
        <CoursesContext.Provider value={{ getCourses, courses, updateCourses, createCourse, getCourse, deleteCourse, uploadCourseImage, imageCourses, isUpload, loadingCourses, updateCourseImage, updatePreinscripcionCourses}}>
            {children}
        </CoursesContext.Provider>
    );
};
