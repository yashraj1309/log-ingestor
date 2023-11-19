const mongoose = require("mongoose");

var mongourl = "mongodb://127.0.0.1:27017";

var dbname = "logs";

var uri = mongourl + "/" + dbname;

try {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected....");
} catch (e) {
  console.log("Error");
}