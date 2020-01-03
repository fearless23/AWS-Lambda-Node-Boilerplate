const mongoose = require("mongoose");
mongoose.set("bufferCommands", false);

const testMongoDBUrl = "...";
let isConnected;

exports.dbConn = async function() {
  const dbUrl = process.env.MONGODB_URL || testMongoDBUrl;
  if (!!isConnected) return isConnected;

  try {
    const db = await mongoose.connect(dbUrl, { useNewUrlParser: true });
    isConnected = db.connections[0].readyState;
    return isConnected;
  } catch (err) {
    // Send Actual err to logger... or CloudWatch By Using console.error
    throw [500, "M500", false, "Something happen wrong"];
  }
};
