var LogsModel = require("../models/logs");

// const { stringify } = require('circular-json');

exports.searchLog = (req, res) => {
  const queryParams = [];

  for (const key in req.query) {
    queryParams.push({
      key: key,
      value: req.query[key],
    });
  }
  const query = {};
  queryParams.forEach((param) => {
    query[param.key] = param.value;
  });

  console.log(queryParams);
  LogsModel.find(query)
    .then((items) => res.json(items))
    .catch((error) =>
      res.status(500).send("Error occurred in fetching the cart")
    );
};
