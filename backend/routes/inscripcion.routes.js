import { Router } from "express";
import { aceptarInscripcion, obtenerInscripcionUsuario, obtenerInscritos, obtenerPreInscripciones, obtenerPreinscripcionUsuario, rechazarInscripcion, registerCourse } from "../controllers/inscripcion.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { checkRole } from "../middlewares/checkRoleAuth.js";

const router = Router();


router.post('/inscripcion/:id', authRequired, registerCourse)
router.get('/inscripcion/', authRequired, obtenerPreInscripciones)
router.get('/inscritos/', authRequired, obtenerInscritos)
router.get('/pre/inscripcion/:userId', authRequired, obtenerPreinscripcionUsuario)
router.get('/inscripcion/:userId', authRequired, obtenerInscripcionUsuario)
router.delete('/inscripcion/:id', authRequired, rechazarInscripcion)
router.put('/inscripcion/:id', authRequired, checkRole(["admin"]), aceptarInscripcion)



export default router