import rentalSchema from "../schemas/rentalSchema.js";

const validateRental = (req,res,next) => {
  const newRental = req.body;

  const validation = rentalSchema.validate(newRental);
  if(validation.error) {
    console.log(validation.error.details.map(detail => detail.message));
    res.sendStatus(400);
    return;
  }
  
  next();
}

export default validateRental;