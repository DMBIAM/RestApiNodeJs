import pool from '../../middleware/connection_bd.mjs';

const updateEventsModels = {
    updateEvent(idEvent, newData) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, connection) => {
                if (error) {
                    reject({ status: 500, message: 'Internal Server Error connection, try again later' });
                } else {                    
                    const checkQuery = 'SELECT id FROM events WHERE id = ?';
                    connection.query(checkQuery, [idEvent], (error, results) => {
                        console.log(idEvent);
                        if (error) {
                            connection.release();
                            reject({ status: 500, message: 'Internal Server Error, try again later' });
                        } else if (results.length > 0) {
                            if (newData.city) {
                                const checkCityQuery = 'SELECT id FROM city WHERE id = ?';
                                connection.query(checkCityQuery, [newData.city], (error, cityResults) => {
                                    if (error) {
                                        connection.release();
                                        reject({ status: 500, message: 'Internal Server Error, try again later' });
                                    } else if (cityResults.length === 0) {
                                        connection.release();
                                        reject({ status: 400, message: 'The city ID entered does not exist' });
                                    } else {
                                        updateEvent(connection, idEvent, newData, resolve, reject);
                                    }
                                });
                            } else {
                                updateEvent(connection, idEvent, newData, resolve, reject);
                            }
                        } else {
                            connection.release();
                            reject({ status: 404, message: 'Event not found' });
                        }
                    });
                }
            });
        });
    }
};

function updateEvent(connection, idEvent, newData, resolve, reject) {
    let updateFields = [];
    let updateValues = [];
    if (newData.name) {
        updateFields.push('name = ?');
        updateValues.push(newData.name);
    }
    if (newData.city) {
        updateFields.push('id_city = ?');
        updateValues.push(newData.city);
    }

    // Verificar que al menos un campo de actualización esté presente
    if (updateFields.length === 0) {
        connection.release();
        reject({ status: 400, message: "No update fields provided" });
        return;
    }

    const updateQuery = `UPDATE events SET ${updateFields.join(', ')} WHERE id = ?`;
    updateValues.push(idEvent);
    
    connection.query(updateQuery, updateValues, (error, results) => {
        connection.release();
        if (error) {
            reject({ status: 500, message: 'Internal Server Error, try again later' });
        } else {
            resolve({ status: 200, message: 'Event updated successfully', data: results });
        }
    });
}

export default updateEventsModels;
