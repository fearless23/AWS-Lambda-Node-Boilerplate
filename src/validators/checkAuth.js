const { redisConn } = require("../helpers/redisConn");

const checkAuthOnRedis = async function (xAuthKey) {
  // Replace this with Your Auth logic, but make sure
  // to send error in proper format
  try {
    const { hget } = await redisConn();
    const authKey = "auth:" + xAuthKey;
    const userUid = await hget(authKey, "userUid");
    return userUid;
  } catch (error) {
    if (error.length === 4) {
      throw error;
    }
    throw [500, "R501", false, "Something happen wrong"];
  }
};

exports.checkAuth = async function (xAuthKey) {
  const userUid = await checkAuthOnRedis(xAuthKey);
  if (!userUid) {
    throw [401, "A401", false, "Unauthorized or expired session"];
  }
  return userUid;
};
