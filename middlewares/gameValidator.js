import gameSchema from "../schemas/gameSchema.js";

const validateGame = (req,res,next) => {
  const newGame = req.body;

  const validation = gameSchema.validate(newGame);
  if(validation.error) {
    console.log(validation.error.details.map(detail => detail.message));
    res.sendStatus(400);
    return;
  }

  

  next();
}

export default validateGame;