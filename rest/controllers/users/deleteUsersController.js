import deleteUsersModels from '../../models/users/deleteUsersModels.js';

const DeleteUsersController = {
  async deleteUser(req, res) {
    try {      
        const idUser = req.body.id;
        const userData = await deleteUsersModels.deleteUser(idUser);
        res.status(200).send({ msg: "User deleted successfully", userData });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).send({ error: false, msg: "User not found" });
        } else {
            console.error(error);
            res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
        }
    }
  }
};

export default DeleteUsersController;
