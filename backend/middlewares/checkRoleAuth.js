import userModel from "../models/userModel.js";

export const checkRole = (roles) => async (req,res,next) => {


    try {


     
       const userData = await userModel.findById(req.user.id)
       if(!userData) res.status(400).json({message: "Usuario no encontrado"});

        if(userData && [].concat(roles).includes(userData.rol)){
            next()
     } 
     else{
         res.status(409)
            res.send({error: 'No cuentas con permisos de administrador'})
     }


        


 
    
    
     } catch (error) {

        console.log(error)
        res.status(409)
            res.send(error)
    }

}


