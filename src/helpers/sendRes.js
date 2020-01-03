// Will Work for API Gateway as well as ALB.
// Recommended to use with ALB
const { resHeaders } = require("./resHeaders");
const badFormatInfo = [502, "SFE100", false, "Internal Server Format Error"];

const getMeta = function(info) {
  const [httpCode, code, status, msg] = info;
  const meta = { status, msg, code };
  return { meta, httpCode };
};

exports.sendRes = function(info, data = null) {
  if (!Array.isArray(info)) {
    console.error(info); // See why info is not of type Array,
    // somewhere in code; wrong error or success format
    // Reset to bad format INFO...
    info = badFormatInfo;
  }

  const { httpCode, meta } = getMeta(info);
  const body = data ? { meta, data } : { meta };
  return {
    ...resHeaders(httpCode),
    body: JSON.stringify(body)
  };
};
