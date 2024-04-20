import pool from '../../middleware/connection_bd.mjs';

const AttendancePerDayEventsModels = {
    async calculateAttendancePerDayEvents(eventsList) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {
                    const eventIds = eventsList.map(event => event.id_event);
                    const checkEventQuery = 'SELECT id FROM events WHERE id IN (?)';
                    connection.query(checkEventQuery, [eventIds], (error, results) => {
                        if (error) {
                            connection.release();
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else {
                            const existingEventIds = results.map(result => result.id);
                            const nonExistingEventIds = eventIds.filter(id => !existingEventIds.includes(id));
                            if (nonExistingEventIds.length > 0) {
                                connection.release();
                                reject({ status: 404, message: `Event(s) with ID(s) ${nonExistingEventIds.join(', ')} do(es) not exist, remember to only send events that exist. ` });
                            } else {
                                const queries = eventsList.map(event => {
                                    const date = event.date;
                                    const id_event = event.id_event;
                                    return new Promise((resolve, reject) => {
                                        const query = `
                                            SELECT e.id AS event_id,
                                            e.name AS event_name,
                                            DATE_FORMAT(e.date, '%Y-%m-%d') AS date,
                                            DAYNAME(e.date) AS day_of_week,
                                            COUNT(*) AS attendance_count
                                            FROM assistants a
                                            INNER JOIN events e ON a.id_event = e.id
                                            WHERE DATE_FORMAT(e.date, '%Y-%m-%d') = ? AND a.id_event = ?
                                            GROUP BY event_id, event_name, date, day_of_week
                                        `;
                                        connection.query(query, [date, id_event], (error, results) => {
                                            if (error) {
                                                reject(error);
                                            } else {
                                                resolve(results[0]);
                                            }
                                        });
                                    });
                                });

                                Promise.all(queries).then(results => {
                                    connection.release();
                                    resolve(results);
                                }).catch(error => {
                                    connection.release();
                                    reject({ status: 500, message: 'Internal Server Error, try again later' });
                                });
                            }
                        }
                    });
                }
            });
        });
    }
};

export default AttendancePerDayEventsModels;
