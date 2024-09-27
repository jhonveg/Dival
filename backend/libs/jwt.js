import jwt from 'jsonwebtoken'
import { token_secret } from '../config.js'

export default function AccessToken  (payload){

    return new Promise ((resolve,reject)=> {
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,

            {expiresIn: "1d"},

            (err, token ) =>{

                if(err) reject(err);
                resolve(token);
            }
        ) 


    }
    ) 


    
}