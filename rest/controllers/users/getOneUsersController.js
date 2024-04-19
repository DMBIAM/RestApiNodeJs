import getOneUsersModels from '../../models/users/getOneUsersModels.js';

const GetOneUsersController = {
  async getOneUser(req, res) {
    try {      
        const idUser = req.params.id;
        const userData = await getOneUsersModels.getOneUser(idUser);
        // Envía una respuesta con el usuario buscado
        res.status(200).send({ msg: "Users retrieved", userData });
        return
    } catch (error) {
        if (error.status === 404) {
            res.status(404).send({ error: false, msg: "User not found" });
          } else {
            console.log(error);
            res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
          }
        return;
    }
  }
};

export default GetOneUsersController;