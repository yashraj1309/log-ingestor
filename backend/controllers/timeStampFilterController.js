var LogsModel = require("../models/logs");

// Search Controller : only for timeStamp 
exports.searchLogBasedOnTime = (req, res) => {
    
    const startTimestamp = req.query.startTimestamp;
    const endTimestamp = req.query.endTimestamp;
    
    const query = {};
    
    if (startTimestamp) {
      query.timestamp = { $gte: startTimestamp };
    }
    
    if (endTimestamp) {
      query.timestamp = { ...query.timestamp, $lte: endTimestamp };
    }

    // Test Url : http://localhost:3000/search/timestamp?startTimestamp=2023-08-15T08:00:00.000Z&endTimestamp=2023-09-15T08:00:00.000Z
    
    LogsModel.find(query)
      .then((items) => res.json(items))
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error occurred in fetching the logs");
      });    
};
