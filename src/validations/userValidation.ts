import Joi from 'joi';

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

const registration = Joi.object({
  names: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  location: Joi.array().items(Joi.object({
    building: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
    }).required(),
    room: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
    }).required(),
    status: Joi.string().valid('ACTIVE', 'INACTIVE').required(),
  })).required(),
  is_line_manager: Joi.boolean().required(),
  occupation_address: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    type: Joi.string().valid('DEPARTMENT', 'SCHOOL', 'COLLEGE', 'CAMPUS', 'UR').required(),
    parent_id: Joi.number().allow(null).required(),
  }).required(),
  report_to: Joi.string().allow(null).required(),
  role: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    access: Joi.array().items(Joi.string()).required(),
  }).required(),
  custom_access: Joi.array().items(Joi.string()).required(),
});

const emailVerification = Joi.object({
  email: Joi.string().email().required(),
});
const updatePassword = Joi.object({
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
})

export default { login, registration, emailVerification, updatePassword };
