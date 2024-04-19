import pool from '../../middleware/connection_bd.mjs';

const addUsersModels = {
    async createUsers({ name, email }) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
                    const values = [name, email];            
                    connection.query(query, values, (error, results) => {
                        connection.release();
                        if (error) {
                            reject({ status: 500, message: 'Internal Server Error, try again later' }); 
                        } else {
                            resolve({ status: 201, message: 'User created successfully', data: { id: results.insertId, name, email } });
                        }
                    });
                }
            });
        });
    },
      
}

export default addUsersModels;