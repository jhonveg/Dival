import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';
import authTasks from './routes/task.routes.js'
import coursesRoutes from '../backend/routes/courses.routes.js'
import inscripcionRoutes from '../backend/routes/inscripcion.routes.js'
import cors from 'cors'
import imagesRoutes from './routes/images.routes.js'
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(cookieParser())
app.use(express.json())
app.use(morgan("dev"));
app.use("/api", authRoutes)
app.use("/api", authTasks)
app.use("/api", coursesRoutes)
app.use("/api", inscripcionRoutes)
app.use("/api", imagesRoutes)


export default app