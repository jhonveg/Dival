import {createCourseImage, createImage, updateCourseImage, updateImage} from '../controllers/images.controllers.js'
import Router from 'express'
import { authRequired } from '../middlewares/validateToken.js';
import { fileUploaded } from '../libs/fileUploaded.js';
import { checkRole } from '../middlewares/checkRoleAuth.js';
const router = Router();



router.post('/image', authRequired, fileUploaded, createImage)
router.put('/image', authRequired, fileUploaded, updateImage)
router.post('/image/course/:id', authRequired, fileUploaded,  checkRole(["admin"]), createCourseImage)
router.put('/image/course/:id', authRequired, fileUploaded, checkRole(["admin"]), updateCourseImage )

export default router;
