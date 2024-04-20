import pool from '../../middleware/connection_bd.mjs';

const addAssistantsModels = {
    async createAssistant({ id_user, id_event }) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const checkUserQuery = 'SELECT id FROM users WHERE id = ?';
                    connection.query(checkUserQuery, [id_user], (error, userResults) => {
                        if (error) {
                            connection.release();
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else if (userResults.length === 0) {
                            connection.release();
                            reject({ status: 400, message: 'The user ID entered does not exist' });
                        } else {
                            const checkEventQuery = 'SELECT id FROM events WHERE id = ?';
                            connection.query(checkEventQuery, [id_event], (error, eventResults) => {
                                if (error) {
                                    connection.release();
                                    reject({ status: 500, message: 'Internal Server Error, try again later' });
                                } else if (eventResults.length === 0) {
                                    connection.release();
                                    reject({ status: 400, message: 'The event ID entered does not exist' });
                                } else {
                                    const insertAssistantQuery = 'INSERT INTO assistants (id_user, id_event) VALUES (?, ?)';
                                    const values = [id_user, id_event];
                                    connection.query(insertAssistantQuery, values, (error, results) => {
                                        connection.release();
                                        if (error) {
                                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                                        } else {
                                            resolve({ status: 201, message: 'Assistant created successfully', data: { id: results.insertId, id_user, id_event } });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    },      
};

export default addAssistantsModels;
