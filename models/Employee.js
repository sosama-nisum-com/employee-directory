const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  contact: { 
    type: String,
    required: true,
    minlength: 11,
    maxlength: 13,
  },
  city: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  location: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  image: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    name: Joi.string().min(5).max(255).required(),
    contact: Joi.string().regex(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/).required(),
    city: Joi.string().min(5).max(255).required(),
    location: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
}
exports.Employee = Employee;
exports.validate = validateEmployee;
