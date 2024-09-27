import { Login, Logout, Profile, Register, deleteUser, formInfoUser, getUserById, getUsers, updateEmail, updateUserSchema, updateUsername, updateUserPassword } from "../controllers/auth.controllers.js";
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema, updateEmailSchema, updatePasswordSchema, updateUsernameSchema } from "../schemas/auth.schema.js";
import { verifyToken } from "../controllers/auth.controllers.js";
import { checkRole } from "../middlewares/checkRoleAuth.js";
import fileUpload from "express-fileupload";
import { checkUserPassword, checkUserPasswordToPassword} from "../middlewares/CheckPassword.js";

const router = Router();
const fileUploaded = fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
})

router.get("/home", () => {
    res.send("Express Server")
})
router.post("/register", fileUploaded, validateSchema(registerSchema), Register)
router.post("/login", validateSchema(loginSchema), Login)
router.post("/logout", Logout)
router.get("/verify", verifyToken)
router.get("/profile", authRequired, Profile)
router.put("/user/email/:id", authRequired, checkUserPassword, validateSchema(updateEmailSchema), updateEmail)
router.put("/user/password", authRequired, checkUserPasswordToPassword, validateSchema(updatePasswordSchema),  updateUserPassword)
router.put("/user/username/:id", authRequired,validateSchema(updateUsernameSchema), updateUsername)
router.delete("/admin/user/:id", authRequired, checkRole(['admin']), deleteUser)
router.put("/admin/user/:id", authRequired, checkRole(['admin']), updateUserSchema)
router.get("/admin/user", authRequired, checkRole(['admin']
), getUsers)
router.get("/admin/user/:id", authRequired, checkRole(['admin']
), getUserById)
router.post("/user/info", authRequired, formInfoUser)

export default router