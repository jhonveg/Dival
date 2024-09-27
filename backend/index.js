import app from "./app.js";
import dbConnect from "./db.js";
import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {console.log(`SERVIDOR FUNCIONANDO EN http://localhost:${PORT} `)})
dbConnect();