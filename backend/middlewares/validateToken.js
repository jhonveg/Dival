import jwt from 'jsonwebtoken'
import { token_secret } from '../config.js'

export const authRequired =  (req,res,next) => {

    const {token} = req.cookies 
    if(!token) return res.status(401).json({message: "No has iniciado sesión"})
    jwt.verify(token, process.env.TOKEN_SECRET, (err,user) => {

        if(err) return res.status(401).json({message: "Token invalido"})

            req.user = user

        next();
    })
}