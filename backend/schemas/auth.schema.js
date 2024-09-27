import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string({ required_error: "Username es requerido" }),
    email: z.string({ required_error: "Email es requerido" }).email({ message:  'Email es inválido' }),
    password: z.string({ required_error: "La contraseña es requerida" }).min(6, { message: 'La contraseña debe ser de al menos 6 caracteres'  })

})
export const loginSchema = z.object({
    email: z.string({ required_error: "Email es requerido" }).email({ message:  "Email es inválido" }),
    password: z.string({ required_error: "Contraseña es requerida" }).min(6, { message:  "La contraseña debe ser de al menos 6 caracteres" })

})

export const updateEmailSchema = z.object({
    email: z.string({required_error: "Email requerido para actualizar"}).email({ message:  'El correo electrónico ingresado no es válido' }),

})


export const updateUsernameSchema = z.object({
    username: z.string({required_error: "Username requerido para actualizar"}).min(6, {message: "El username debe contener al menos 6 caracteres"}).max(10, {message: "El nombre de usuario no puede tener más de 10 caracteres"}),
    
})

export const updatePasswordSchema = z.object({
    password: z.string({ required_error: "Contraseña es requerida" }).min(6, { message:  "La contraseña debe ser de al menos 6 caracteres" }),

})
