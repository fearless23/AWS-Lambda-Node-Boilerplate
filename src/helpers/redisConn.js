const { createClient } = require("async-redis");
let client;

const newConn$ = function() {
  const port = process.env.redisPort || 6379;
  const host = process.env.redisHost || "127.0.0.1";
  let newClient = createClient(port, host);
  return new Promise((res, rej) => {
    newClient.on("error", err => {
      newClient
        .quit()
        .then()
        .catch();
      rej(err);
    });
    newClient.on("connect", () => res(newClient));
  });
};

exports.redisConn = async function() {
  if (!!client) return client;

  try {
    const conn = await newConn$();
    client = conn;
  } catch (error) {
    // Send Actual err to logger... or CloudWatch By Using console.error
    throw [500, "R500", false, "Something happen wrong!"];
  }
};
