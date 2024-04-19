import addUsersModels from '../../models/users/addUsersModels.js';
import boom from 'boom';

const AddUsersController = {
  async addUser(req, res) {
    try {
      const { name, email } = req.body;
     
      // Verifica si se proporcionan los datos necesarios
      if (!name || !email) {
        return res.status(400).send({ error: 'Name and email are required' });
      }

      // Crea un nuevo usuario utilizando el modelo
      const newUser = await addUsersModels.createUsers({ name, email });

      // Envía una respuesta con el usuario creado
      return newUser;
    } catch (error) {
      console.error('Error adding user:', error);
      return error;
    }
  }
};

export default AddUsersController;