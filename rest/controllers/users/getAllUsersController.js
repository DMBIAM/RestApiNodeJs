import getAllUsersModels from '../../models/users/getAllUsersModels.js';

const GetAllUsersController = {
  async getAllUser(req, res) {
    try {

      // Crea un nuevo usuario utilizando el modelo
      const users = await getAllUsersModels.getAllUsers();

      // Envía una respuesta con el listado de usuarios registrados
      res.status(200).send({ msg: "Users retrieved", users });
      return
    } catch (error) {
      res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
      return;
    }
  }
};

export default GetAllUsersController;