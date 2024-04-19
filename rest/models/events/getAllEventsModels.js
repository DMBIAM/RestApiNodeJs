import pool from '../../middleware/connection_bd.mjs';

const getAllEventsModels = {
    async getAllEvent() {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const query = 'SELECT * FROM events';
                    connection.query(query, (error, results) => {
                        connection.release();
                        if (error) {
                            reject({ status: 500, message: 'Internal Server Error, try again later' }); 
                        } else {
                            resolve({ status: 200, message: 'Events retrieved successfully', data: results });
                        }
                    });
                }   
            });         
        });
    },  
}

export default getAllEventsModels;
