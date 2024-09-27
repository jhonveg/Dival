import {z} from 'zod'


export const createCourseSchema = z.object ({

    nombreCurso: z.string({
        required_error: 'El nombre del curso es requerido'
    }),

    descripcionCurso: z.string({
        required_error: 'La descripcion del curso es requerida'
    }),

    cuposDisponibles: z.number({
        required_error: 'Los cupos son requeridos'
    }),

    date: z.string().datetime().optional()


})