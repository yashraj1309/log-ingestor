// Schema for books microservices
var mongoose = require('mongoose');

var schema = mongoose.Schema;

// Logs Schema for correct data inserting 
const logsSchema = new schema({
    "level": {
      "type": "string",
      "required": true
    },
    "message": {
      "type": "string",
      "required": true
    },
    "resourceId": {
      "type": "string",
      "required": true
    },
    "timestamp": {
      "type": Date,
      "required": true,
      "index":true
    },
    "traceId": {
      "type": "string",
      "required": true
    },
    "spanId": {
      "type": "string",
      "required": true
    },
    "commit": {
      "type": "string",
      "required": true
    },
    "metadata": {
      "type": "object",
      "properties": {
        "parentResourceId": {
          "type": "string",
          "required": true
        }
      }
    }
  },  { collection: "logs" });

// Create a model

module.exports = mongoose.model("Logs",logsSchema);