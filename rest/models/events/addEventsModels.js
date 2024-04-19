import pool from '../../middleware/connection_bd.mjs';

const addEventsModels = {
    async createEvent({ name, city }) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const checkCityQuery = 'SELECT * FROM city WHERE id = ?';
                    connection.query(checkCityQuery, [city], (error, results) => {
                        if (error) {
                            connection.release();
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else if (results.length === 0) {
                            connection.release();
                            reject({ status: 400, message: 'The city ID entered does not exist' });
                        } else {
                            const insertEventQuery = 'INSERT INTO events (name, id_city) VALUES (?, ?)';
                            const values = [name, city];
                            connection.query(insertEventQuery, values, (error, results) => {
                                connection.release();
                                if (error) {
                                    reject({ status: 500, message: 'Internal Server Error, try again later' });
                                } else {
                                    resolve({ status: 201, message: 'Event created successfully', data: { id: results.insertId, name, city } });
                                }
                            });
                        }
                    });
                }
            });
        });
    },      
};

export default addEventsModels;
