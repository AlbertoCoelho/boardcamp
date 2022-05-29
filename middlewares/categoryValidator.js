import categorySchema from "../schemas/categorySchema.js";

const validateCategory = (req,res,next) => {
  const newCategory = req.body;

  const validation = categorySchema.validate(newCategory);
  if(validation.error) {
    console.log(validation.error.details.map(detail => detail.message));
    res.sendStatus(400);
    return;
  }

  next();
}

export default validateCategory;