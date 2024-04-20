import pool from '../../middleware/connection_bd.mjs';

const searchNearestEventsModels = {
  searchNearestEvent(latitude, longitude, limit = 1) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
        if (error) {
            reject({ status: 500, message: 'Internal Server Error connection, try again later' });
        } else {
            const query = `
                SELECT events.id, 
                    events.name, 
                    city.name AS city_name,
                    events.location,
                    ST_Distance_Sphere(events.location, ST_GeomFromText('POINT(${latitude} ${longitude} )')) AS distance
                FROM events
                JOIN city ON events.id_city = city.id
                ORDER BY distance
                LIMIT ${limit}
            `;
            connection.query(query, (error, results) => {
                connection.release();
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error, try again later' });
                } else if (results.length > 0) {
                    resolve({ status: 200, message: 'Nearest event retrieved successfully', data: results });
                } else {
                    reject({ status: 404, message: 'Nearest event not found' });
                }
            });
        }
      });
    });
  }
};

export default searchNearestEventsModels;
