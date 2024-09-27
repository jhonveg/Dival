import { uploadImage, deleteImage, uploadCourseImage } from "../libs/cloudinary.js";
import fs from 'fs-extra'

//importamos modelos de Usuario y curso
import User from '../models/userModel.js'
import Curso from '../models/coursesModel.js'

// Metodo para subir una imagen de usuario
export const createImage = async (req, res) => {


    try {
        // Se busca al usuario mediante su propio ID
        const userFound = await User.findById(req.user.id)

        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }


        console.log(userFound)
        // Se verifica que venga el campo "image" en la petición
        if (req.files?.image) {

            // se utiliza el metodo de subir imagen a la nube.
            const result = await uploadImage(req.files.image.tempFilePath);
            
           // se almacena la imagen en el campo "avatar" del modelo del usuario
            userFound.avatar = {
                public_id: result.public_id,
                secure_url: result.secure_url,
                original_filename: req.files?.image.name
            }
            // se elimina el archivo temporal
            await fs.unlink(req.files.image.tempFilePath)
            // se guardan los datos en la BD
            await userFound.save();


        }



        else {

            return res.status(400).json({ message: 'Debes proporcionar una imagen' });

        }




        return res.status(200).json({ message: 'Imagen de perfil actualizada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }

}



//Metodo para modificar la imagen del usuario
export const updateImage = async (req, res) => {



    try {

        // se busca al usuario por su propio ID
        const userFound = await User.findById(req.user.id)

        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // se verifica que venga el campo "image" en la petición
        if (req.files?.image) {

            // verifica si la imagen que se envia es igual a la actual
            if (req.files?.image.name === userFound.avatar.original_filename) {
                return res.status(400).json({ message: 'Ya has subido esta imagen, selecciona otra.' });
            }

            console.log(req.files?.image.name)
            // se verifica si el usuario tiene una imagen de perfil
            if (userFound.avatar && userFound.avatar.public_id) {
                const result = await uploadImage(req.files.image.tempFilePath);
               
                // se elimina la imagen del usuario en caso de tener
                await deleteImage(userFound.avatar.public_id)

            }

           
            // se sube la imagen de usuario
            const result = await uploadImage(req.files.image.tempFilePath);
            
           // se almacena la nueva imagen
            userFound.avatar = {
                public_id: result.public_id,
                secure_url: result.secure_url,
                original_filename: req.files?.image.name,
            }
            // se elimina la imagen temporal
            await fs.unlink(req.files.image.tempFilePath)
            // se guardan los datos en la BD
            await userFound.save();

            return res.status(200).json({ message: 'Imagen actualizada correctamente' });
        }
        else {
            return res.status(400).json({ message: 'Debes proporcionar una imagen' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }

}



// Metodo para subir la imagen a un curso
export const createCourseImage = async (req, res) => {

    try {

        // se recibe el id del curso mediante los parametros
        const { id: courseId } = req.params

        // se busca al curso con dicho id
        const course = await Curso.findById(courseId)
        if (!course) return res.status(404).json({ message: "No se encontró el curso" })
        
        // se verifica que venga el campo "image" en la petición
        if (req.files?.image) {
            // se utiliza el metodo de subir imagen a la nube.
            const result = await uploadCourseImage(req.files.image.tempFilePath);
            console.log(result)
            
            //se almacena la imagen en el campo "imagen" del modelo de los cursos
            course.imagen = {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            // se elimina el archivo temporal
            await fs.unlink(req.files.image.tempFilePath);
            // se guarda la imagen
            await course.save();
        }

        else {
            return res.status(400).json({ message: 'No se proporcionó ninguna imagen de curso' })
        }

        return res.status(200).json({ message: 'Imagen de curso agregada correctamente' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });

    }
}



export const updateCourseImage = async (req, res) => {

    try {
        // se recibe el id del curso mediante los parametros
        const {id} = req.params
        // se busca al curso con dicho id
        const cursoFounded = await Curso.findById(id)
        if (!cursoFounded) return res.status(404).json({ message: "No se encontró el curso" })
        //se verifica si el campo "imagen" viene en la petición
        if(req.files?.image) {
           
            // se verifica si el curso ya tiene una imagen previa
            if(cursoFounded.imagen && cursoFounded.imagen.public_id){
               // se sube la nueva imagen
                const result = await uploadCourseImage(req.files.image.tempFilePath)
                // se elimina la anterior imagen
                await deleteImage(cursoFounded.imagen.public_id)
            }
            


            const result = await uploadCourseImage(req.files.image.tempFilePath)
            await fs.unlink(req.files.image.tempFilePath)
          console.log(result)
          // se almacena la imagen
          cursoFounded.imagen = {
    
                public_id: result.public_id,
                secure_url: result.secure_url
            }
            
            // se guarda la imagen en la base de datos
            await cursoFounded.save();
    
            return res.status(200).json({ message: 'Imagen de curso actualizada correctamente' });


            
        } else {
            return res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
        
        }

      





    } catch (error) {
    await fs.unlink(req.files.image.tempFilePath)
     return res.status(400).json({
        error
     })
       
    }

}