exports.apiAction = async function(payload) {
  return {
    info: [200, "s200", true, "API Action Successfull"],
    data: { name: "fearless", info: "AWS Lambda Boilerplate works.", payload }
  };
};
