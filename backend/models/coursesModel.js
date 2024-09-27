import mongoose  from "mongoose";
import { date } from "zod";


const coursesSchema = new mongoose.Schema({

    nombreCurso: {
        type: 'string',
        required: true
    },

    descripcionCurso: {
        type: 'string',
        required: true 
    },

    cuposDisponibles: {
        type: 'Number',
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },

    imagen: {

        public_id: "String",
        secure_url: 'String'
        
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    

    
    isDelete: {
        type: Boolean,
        default: false
    }


})

export default mongoose.model('Curso', coursesSchema)