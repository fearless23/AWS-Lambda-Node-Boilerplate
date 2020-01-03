const context = { callbackWaitsForEmptyEventLoop: false };
const { handler } = require("./../src/index");
const event = {
  headers: {
    "x-auth-key": "456" // For Test
  },
  body: JSON.stringify({
    action: "accept",
    name: "fearless"
  })
};

const testLambdaLocally = async () => {
  try {
    const data = await handler(event, context);
    console.log("RESPONSE", JSON.parse(data.body));
  } catch (error) {
    console.log("ERROR", error);
  }
};

testLambdaLocally()
  .then()
  .catch();
