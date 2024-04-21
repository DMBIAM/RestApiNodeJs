import getOneEventsModels from '../../models/events/getOneEventsModels.js';

const GetOneEventsController = {
  async getOneEvent(req, res) {
    try {      
      const idEvent = req.params.id;
      const eventData = await getOneEventsModels.getOneEvent(idEvent);
      // Envía una respuesta con el evento buscado
      res.status(200).send({ msg: "Event retrieved", eventData });
      return
    } catch (error) {
      if (error.status === 404) {
        res.status(404).send({ status: error.status, error: false, msg: "Event not found" });
      } else {
        console.log(error);
        res.status(500).send({ status: error.status, error: true, msg: "Internal Server Error, try again later" });
      }
      return;
    }
  }
};

export default GetOneEventsController;