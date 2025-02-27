import { loadEnv } from "./config/env";
loadEnv();
import express from "express";
import cors from 'cors'
import authRoutas from "./routes/session";
import rutaGrupo from "./routes/groups";
import { errorHandler } from "./middleware/celebrate";
import { errors } from "celebrate";

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

// Rutas prinicpales de la aplicacion
app.use("/api/auth", authRoutas);
app.use("/api/grupo", rutaGrupo); //Ruta para endpoins de grupos

app.use(errors());
app.use(errorHandler);

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

