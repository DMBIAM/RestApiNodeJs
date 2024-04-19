import mysql from 'mysql';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Obtener variables de entorno
const { BD_HOST, BD_USER, BD_PWD, BD_NAME, CONNECTION_LIMIT } = process.env;

// Configuración de la conexión a la base de datos
const pool = mysql.createPool({
    connectionLimit: CONNECTION_LIMIT,
    host: BD_HOST,
    user: BD_USER,
    password: BD_PWD,
    database: BD_NAME
});

// Exportar el pool de conexiones para que esté disponible para otros módulos
export default pool;