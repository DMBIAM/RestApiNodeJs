import pool from '../../middleware/connection_bd.mjs';

const deleteEventsModels = {
    deleteEvent(idEvent) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {                    
                    const checkQuery = 'SELECT id FROM events WHERE id = ?';
                    connection.query(checkQuery, [idEvent], (error, results) => {
                        if (error) {
                            connection.release();
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else if (results.length > 0) {
                            const deleteQuery = 'DELETE FROM events WHERE id = ?';
                            connection.query(deleteQuery, [idEvent], (error, results) => {
                                connection.release();
                                if (error) {
                                    reject({ status: 500, message: 'Internal Server Error, try again later' });
                                } else {
                                    resolve({ status: 200, message: 'Event deleted successfully', data: results });
                                }
                            });
                        } else {
                            connection.release();
                            reject({ status: 404, message: 'Event not found' });
                        }
                    });
                }
            });
        });
    }
};

export default deleteEventsModels;
