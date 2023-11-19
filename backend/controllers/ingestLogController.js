var LogsModel = require("../models/logs");

exports.ingestLog = (req, res) => {
    let log = req.body;
  
    // Check if all required fields are present
    if (
      !log.level ||
      !log.message ||
      !log.resourceId ||
      !log.timestamp ||
      !log.traceId ||
      !log.spanId ||
      !log.commit ||
      !log.metadata.parentResourceId
    ) {
      return res.status(400).send("All required fields must be provided.");
    }
  
    // Create a new log entry object
    const newLog = {
      level: log.level,
      message: log.message,
      resourceId: log.resourceId,
      timestamp: Date.parse(log.timestamp),
      traceId: log.traceId,
      spanId: log.spanId,
      commit: log.commit,
      metadata: {
        parentResourceId: log.metadata.parentResourceId,
      },
    };
  
    // Save the log entry to the database
    var Log = new LogsModel(newLog);
    Log
    .save()
    .then(() => {
      res.send("Log ingested successfully.");
    })
    .catch((error) => {
      console.error("Error in Save:", error);
      res.status(500).send("Error occurred in ingesting the log");
    });
  };
  