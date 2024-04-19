import mysql from 'mysql';
import dotenv from 'dotenv';

// Cargar variable de entorno
dotenv.config();

// Seteo de variables de entorno 
const { BD_HOST, BD_USER, BD_PWD, BD_NAME } = process.env;

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: BD_HOST,
    user: BD_USER,
    password: BD_PWD,
    database: BD_NAME
};

// Iniciar conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Exportar la conexión para que esté disponible para otros módulos
export default connection;