import customerSchema from "../schemas/customerSchema.js";

const validateCustomer = (req,res,next) => {
  const newCustomer = req.body;

  const validation = customerSchema.validate(newCustomer);
  if(validation.error) {
    console.log(validation.error.details.map(detail => detail.message));
    res.sendStatus(400);
    return;
  }
  
  next();
}

export default validateCustomer;