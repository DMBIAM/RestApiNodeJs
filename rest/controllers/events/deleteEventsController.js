import deleteEventsModels from '../../models/events/deleteEventsModels.js';

const DeleteEventsController = {
  async deleteEvent(req, res) {
    try {      
        const idEvent = req.body.id;
        const eventData = await deleteEventsModels.deleteEvent(idEvent);
        res.status(200).send({ msg: "Event deleted successfully", eventData });
    } catch (error) {
        if (error.status === 404) {
            res.status(404).send({ error: false, msg: "Event not found" });
        } else {
            console.error(error);
            res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
        }
    }
  }
};

export default DeleteEventsController;
