import searchAssistantsModels from '../../models/assistants/searchAssistantsModels.js';

const SearchAssistantsController = {
    async searchAssistants(req, res, params) {
        const {
            user_name,
            user_id,
            user_email,
            event_id,
            event_name,
            city_id,
            city_name,
            country_id,
            country_name
        } = params;

        if (!user_name && !user_id && !user_email && !event_id && !event_name && !city_id && !city_name && !country_id && !country_name) {
            console.log("aqui error");
            res.status(400).send({error : true, msg: "At least one search parameter must be provided" });
            return;
        }

        try {
            const assistants = await searchAssistantsModels.searchAssistants(params);
            return { status: 200, message: "Assistants retrieved", assistants };
        } catch (error) {
            throw { status: 500, message: "Internal Server Error, try again later." };
        }
    }
};

export default SearchAssistantsController;
