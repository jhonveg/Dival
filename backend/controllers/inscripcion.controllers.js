import Curso from '../models/coursesModel.js'
import inscripcion from '../models/inscripcion.model.js';
import User from '../models/userModel.js'

// Método para registrarse en un curso
export const registerCourse = async (req, res) => {

    try {
            // Se busca al usuario mediante su propio ID
            const userFound = await User.findById(req.user.id)
          
            if(!userFound) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
           
         // Se extrae el ID del curso a inscribirse desde los params
        const { id: courseId } = req.params;
        // se busca el curso
        const curso = await Curso.findById(courseId);
        if (!curso) return res.status(404).json({ message: "No se encontró el curso" })
        
        // Si el curso no tiene cupos disponibles, se retorna un error
        if (curso.cuposDisponibles <= 0) {
            return res.status(400).json({ mensaje: 'No hay cupos disponibles para pre-inscribirse en este curso' });
        }
        
        // Se busca si el usuario ya está inscrito en el curso
        const existingInscripcion = await inscripcion.findOne({
            userId: req.user.id,
            courseId: courseId
        });

        // Si el usuario ya está inscrito en el curso, se retorna un error
        if(existingInscripcion && userFound.inscrito.includes(existingInscripcion._id)){
            return res.status(403).json({ message: 'Ya estás inscrito en este curso' });
        }

         // Si el usuario ya está pre-inscrito en el curso, se retorna un error
        if (existingInscripcion) {
            return res.status(403).json({ message: 'Ya estás pre-inscrito en este curso' });
        }

       
        // Si el usuario no tiene datos de usuario se retorna un error
        if(userFound.datos_de_usuario.length < 1) {
            return res.status(400).json({ message: 'Primero debes agregar tus datos personales' });
        }

      
        // se almacena la inscripcion
        const nuevaInscripcion = new inscripcion({
            userId: req.user.id,
            courseId: courseId,
            fechaInscripcion: new Date(),
            pre_inscrito: true

        });


        // se guarda la inscripcion en la base de datos
        await nuevaInscripcion.save();
        // se actualiza el cupo disponible del curso
        await Curso.findByIdAndUpdate(courseId, { $inc: { cuposDisponibles: -1 } })

        // se busca al usuario nuevamente
       const foundUser = await User.findById(req.user.id)
       if(!foundUser) return res.status(404).json({message: "No se encontró al usuario."})
        
        // se guarda la inscripcion en la base de datos en el campo pre_inscrito
       foundUser.pre_inscrito.push(nuevaInscripcion._id)
       // se guarda al usuario
       await foundUser.save();
        res.status(200).json({ message: 'Pre-inscripción exitosa' });


    } catch (error) {
        console.error('Error al inscribirse en el curso', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}


// Metodo para obtener las inscripciones
export const obtenerInscritos = async (req,res) => {
    try {
        // se busca en la base de datos las inscripciones filtrando el campo "inscrito"
        const inscripciones = await inscripcion.find({inscrito: true}).populate('courseId').populate('userId').sort({ dateRegistered: -1 });
        if(!inscripciones) return res.status(404).json({ message: 'No inscripciones' });

        res.json(inscripciones);

      } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
      }

}



// Metodo para obtener las pre inscripciones
export const obtenerPreInscripciones = async (req, res) => {
    try {
              // se busca en la base de datos las inscripciones filtrando el campo "pre_inscrito"

      const inscripciones = await inscripcion.find({pre_inscrito: true}).populate('courseId').populate('userId').sort({ dateRegistered: -1 });

      res.json(inscripciones);
    } catch (error) {
      console.error('Error al obtener inscripcsiones del usuario', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };


  // metodo para obtener las preinscripciones del usuario
  export const obtenerPreinscripcionUsuario= async (req, res) => {
    try {

        //se extrae el userId desde los parametros
        const {userId} = req.params;

        // se busca en la base de datos las inscripciones filtrando el campo "pre_inscrito" y el id del usuario "userId"
        const inscripcionEncontrada = await inscripcion.find({userId, pre_inscrito: true}).populate('courseId')
        if(!inscripcionEncontrada) return res.status(404).json({ message: 'No se encontró'});

        res.status(200).json(inscripcionEncontrada)

    } catch (error) {
        console.error('Error al obtener información del curso inscrito por el usuario', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


//Metodo para obtener inscripcion por usuario
  export const obtenerInscripcionUsuario= async (req, res) => {
    try {
        // se extrae el id del usuario a consultar
        const {userId} = req.params;
        // se busca en la base de datos las inscripciones filtrando el campo "inscrito" y el id del usuario "userId"

        const inscripcionEncontrada = await inscripcion.find({userId, inscrito: true}).populate('courseId')
        if(!inscripcionEncontrada || inscripcionEncontrada.length === 0 ) return res.status(404).json({ message: 'No se encontró'});

        console.log(inscripcionEncontrada)


        res.status(200).json(inscripcionEncontrada)

    } catch (error) {
        console.error('Error al obtener información del curso inscrito por el usuario', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};



// Metodo para rechazar una inscripcion
export const rechazarInscripcion = async (req,res) => {

  

    try {
        // Se extrae el id de la inscripcion
        const {id} = req.params

        // se consulta la inscripcion con su ID
        const inscripcionEncontrada = await inscripcion.findById(id)
        if(!inscripcionEncontrada) return res.status(404).json({ message: "Inscripción no encontrada"})
        
        // se actualiza el campo "pre_inscrito" de la inscripcion a false
        await inscripcion.findByIdAndUpdate(id, {pre_inscrito: false, dateRegistered: new Date})

        // se busca al usuario con el id de la inscripcion
        const user = await User.findOne({ _id: inscripcionEncontrada.userId });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        //se filtra la preinscripcion del usuario  y se remueve
        user.pre_inscrito = user.pre_inscrito.filter(preinscripcion => preinscripcion.toString() !== id);
        
        if(user.inscrito) {
            user.inscrito = user.inscrito.filter(inscripcion => inscripcion.toString() !== id);

        }
        

        // se guardan los cambios hechos al usuario
        await user.save();

        // se actualiza el cupo disponible del curso obtenida del modelo de "inscripcion"
        await Curso.findByIdAndUpdate(inscripcionEncontrada.courseId._id, { $inc: { cuposDisponibles: +1 } })
        //se elimina la inscripcion
        await inscripcion.findByIdAndDelete(id)
        console.log(inscripcionEncontrada)
        
        return res.status(200).json({ message: "Inscripción rechazada correctamente"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error});
    }

}

// Metodo para aceptar una inscripción 
export const aceptarInscripcion = async (req,res) => {
    try {

        // se extrae el ID de la inscripción de los parametros
        const {id} = req.params
       
        // se busca la inscripción
        const buscarInscripcion = await inscripcion.findById(id)
        console.log(buscarInscripcion)
        if(!buscarInscripcion) return res.status(404).json({message: "No se encontró la pre inscripción"})
        
        // se actualiza el campo "pre_inscrito" de la inscripción a false y el campo "inscrito" a true
        await inscripcion.findByIdAndUpdate(id, {pre_inscrito: false, inscrito: true, dateRegistered: Date.now() })

        // se busca al usuario con el id de la inscripción
        const user = await User.findById(buscarInscripcion.userId._id)
        
        // se verifica que el usuario no este inscrito anteriormente
        if(user.inscrito && user.inscrito.includes(id)){
            return res.status(400).json({message: "Ya estás inscrito en este curso"})
        }

        // se filtra el campo pre inscrito si es diferente del ID
        user.pre_inscrito = user.pre_inscrito.filter(preinscripcion => preinscripcion.toString() !== id);
       
        // se guarda el id de la inscripcion en el campo "inscrito" de la base de datos
        user.inscrito.push(buscarInscripcion);
        // se guardan los datos cambiados del usuario
        await user.save()

        return res.status(200).json({message: "Inscripción aceptada correctamente"})

    } catch (error) {
        console.log(error)
    return res.status(500).json({error});
    }
}
