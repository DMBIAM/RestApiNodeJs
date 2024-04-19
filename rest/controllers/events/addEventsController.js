import addEventsModels from '../../models/events/addEventsModels.js';

const AddEventsController = {
  async addEvent(req, res) {
    try {
      const { name, city } = req.body;

      // Validar que los campos no estén vacíos
      if (!city || !name) {
          res.status(400).send({ error: true, msg: "Mandatory params are missing" });
          return;
      }

      // Crea un nuevo evento utilizando el modelo
      const newEvent = await addEventsModels.createEvent({ name, city });

      // Envía una respuesta con el evento creado
      res.status(201).send({ msg: "New event created", newEvent });
      return
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

export default AddEventsController;