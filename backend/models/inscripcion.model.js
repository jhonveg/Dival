import mongoose from "mongoose";

const inscripcionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    courseId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Curso',
        required: true

    },

    dateRegistered: {
        type: Date,
        default: Date.now

    },
    pre_inscrito: {
        type: Boolean,
        default: false
    },
    

    inscrito: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("Inscripcion", inscripcionSchema)