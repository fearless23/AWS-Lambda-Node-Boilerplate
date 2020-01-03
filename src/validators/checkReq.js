const { apiSchema } = require("./joiSchema");

exports.JSONValidator = function(bodyStr) {
  try {
    return JSON.parse(bodyStr);
  } catch (error) {
    throw [400, "B400", false, "Bad JSON Format of Body"];
  }
};

exports.checkXAuthKey = async function(event) {
  // Check AuthKey Headers
  const xAuthKey = event.headers["x-auth-key"];
  if (!xAuthKey) {
    throw [400, "B100", false, "Please provide x-auth-key"];
  }
  return xAuthKey;
};

exports.joiValidator = async function(apiBody) {
  try {
    await apiSchema.validateAsync(apiBody);
  } catch (error) {
    throw [200, "B101", false, error.message];
  }
};
