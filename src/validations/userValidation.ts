import Joi from 'joi';

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
const registration = Joi.object({
  names: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().required(),
  nid: Joi.string().required(),
  martial_status: Joi.string().required(),
  nationality: Joi.string().required(),
  img: Joi.string().allow(null),
  password: Joi.string().min(6).required(),
  code: Joi.string().allow(null),
});
const emailVerification = Joi.object({
  email: Joi.string().email().required(),
});
const updatePassword = Joi.object({
  newPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
})

export default { login, registration, emailVerification, updatePassword };
