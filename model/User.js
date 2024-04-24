const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 8 },
});

const User = mongoose.model("User", userSchema, "User");

function validateRegistration(user) {
  const signUpSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = signUpSchema.validate(user, { abortEarly: false });
  if (error) {
    const formattedError = handleError(error);
    return formattedError;
  }
  return null;
}

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(user, { abortEarly: false });
  if (error) {
    return handleError(error);
  }
  return null;
}

function handleError(error) {
  const formattedError = error.details.reduce((acc, validationError) => {
    acc[validationError.context.key] = validationError.message;
    return acc;
  }, {});
  return formattedError;
}

module.exports = {
  User,
  validateRegistration,
  validateLogin,
};