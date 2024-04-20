import addEventsModels from '../../models/events/addEventsModels.js';

const AddEventsController = {
  async addEvent(req, res) {
    try {
      const { name, city, location_name, location } = req.body;

      // Validar que los campos no estén vacíos
      if (!city || !name || !location_name || !location) {
          res.status(400).send({ error: true, msg: "Mandatory params are missing" });
          return;
      }

      // Crea un nuevo evento utilizando el modelo
      const newEvent = await addEventsModels.createEvent({ name, city, location_name, location });

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