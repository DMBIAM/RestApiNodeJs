import connection from '../../middleware/connection_bd.mjs';
import { closeConnection, openConnection } from '../../middleware/dbUtils.mjs';

const getAllUsersModels = {
    async getAllUsers() {
        openConnection();
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users';
            connection.query(query, (error, results) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error, try again later' }); 
                } else {
                    resolve({ status: 200, message: 'Users retrieved successfully', data: results });
                }
                closeConnection();
            });
        });
    },  
}

export default getAllUsersModels;
