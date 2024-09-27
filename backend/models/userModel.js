import mongoose from 'mongoose';
import { boolean } from 'zod';

const userModel = new mongoose.Schema({

  username: {
    type: "String",
    required: true,
    trim: true

  },

  email: {

    type: "String",
    required: true,
    unique: true,
    trim: true

  },

  password: {
    type: "String",
    required: true,

  },


  rol: {
    type: "String",
    default: "user"
  },

  avatar: {
    public_id: "String",
    secure_url: "String",
    original_filename: "String"
  },

  isDelete: {
    type: Boolean,
    default: false
  },

  datos_de_usuario: [
    {
      primer_nombre: {
        type: String,
        default: null,
      },
      segundo_nombre: {
        type: String,
        default: null,
      },
      primer_apellido: {
        type: String,
        default: null,
      },
      segundo_apellido: {
        type: String,
        default: null,
      },
      sexo: {
        type: String,
        default: null,
      },
      fecha_nacimiento: {
        type: Date,
      },
      numero_telefono: {
        type: String,
        default: null,
      },
      tipo_documento: {
        type: String,
        default: null,
      },
      numero_documento: {
        type: String,
        default: null,
      },
      preferencia_contacto: {
        type: String,
        default: null,
      },
      municipio: {
        type: String,
        default: null,
      },

      direccion: {
        type: String,
        default: null,
      }
    },

  ],

  pre_inscrito: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Inscripcion',
    }
  ],

  inscrito: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inscripcion'
    }
  ]


}, { timestamps: true })

export default mongoose.model("User", userModel)