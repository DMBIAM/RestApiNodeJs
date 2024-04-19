import connection from './connection_bd.mjs';

// Función para cerrar la conexión a la base de datos
export function closeConnection() {
    connection.end((error) => {
        if (error) {
            console.error('Error closing database connection:', error);
        } else {
            console.log('Database connection closed successfully');
        }
    });
}

// Función par abrir la conexión a la base de datos
export function openConnection() {
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected to BD!");
    });
};