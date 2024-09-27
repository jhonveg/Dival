import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export const checkUserPassword =  async (req,res,next) => {
    try {

        const {password} = req.body 
      
        const userFound = await User.findById(req.user.id) 
        if(!userFound) {return res.status(404).json({message: "No se encontró al usuario"})}
       
        let isSamePassword
       
        if(password) {
            isSamePassword = await bcrypt.compare(password, userFound.password);
        }
        else {
            return res.status(404).json({message: "Para hacer este cambio debes ingresar la contraseña actual de tu cuenta"})
        }

        if(isSamePassword){
            next();
        }
        
        else {
            return res.status(401).json({message: "Contraseña incorrecta"})
        }
        
    } catch (error) {
        console.log(error)
    }
}



export const checkUserPasswordToPassword =  async (req,res,next) => {
    try {

        const {current_password} = req.body 
      
        const userFound = await User.findById(req.user.id) 
        if(!userFound) {return res.status(404).json({message: "No se encontró al usuario"})}
       
        let isSamePassword
       
        if(current_password) {
            isSamePassword = await bcrypt.compare(current_password, userFound.password);
        }
        else {
            return res.status(404).json({message: "Para hacer este cambio debes ingresar la contraseña actual de tu cuenta"})
        }

        if(isSamePassword){
            next();
        }
        
        else {
            return res.status(401).json({message: "Contraseña incorrecta"})
        }
        
    } catch (error) {
        console.log(error)
    }
}