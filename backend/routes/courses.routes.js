import { Router } from "express";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse } from "../controllers/courses.controllers.js";
import { authRequired } from "../middlewares/validateToken.js";
import { checkRole } from "../middlewares/checkRoleAuth.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCourseSchema } from "../schemas/courses.schema.js";


const router = Router();


router.post('/courses', authRequired, checkRole(['admin']
), validateSchema(createCourseSchema), createCourse)
router.get('/courses/:id', authRequired, getCourse)
router.get('/courses',  getCourses)
router.put('/courses/:id', authRequired, checkRole(['admin']
), updateCourse)
router.delete('/courses/:id', authRequired, checkRole(['admin']
),  deleteCourse)

export default router
