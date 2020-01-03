const Joi = require("@hapi/joi");
exports.apiSchema = Joi.object().keys({
  action: Joi.string()
    .required()
    .valid("accept", "reject", "delete")
    .error(new Error("action is Required")),
  name: Joi.string()
    .required()
    .error(new Error("Chat Invite ID is Required")),
  age: Joi.number()
    .min(10)
    .max(99)
    .optional()
    .error(new Error("Age[optional] must be >= 18"))
});
