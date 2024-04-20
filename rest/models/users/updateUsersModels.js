import pool from '../../middleware/connection_bd.mjs';

const updateUsersModels = {
    updateUser(idUser, newData) {
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
                            let updateFields = [];
                            let updateValues = [];
                            if (newData.name) {
                                updateFields.push('name = ?');
                                updateValues.push(newData.name);
                            }
                            if (newData.email) {
                                updateFields.push('email = ?');
                                updateValues.push(newData.email);
                            }

                            // Verifica que al menos un campo de actualización esté presente
                            if (updateFields.length === 0) {
                                connection.release();
                                reject({ status: 400, message: "No update fields provided" });
                                return;
                            }

                            const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
                            updateValues.push(idUser);
                            
                            connection.query(updateQuery, updateValues, (error, results) => {
                                connection.release();
                                if (error) {
                                    reject({ status: 500, message: 'Internal Server Error, try again later' });
                                } else {
                                    resolve({ status: 200, message: 'User updated successfully', data: results });
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

export default updateUsersModels;
