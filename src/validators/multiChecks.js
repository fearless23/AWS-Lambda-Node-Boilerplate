const { JSONValidator, joiValidator, checkXAuthKey } = require("./checkReq");
const { checkAuth } = require("./checkAuth");
const { dbConn } = require("../helpers/dbConn");

// Idea here is to fail fast... Place fastest check on Top
exports.multiChecks = async function(event, dbConnReq = true) {
  // 1. Check If X-AUTH-KEY PRESENT
  const xAuthKey = await checkXAuthKey(event);

  // 2. Validate Body JSON. Change to params or other vals
  const body = JSONValidator(event.body);

  // 3. Validate Body Schema or params etc...
  await joiValidator(body);

  // 4. Check Auth - Current Redis x-auth-key, Can Replace with OWN
  const userUid = await checkAuth(xAuthKey);

  // 5. Moving forward does API Action need a DB Conn..
  // Hot Lambda will use existing connection...
  if (dbConnReq) await dbConn();

  // Combine all into Payload
  return { userUid, ...body };
};
