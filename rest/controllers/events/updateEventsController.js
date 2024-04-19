import updateEventsModels from '../../models/events/updateEventsModels.js';

const UpdateEventsController = {
  async updateEvent(req, res) {
    try {      
        const idEvent = req.body.id;
        const { name, city } = req.body;

        if (!name && !city) {
          return res.status(400).send({ error: true, msg: "At least one of the fields 'name' or 'city id' must be provided for update" });
        }

        const eventData = await updateEventsModels.updateEvent(idEvent, { name, city });
        res.status(200).send({ msg: "Event updated successfully", eventData });
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

export default UpdateEventsController;
