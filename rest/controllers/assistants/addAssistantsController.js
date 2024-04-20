import addAssistantsModels from '../../models/assistants/addAssistantsModels.js';

const AddAssistantsController = {
  async addAssistant(req, res) {
    try {
      const { id_user, id_event } = req.body;

      // Validar que los campos no estén vacíos
      if (!id_user || !id_event) {
          res.status(400).send({ error: true, msg: "Mandatory params are missing" });
          return;
      }

      // Agregar un nuevo asistente utilizando el modelo
      const newAssistant = await addAssistantsModels.createAssistant({ id_user, id_event });

      // Envía una respuesta con el asistente creado
      res.status(201).send({ msg: "New assistant added", newAssistant });
      return;
    } catch (error) {
      if (error.status === 400) {
          res.status(400).send({ error: true, msg: error.message });
      } else {
          res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
      }
      return;
    }
  }
};

export default AddAssistantsController;
