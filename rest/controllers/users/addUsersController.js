import addUsersModels from '../../models/users/addUsersModels.js';

const AddUsersController = {
  async addUser(req, res) {
    try {
      const { name, email } = req.body;

      // Validar que los campos no estén vacíos
      if (!email || !name) {
          res.status(400).send({ error: true, msg: "Mandatory params are missing" });
          return;
      }

      // Crea un nuevo usuario utilizando el modelo
      const newUser = await addUsersModels.createUsers({ name, email });

      // Envía una respuesta con el usuario creado
      res.status(201).send({ msg: "New user created", newUser });
      return
    } catch (error) {
      res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
      return;
    }
  }
};

export default AddUsersController;