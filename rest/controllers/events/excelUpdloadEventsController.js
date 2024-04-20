import xlsx from 'xlsx'; // Importa la librería para procesar archivos Excel

const ExcelEventsController = {
  async uploadExcelFile(req, res) {
    try {

      const excelFile = req.body;
      const workbook = xlsx.read(excelFile, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const eventsData = xlsx.utils.sheet_to_json(worksheet);

      // TODO Procesar los datos y guarda la información en la base de datos
      // const result = await EventModel.bulkInsertOrUpdateEvents(eventsData);
      const result = req.body;
      // Envía una respuesta con el resultado del proceso
      res.status(200).send({ msg: "Excel file uploaded and processed successfully", result });      
    } catch (error) {
      res.status(500).send({ error: true, msg: error });
    }
  }
};

export default ExcelEventsController;
