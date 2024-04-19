import pool from '../../middleware/connection_bd.mjs';

const getOneUsersModels = {
    getOneUser(idUser) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {                    
                    const query = 'SELECT * FROM users WHERE id = ?';
                    connection.query(query, [idUser], (error, results) => {
                        connection.release();
                        if (error) {
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else if (results.length > 0) {
                            resolve({ status: 200, message: 'User retrieved successfully', data: results[0] });
                        } else {
                            reject({ status: 404, message: 'User not found' });
                        }
                    });
                }
            });
        });
    }
};

export default getOneUsersModels;

