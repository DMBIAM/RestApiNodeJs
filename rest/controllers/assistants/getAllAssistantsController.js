import getAllAssistantsModels from '../../models/assistants/getAllAssistantsModels.js';

const GetAllAssistantsController = {
  async getAllAssistant(req, res) {
    try {
      const assistants = await getAllAssistantsModels.getAllAssistant();
      res.status(200).send({ msg: "Assistants retrieved", assistants });
      return
    } catch (error) {
      console.log("--------");
      console.log(error);
      console.log("--------");
      res.status(500).send({ error: true, msg: "Internal Server Error, try again later." });
      return;
    }
  }
};

export default GetAllAssistantsController;