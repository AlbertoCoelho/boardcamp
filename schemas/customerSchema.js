import joi from 'joi';

const regexPhone = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
const regexCPF = /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)/;
const regexBirthday= /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

const customerSchema = joi.object({
  name: joi.string()
  .required(),

  phone: joi.string()
  .pattern(regexPhone)
  .required(),

  cpf: joi.string()
  .pattern(regexCPF)
  .required(),

  birthday: joi.string()
  .pattern(regexBirthday)
  .required()
})

export default customerSchema;