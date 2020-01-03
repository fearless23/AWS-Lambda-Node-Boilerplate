const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "feature-policy":
    "geolocation none;midi none;notifications none;push none;sync-xhr none;microphone none;camera none;magnetometer none;gyroscope none;speaker self;vibrate none;fullscreen self;",
  "Cache-Control": "no-cache",
  "referrer-policy": "no-referrer-when-downgrade",
  "strict-transport-security": "max-age=63072000; includeSubdomains; preload",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "x-xss-protection": "1; mode=block"
};

const errorMap = {
  200: "Request OK",
  400: "Bad Request",
  401: "Unauthorized",
  500: "Server Error"
};

exports.resHeaders = httpCode => {
  return {
    statusCode: httpCode,
    statusDescription: errorMap[httpCode] || "Something happen Wrong",
    headers
  };
};
