import searchNearestEventModels from '../../models/events/searchNearestEventModels.js';

const SearchNearestEventController = {
  async searchNearestEvent(req, res) {
    try {      
      const { latitude, longitude, limit } = req.query;

      if (!latitude || !longitude) {
        return res.status(400).send({ error: true, msg: "Latitude and longitude parameters are required" });
      }

      const nearestEvent = await searchNearestEventModels.searchNearestEvent(latitude, longitude, limit);

      res.status(200).send({ msg: "Nearest event retrieved", nearestEvent });
    } catch (error) {
      if (error.status === 404) {
        res.status(404).send({ error: true, msg: "Nearest event not found" });
      } else {
        console.error(error);
        res.status(500).send({ error: true, msg: "Internal Server Error, try again later" });
      }
    }
  }
};

export default SearchNearestEventController;
