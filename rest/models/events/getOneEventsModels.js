import pool from '../../middleware/connection_bd.mjs';

const getOneEventsModels = {
    getOneEvent(idEvent) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {                    
                    const query = 'SELECT * FROM events WHERE id = ?';
                    connection.query(query, [idEvent], (error, results) => {
                        connection.release();
                        if (error) {
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else if (results.length > 0) {
                            resolve({ status: 200, message: 'Event retrieved successfully', data: results[0] });
                        } else {
                            reject({ status: 404, message: 'Event not found' });
                        }
                    });
                }
            });
        });
    }
};

export default getOneEventsModels;

