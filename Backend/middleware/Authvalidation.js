const joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    number: joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "Validation Error" });
  }
  next();
};
const siginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "Validation Error" });
  }
  next();
};


module.exports = { signupValidation, siginValidation };
