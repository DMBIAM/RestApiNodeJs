import updateUsersModels from '../../models/users/updateUsersModels.js';

const UpdateUsersController = {
  async updateUser(req, res) {
    try {      
        const idUser = req.body.id;
        const { name, email } = req.body;

        if (!name && !email) {
          return res.status(400).send({ error: true, msg: "At least one of the fields 'name' or 'email' must be provided for update" });
        }

        const userData = await updateUsersModels.updateUser(idUser, { name, email });
        res.status(200).send({ msg: "User updated successfully", userData });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).send({ error: false, msg: "User not found" });
        } else {
            res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
        }
    }
  }
};

export default UpdateUsersController;
