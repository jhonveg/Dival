import Curso from '../models/coursesModel.js'
import inscripcion from '../models/inscripcion.model.js'
import fs from 'fs-extra'
import { uploadCourseImage } from '../libs/cloudinary.js'


// Metodo para crear un curso
export const createCourse = async (req, res) => {
    // Se extraen los campos del body para crear el curso
    const { nombreCurso, descripcionCurso, cuposDisponibles, date } = req.body





    try {   


        const imageUrl = null

        // Se verifica si en la petición se está enviando una imagen en el campo "image"
        if (req.files?.image) {

            // se llama a la función para subir la imagen al servicio en la nube
            const result = await uploadCourseImage(req.files.image.tempFilePath)
            console.log(result)
            // se guarda la url en el campo imageUrl del modelo
            imageUrl ={
                public_id: result.public_id,
                secure_url: result.secure_url,
            }
            // se elimina la imagen residuo
            await fs.unlink(req.files.image.tempFilePath);

        }

        console.log('Imagen:', imageUrl);


        // se guardan los datos del curso en los campos
        const newCourse = new Curso({
            nombreCurso,
            descripcionCurso,
            cuposDisponibles,
            date,
            image: imageUrl,
            user: req.user.id,
            isDelete: false
        })

        // se guarda el curso en la base de datos
        const savedCourse = await newCourse.save();

        res.json(savedCourse)

    } catch (error) {

        res.status(404).json(error)
        console.log(error)
    }


}


//Metodo para obtener un curso
export const getCourse = async (req, res) => {

    // se busca al curso por su ID mediante los parametros, se llama también al "User " el cual lo creó
    const findCourse = await Curso.findById(req.params.id).populate('user')
    if (!findCourse) return res.status(404).json({ message: "No se encontraron cursos" })
     
    // Se devuelve el curso
    res.json(findCourse)

    console.log(findCourse)



}


//Metodo para obtener todos los cursos creados
export const getCourses = async (req, res) => {
    try {
        
        // Se buscan todos los cursos utilizando el metodo find donde el campo "isDelete" sea false
        const courses = await Curso.find({ isDelete: false }).populate('user')
        // Si no hay cursos, se detiene la ejecución del código
        if(courses.length === 0) return res.status(404).json({message: "No hay cursos para mostrar"})
        res.json(courses)

    } catch (error) {

        res.status(404).json(error)
        console.log(error)

    }

}

// Metodo para actualizar un curso existinte
export const updateCourse = async (req, res) => {
    try {

        // Se busca el curso mediante el ID proporcionado en los parametros, se pasa el body y se actualizan los campos indicados.
        const findCourse = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!findCourse) return res.status(404).json({ message: "No se encontró el curso" })
        res.json(findCourse)
    } catch (error) {

        console.log(error)
    }
}




// Metodo para inhabilitar un curso
export const deleteCourse = async (req, res) => {

    //Se busca el curso por el ID proporcionado mediante los parametros y se modifica su campo "Isdelete" a true.
    const findCourse = await Curso.findByIdAndUpdate(req.params.id, { isDelete: true })
    if (!findCourse) return res.status(404).json({ message: "No se encontró ninguna tarea para eliminar" })
    res.status(200).json({ message: "Curso eliminado" })


}