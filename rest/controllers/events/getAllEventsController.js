import getAllEventsModels from '../../models/events/getAllEventsModels.js';

const GetAllEventsController = {
  async getAllEvent(req, res) {
    try {
        const events = await getAllEventsModels.getAllEvent();
        res.status(200).send({ msg: "Event retrieved", events });
        return
    } catch (error) {
        res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
        return;
    }
  }
};

export default GetAllEventsController;