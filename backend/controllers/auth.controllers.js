import AccessToken from "../libs/jwt.js"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { token_secret } from "../config.js"
import { deleteImage, uploadImage } from "../libs/cloudinary.js"


// Configuraciones del token para utilizar tanto en producción como en desarollo.
// Las opciones se manejan mediante la variable de entorno
const cookieOptions = {
    httpOnly: process.env.COOKIES_OPTIONS === 'production' ? true : false,
    sameSite: process.env.COOKIES_OPTIONS === 'production' ? 'None' : "",
    secure: process.env.COOKIES_OPTIONS === 'production' ? true : false

}


console.log(cookieOptions)


// Método para registrar a un usuario nuevo.
export const Register = async (req, res) => {

    const { username, password, repeat_password, email, rol } = req.body


    try {

        //  Se hace la consulta para buscar en la base de datos si ya existe alguien registrado con este correo
        const userFound = await User.findOne({ email })
        // Se valida si existe el correo, de ser así se le manda un mensjae y se detiene la ejecución
        if (userFound) return res.status(400).json(['La dirección de correo ya está en uso'])

        // Se verifica si las contraseñas para el registro coinciden 
        if (repeat_password != password) return res.status(400).json(["Las contraseñas no coinciden"])

        // Se verifica si intentan enviar el campo ROL en la consulta, de ser así, se detiene la ejecución
        if (rol) {
            return res.status(400).json({ message: "Campo no admitido." })
        }

        // Se encripta la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        // Se crea un nuevo usuario con los datos ingresados en el formulario de registro
        const newUser = new User({

            username,
            password: passwordHash,
            email,
            rol,
            isDelete: false



        })


        // Se guarda al usuario en la base de datos
        const userSave = await newUser.save();

        // Se genera el token del usuario
        const token = await AccessToken({ id: userSave._id })
        res.cookie("token", token, cookieOptions)
        // Se retornan los datos del usuario
        return res.status(201).json({
            ID: userSave._id,
            Usuario: userSave.username,
            Correo: userSave.email,
            Rol: userSave.rol

        })


    } catch (error) {

        res.status(500).json({ message: error.message })
        console.log(error)
    }

}

// Método para iniciar sesión en la aplicación.
export const Login = async (req, res) => {

    // Se desestructuran los datos provenientes del body
    const { email, password } = req.body


    try {

        // Se verifica si el email enviado en la petición existe o coincide con uno anteriormente registrado
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" })

        // Se compara si la contraseña ingresa en el req.body coincide con la encontrada en la base de datos para
        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(404).json({ message: "Credenciales inválidas" })

        const token = await AccessToken({ id: userFound._id })

        res.cookie("token", token, cookieOptions)

        return res.status(201).json({
            ID: userFound._id,
            Usuario: userFound.username,
            Correo: userFound.email,
            Rol: userFound.rol,


        })


    } catch (error) {

        res.status(500).json({ message: error.message })
        console.log(error)
    }


}

// Función para retirar el token creado
export const Logout = async (req, res) => {

    // Se establece el token a 0 o vacio
    res.cookie("token", " ", {
        expires: new Date(0),


    })

    return res.sendStatus(200);


}


//Metodo para obtener el perfil propio el usuario
export const Profile = async (req, res) => {
    // Se busca al usuario por su ID
    const userFound = await User.findById(req.user.id)
    // Se valida si el usuario existe y su campo isDelete 
    if (!userFound || userFound.isDelete) res.status(400).json({ message: "Usuario no encontrado" });
    // Se retornan los datos del usuario
    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        Creado: userFound.createdAt,
        Modificado: userFound.updatedAt,
        rol: userFound.rol,
        avatar: userFound.avatar,
        datos_personales: userFound.datos_de_usuario,
        pre_inscrito: userFound.pre_inscrito,
        inscrito: userFound.inscrito

    })

}

// Metodo para verificar el TOKEN del usuario
export const verifyToken = async (req, res) => {
    //  se extrae el token desde las cookies
    const { token } = req.cookies
    // se valida el token
    if (!token) return res.status(401).json({ message: "Usuario no autorizado" });
    // se utiliza la función de jwt para verificar la autenticidad del token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {



        try {


            if (err) return res.status(err).json({ message: "No autorizado" });

            const userFound = await User.findById(user.id)

            if (!userFound || userFound.isDelete) return res.status(401).json({ message: "No autorizado" });

            return res.json({
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
            });


        } catch (err) {

            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            }

            if (jwt.TokenExpiredError) {

                res.status(400).json({ message: 'Vuelve a iniciar sesión.' });


            }

            return

        }




    })
}

// Metodo para que el usuario cambie su nombre de usuario
export const updateUsername = async (req, res) => {
    // se extrae el id del usuario desde los parametros
    const { id } = req.params;
    // se extrae el nombre de usuario desde el body
    const { username } = req.body;

    try {

        // se busca al usuario
        const userCurrent = await User.findById(id)
        // se valida que el nombre de usuario ingresa no sea igual al actual encontrado
        if (userCurrent.username === username) {

            return res.status(400).json({ message: "El nombre de usuario ingresado es igual al anterior" });
        }


        // se hace el cambio al nuevo nombre de usuario
        const updatedUser = await User.findByIdAndUpdate(id, { username }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "No se encontraron coincidencias" });
        }

        // const isMatch = await bcrypt.compare(email, findUser.email)
        // if(isMatch) return res.status(404).json({message: "El correo que tratas de actualizar es igual"})

        // se crea un nuevo token para el usuario
        const token = await AccessToken({ id: updatedUser._id })
        res.cookie("token", token, cookieOptions)

        return res.status(201).json({
            ID: updatedUser._id,
            Username: updatedUser.username,

        })


    } catch (error) {

        res.status(500).json({ message: error.message })
    }

}

// Metodo para que el usuario cambie su contraseña
export const updateUserPassword = async (req, res) => {

    try {
        // se extrae el campo  password desde el body de la petición
        const { password } = req.body
        // se busca al usuario por su id
        const userCurrent = await User.findById(req.user.id)

        if (!userCurrent) {
            return res.status(404).json({ message: "No se encontró al usuario" });
        }


        //se veritifca que la contraseña a cambiar no sea igual a la actual
        const isSamePassword = await bcrypt.compare(password, userCurrent.password);

        if (isSamePassword) {
            return res.status(400).json({ message: "La contraseña ingresada es igual a la anterior" });
        }


        var newPasswordHash
        const rounds = 10;
        newPasswordHash = await bcrypt.hash(password, rounds);






        const updatePassword = await User.findByIdAndUpdate(req.user.id, { password: newPasswordHash }, { new: true })





        if (!updatePassword) {
            return res.status(404).json({ message: "No se encontraron coincidencias" })
        }

        const token = await AccessToken({ id: updatePassword._id })
        res.cookie("token", token, cookieOptions)

        return res.status(201).json({
            message: "Contraseña actualizada correctamente"
        })


    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// Metodo para que el usuario cambie su correo electronico
export const updateEmail = async (req, res) => {

    const { id } = req.params;
    const { email } = req.body;

    try {


        const userCurrent = await User.findById(id)

        if (!email) {
            return res.status(400).json({ message: "El correo electrónico es requerido" });
        }
        if (userCurrent.email === email) {

            return res.status(400).json({ message: "El nuevo correo electrónico es igual al actual" });
        }


        const existingUser = await User.findOne({ email });

        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).json(["El correo electrónico ya está registrado"]);
        }



        const updatedUser = await User.findByIdAndUpdate(id, { email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "No se encontraron coincidencias" });
        }

        // const isMatch = await bcrypt.compare(email, findUser.email)
        // if(isMatch) return res.status(404).json({message: "El correo que tratas de actualizar es igual"})

        const token = await AccessToken({ id: updatedUser._id })
        res.cookie("token", token, cookieOptions)

        return res.status(201).json({
            ID: updatedUser._id,
            Correo: updatedUser._id,

        })


    } catch (error) {

        res.status(500).json({ message: error.message })
    }

}

//Metodo para obtener todos los registros de los usuarios en la base de datos
export const getUsers = async (req, res) => {

    try {

        // se extrae la pagina y el limite desde los parametros de la petición
        const page = parseInt(req.query.page) || 2
        const limit = parseInt(req.query.limit) || 10
        const skipe = (page - 1) * limit

        // se buscan todos los registros de los usuarios en la base de datos
        const users = await User.find({ isDelete: false }).skip(skipe).limit(limit);



        res.status(201).json({
            users,
            currentPage: page,
            totalPages: Math.ceil(await User.countDocuments({ isDelete: false }) / limit)

        })
    } catch (error) {

        console.log(error)

        res.status(500).json({ message: error.message })
    }

}

//metodo para obtener a un usuario mediante su EMAIL
// no está en funcionamiento

export const getUser = async (req, res) => {


    // se extrae el email
    const { email } = req.body

    try {
        // se busca al usuario en la base de datos el email ingresado
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" })

        res.status()

    } catch (error) {

        console.log(error)
    }


}

// Metodo para obtener a un usuario por su ID
export const getUserById = async (req, res) => {

    try {

        const findOneUser = await User.findById(req.params.id)
        if (!findOneUser) return res.status(404).json({ message: "No se encontró al usuario" });
        res.json(findOneUser)
    } catch (error) {

        console.log(error)

    }
}

// Metodo para eliminar a usuario (inhabilitar)
export const deleteUser = async (req, res) => {

    try {

        // se busca al usuario a inhabilitar mediante el parametro ID y se modifica el campo en true
        const findUser = await User.findByIdAndUpdate(req.params.id, { isDelete: true })
        if (!findUser) { return res.status(404).json({ message: "No se encontró el usuario" }) }

        // se verifica si el usuario tiene imagen de perfil, si es asi, se elimina.
        if (findUser.image?.public_id) {
            const result = await deleteImage(findUser.avatar.public_id)
            console.log(result)
        }

        res.status(200).json({ message: "Usuario eliminado correctamente" })
    } catch (error) {
        res.json(error)
    }

}

// Metodo para actualizar todos los datos del usuario (para administradores)

export const updateUserSchema = async (req, res) => {
    // se extrae el id del usuario a modificar
    const { id } = req.params
    // se extrae los campos a modificar desde el body de la petición
    const { username, email, password, rol } = req.body

    try {
        // se busca al usuario
        const findUser = await User.findById(id)
        // se define una variable
        let newPasswordHash;
        // se verifica si se ingreso el campo password, de ser así, se encripta
        if (password) {
            // constante para definir la longitud del hash
            const rounds = 10;

            // se encripta la contraseña
            newPasswordHash = await bcrypt.hash(password, rounds)
        }

        if (password && password.length < 6) {
            return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
        }
        if (username && username.length < 6) {
            return res.status(400).json({ message: "El nombre de usuario debe tener al menos 6 caracteres" });
        }

        const updateFields = {};

        if (username) { updateFields.username = username }
        if (email) { updateFields.email = email }
        if (newPasswordHash) { updateFields.password = newPasswordHash }


        if (rol !== 'admin' && rol !== 'user') {
            return res.status(400).json({ message: "El rol ingresado no es valido." });
        } else {

            { updateFields.rol = rol }
        }


        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true })

        if (!updatedUser) {
            return res.status(404).json({ message: "No se encontraron coincidencias" });
        }

        return res.status(201).json({
            ID: updatedUser._id,
            Username: updatedUser.username,
            Correo: updatedUser.email,
            Rol: updatedUser.rol,
            Password: updatedUser.password
        });

    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

// Metodo para tomar los datos personales de un usuario
export const formInfoUser = async (req, res) => {
    try {
        

        // se busca al usuario
        const userFound = await User.findById(req.user.id)
        if (!userFound) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }   

        // array con los municipios 
        const municipios = ['medellin', 'barbosa', "girardota", "copacabana", "bello", "envigado", "itagui", "sabaneta", "la-estrella", "caldas"]

        // se extraen los campos desde la petición hecha
        const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, sexo, fecha_nacimiento, numero_telefono, tipo_documento, numero_documento, preferencia_contacto, municipio, direccion } = req.body



        // se valida que los campos estén llenos
        if (!primer_nombre || !primer_apellido || !sexo || !fecha_nacimiento || !tipo_documento || !numero_telefono || !numero_documento || !preferencia_contacto || !municipio) {
            return res.status(400).json({ message: 'Debes llenar todos los campos.' })



        } else {


            // los campos segundo nombre y segundo apellido son opcionales, de no ser ingresados de iguala a "no aplica"
            const segundo_nombre_validate = segundo_nombre === '' ? "no aplica" : segundo_nombre
            const segundo_apellido_validate = segundo_apellido === '' ? "no aplica" : segundo_apellido


            // expresiones regulares para validar los datos
            if (!/^[a-zA-Z]*$/.test(segundo_nombre)) {
                return res.status(400).json({ message: 'El segundo nombre no puede contener números o espacios vacios.' });
            }

            if (!/^[a-zA-Z]*$/.test(segundo_apellido)) {
                return res.status(400).json({ message: 'El segundo apellido no puede contener números o espacios vacios.' });
            }

            if (numero_documento.length > 15) {
                return res.status(400).json({ message: 'El número de documento no puede contener más de 15 dígitos.' });
            } else if (numero_documento.length < 8) {
                return res.status(400).json({ message: 'El numero de documento no puede ser inferior a los 8 digitos' })
            }

            if (numero_telefono.length > 10) {
                return res.status(400).json({ message: "El número teléfono no puede ser mayor de 10 digitos" })
            } else if (numero_telefono.length < 10) {
                return res.status(400).json({ message: "El número de teléfono no puede ser menor de 10 digitos" })
            }




            if (!municipios.includes(municipio.toLowerCase())) {
                return res.status(404).json({ message: 'El municipio ingresado es inválido' })
            }


            if (isNaN(numero_documento)) {
                return res.status(404).json({ message: 'El número de documento no puede contener letras' })
            }
            if (isNaN(numero_telefono)) {
                return res.status(400).json({ message: 'El número de teléfono no puede contener letras' })
            }

            if (!/^[a-zA-Z]+$/.test(primer_nombre)) {
                return res.status(400).json({ message: 'El primer nombre no puede contener números.' });
            }

            // if (!/^[a-zA-Z]+$/.test(segundo_nombre)) {
            //     return res.status(400).json({ message: 'El segundo nombre no puede contener números.' });
            // }

            if (!/^[a-zA-Z]+$/.test(primer_apellido)) {
                return res.status(400).json({ message: 'El primer apellido no puede contener números.' });
            }

            // if (!/^[a-zA-Z]+$/.test(segundo_apellido)) {
            //     return res.status(400).json({ message: 'El segundo apellido no puede contener números.' });
            // }



            if (preferencia_contacto !== 'phone' && preferencia_contacto !== 'email') {
                return res.status(400).json({ message: 'La preferencia de contacto no es válida.' });
            }



            // se guardan los datos en el campo datos_de_usuario del modelo
            userFound.datos_de_usuario = {
                primer_nombre: primer_nombre,
                segundo_nombre: segundo_nombre_validate,
                primer_apellido: primer_apellido,
                segundo_apellido: segundo_apellido_validate,
                sexo: sexo,
                fecha_nacimiento: fecha_nacimiento,
                numero_telefono: numero_telefono,
                tipo_documento: tipo_documento,
                numero_documento: numero_documento,
                preferencia_contacto: preferencia_contacto,
                municipio: municipio
            }
            // se guardan los datos en la BD
            await userFound.save();

        }







        return res.status(201).json({ message: "Datos agregados correctamente" })

    } catch (error) {
        res.status(400).json({ message: error.message });

        console.log(error)
    }
}