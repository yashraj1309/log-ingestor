var LogsModel = require("../models/logs");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

exports.searchLog = async (req, res) => {
  const queryParams = [];

  let results;
  let isCached = false;

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

  const cacheKey = JSON.stringify(query);

  console.log(queryParams);

  try {
    const cacheResults = await redisClient.get(cacheKey);
    if (cacheResults) {
      isCached = true;
      results = JSON.parse(cacheResults);
    } else {
      // Use async/await to wait for the MongoDB query to complete
      results = await LogsModel.find(query);
      await redisClient.set(cacheKey, JSON.stringify(results));
    }
    res.json(results);
    if(isCached) {
      console.log("Cahsessd");
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
};
