import connection from '../../middleware/connection_bd.mjs';
import { closeConnection, openConnection } from '../../middleware/dbUtils.mjs';

const addUsersModels = {
    async createUsers({ name, email }) {
        openConnection();
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
            const values = [name, email];            
            connection.query(query, values, (error, results) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error' }); 
                } else {
                    resolve({ status: 201, message: 'User created successfully', data: { id: results.insertId, name, email } });
                }
            });
            closeConnection();
        });
    },
      
}

export default addUsersModels;