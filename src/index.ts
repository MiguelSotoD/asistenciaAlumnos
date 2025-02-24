import { loadEnv } from "./config/env";
loadEnv();
import express from "express";
import cors from 'cors';
// servidor de express
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true, 
    methods: ["GET", "POST", "PUT",],
  })
);

// Middleware del servidor
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Funcion para inicar el servidor en el puerto establecido
const startServerExpress = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log("Servidor listo en el puerto: ",process.env.PORT);
    });

  } catch (error) {
    console.error("Error al conectar el servidor", error);
    process.exit(1); //Terminar el proceso
  }
};

//Iniciar el servidor y configuraciones iniciales
startServerExpress();

