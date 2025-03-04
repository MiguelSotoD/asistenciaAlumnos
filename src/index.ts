import { loadEnv } from "./config/env";
loadEnv();
import express from "express";
import cors from 'cors'
import authRoutas from "./routes/session";
import rutaGrupo from "./routes/groups";
import rutaMateria from "./routes/materias";
import rutaAlumno from "./routes/alumnos"
import rutaClase from "./routes/clases"
import rutaAsistencia from "./routes/asistencia"
import { errorHandler } from "./middleware/celebrate";
import { errors } from "celebrate";
import { testConnection } from "./config/configBD";
import swaggerDocs  from "./utils/swagger";
import logger from "./utils/logger";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Rutas prinicpales de la aplicacion
app.use("/api/auth", authRoutas);
app.use("/api/grupo", rutaGrupo); //Ruta para endpoins de grupos
app.use("/api/materia", rutaMateria); //Ruta para endpoins de Materias
app.use("/api/alumno", rutaAlumno) //Ruta para endoints de Alumnos
app.use("/api/sesion", rutaClase) //Ruta para endoints de Alumnos
app.use("/api/asistencia", rutaAsistencia)
app.use(errors());
app.use(errorHandler);
swaggerDocs(app);

// Funcion para inicar el servidor en el puerto establecido
const startServerExpress = async () => {
  await testConnection();
  try {
   app.listen(process.env.PORT, () => {
      logger.info({message: `Servidor listo en el puerto: ${process.env.PORT}`})
      logger.info({message: `Documentacion de Apis con Swagger en http://localhost:${process.env.PORT}/api-docs`});
    });

  } catch (error) {
    logger.error("Error al conectar el servidor", error)
   
    process.exit(1); //Terminar el proceso
  }
};

//Iniciar el servidor y configuraciones iniciales
startServerExpress();

