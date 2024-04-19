import pool from '../../middleware/connection_bd.mjs';

const addEventsModels = {
    async createEvent({ name, city }) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const query = 'INSERT INTO events (name, id_city) VALUES (?, ?)';
                    const values = [name, city];            
                    connection.query(query, values, (error, results) => {
                        connection.release();
                        if (error) {
                            reject({ status: 500, message: 'Internal Server Error, try again later' }); 
                        } else {
                            resolve({ status: 201, message: 'Event created successfully', data: { id: results.insertId, name, city } });
                        }
                    });
                }
            });
        });
    },
      
}

export default addEventsModels;