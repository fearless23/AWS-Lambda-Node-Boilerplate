const { multiChecks } = require("./validators/multiChecks");
const { sendRes } = require("./helpers/sendRes");
const { apiAction } = require("./api/apiAction");

exports.handler = async function(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const payload = await multiChecks(event, false)
    const { info, data } = await apiAction(payload);
    return sendRes(info, data);
  } catch (error) {
    return sendRes(error);
  }
};
