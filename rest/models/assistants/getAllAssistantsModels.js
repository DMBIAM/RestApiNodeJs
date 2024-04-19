import pool from '../../middleware/connection_bd.mjs';

const getAllAssistantsModels = {
    async getAllAssistant() {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const query = `
                        SELECT assistants.id, 
                               users.name AS user_name,
                               users.email AS user_email,
                               events.name AS event_name,
                               city.name AS city_name,
                               country.name AS country_name,
                               assistants.created_at,
                               assistants.updated_at
                        FROM assistants
                        JOIN users ON assistants.id_user = users.id
                        JOIN events ON assistants.id_event = events.id
                        JOIN city ON events.id_city = city.id
                        JOIN country ON city.id_country = country.id;
                    `;
                    connection.query(query, (error, results) => {
                        connection.release();
                        if (error) {
                            reject({ status: 500, message: 'Internal Server Error, try again later' }); 
                        } else {
                            resolve({ status: 200, message: 'Assistants retrieved successfully', data: results });
                        }
                    });
                }   
            });         
        });
    },  
}

export default getAllAssistantsModels;
