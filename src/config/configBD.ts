import { Pool } from 'pg';
import logger from '../utils/logger';

// Conexion a la base de datos de Postgres
const conexionDB = new  Pool ({ 
    user : process.env.USERPG , 
    password : process.env.PASSWORDPG, 
    host : process.env.HOSTPG, 
    port : process.env.PORTPG, 
    database: process.env.DATABASEPG
   }); 

// TEST DE CONEXION A LA BASE DE DATOS
const testConnection = async () => {
    try {
      await conexionDB.connect();
      logger.info("Conexión a PostgreSQL exitosa");
    } catch (err) {
      logger.error("Error al conectar a la base de datos", err);
      process.exit(1);
    }
  };
  
export { conexionDB, testConnection };
