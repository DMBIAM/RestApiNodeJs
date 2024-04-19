import pool from '../../middleware/connection_bd.mjs';

const deleteUsersModels = {
    deleteUser(idUser) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {                    
                    const checkQuery = 'SELECT id FROM users WHERE id = ?';
                    connection.query(checkQuery, [idUser], (error, results) => {
                        if (error) {
                            connection.release();
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else if (results.length > 0) {
                            const deleteQuery = 'DELETE FROM users WHERE id = ?';
                            connection.query(deleteQuery, [idUser], (error, results) => {
                                connection.release();
                                if (error) {
                                    reject({ status: 500, message: 'Internal Server Error, try again later' });
                                } else {
                                    resolve({ status: 200, message: 'User deleted successfully', data: results });
                                }
                            });
                        } else {
                            connection.release();
                            reject({ status: 404, message: 'User not found' });
                        }
                    });
                }
            });
        });
    }
};

export default deleteUsersModels;
