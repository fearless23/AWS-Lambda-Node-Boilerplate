const crypto = require("crypto");
// Use Mongoose connection.collection for faster gets.
// Use regular mongoose for adding data, which passes through validation.
const { connection } = require("mongoose");
const APIKeysColl = connection.collection("ApiKeys");

// Related to This Lambda Only
const httpMethod = "GET";
const apiUrl = "/v1/products";
const thisRouteAccessKey = "k2";

const findApiKeyDetails = async function(apiKey, passphrase) {
  try {
    const [apiKeyData] = await APIKeysColl.findOne({ apiKey, passphrase })
      .limit(1)
      .toArray();
    return apiKeyData;
  } catch (error) {
    throw [500, "M500", false, "Something happen wrong"];
  }
};

const createSignature = function(apiSecretKey, timeStamp) {
  const signKey = String(timeStamp) + httpMethod + apiUrl;
  const ehash = crypto
    .createHmac("sha256", signKey)
    .update(apiSecretKey)
    .digest("base64");
  return ehash;
};

exports.validateAPIKey = function(xApiKey, apiHeaders) {
  const apiKey = xApiKey;
  const timeStamp = apiHeaders["bt-timestamp"];
  const signature = apiHeaders["bt-signature"];
  const passphrase = apiHeaders["bt-api-passphrase"];

  const apiKeyDetails = findApiKeyDetails(apiKey, passphrase);

  if (!apiKeyDetails) {
    throw [200, "A400", false, "Wrong API Key or Passphrase dont match"];
  }

  // Get Secret of given API KEY from DB
  const secret = apiKeyDetails.secret;

  // Create Signature based on Timestamp of user and secret from DB
  const lambdaSignature = createSignature(secret, timeStamp);

  if (signature !== lambdaSignature) {
    throw [200, "A400", false, "Wrong Signature."];
  }

  // Check Access
  const access = apiKeyDetails.access.some(x => x === thisRouteAccessKey);

  if (!access) {
    throw [200, "A400", false, "API KEY dont have access to given endpoint."];
  }

  return apiKeyDetails.userUid.toString();
};
