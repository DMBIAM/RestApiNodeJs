import pool from '../../middleware/connection_bd.mjs';

const searchAssistantsModels = {
    async searchAssistants(params) {
        const {
            user_name,
            user_id,
            user_email,
            event_id,
            event_name,
            city_id,
            city_name,
            country_id,
            country_name
        } = params;

        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const conditions = [];
                    
                    if (user_name) conditions.push(`users.name = '${user_name}'`);
                    if (user_id) conditions.push(`users.id = ${user_id}`);
                    if (user_email) conditions.push(`users.email = '${user_email}'`);
                    if (event_id) conditions.push(`events.id = '${event_id}'`);
                    if (event_name) conditions.push(`events.name = '${event_name}'`);
                    if (city_id) conditions.push(`city.id = ${city_id}`);
                    if (city_name) conditions.push(`city.name = '${city_name}'`);
                    if (country_id) conditions.push(`country.id = ${country_id}`);
                    if (country_name) conditions.push(`country.name = '${country_name}'`);

                    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

                    const query = `
                        SELECT assistants.id, 
                               users.name AS user_name,
                               users.email AS user_email,
                               events.id AS event_id,
                               events.name AS event_name,
                               city.name AS city_name,
                               country.name AS country_name,
                               assistants.created_at,
                               assistants.updated_at
                        FROM assistants
                        JOIN users ON assistants.id_user = users.id
                        JOIN events ON assistants.id_event = events.id
                        JOIN city ON events.id_city = city.id
                        JOIN country ON city.id_country = country.id
                        ${whereClause};
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
    }
};

export default searchAssistantsModels;
