import mongoose from "mongoose";

const dbConnect = async (req, res) => {

    try {

        await mongoose.connect(process.env.MONGODB_URI, {

            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB CONECTADA")


    } catch (error) {

        throw error;
     

    }

}


mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado de MongoDB');
  });
  
  // Manejar cierre de la aplicación
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Conexión cerrada debido a la terminación de la aplicación');
    process.exit(0);
  });

export default dbConnect