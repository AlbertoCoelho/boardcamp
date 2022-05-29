import db from "../db.js";

const getAllCategories = async (req,res) => {
  try{
    const result = await db.query("SELECT * FROM categories");
    res.status(200).send(result.rows);
  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error getting the recipes!");
  }
}

const addCategory = async (req,res) => {
  try{
    const category = req.body;
    const result = await db.query(`
      SELECT * 
      FROM categories 
      WHERE name=$1
      `,[category.name]);

      if(result.rowCount !== 0 ){
        res.sendStatus(409);
        return;
      }

    await db.query(`
      INSERT INTO categories (name)
      VALUES ($1)
      `,[category.name])

    res.sendStatus(201);

  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error getting the recipes!");
  }
}


const modulesCategoriesController = { getAllCategories,addCategory };
export default modulesCategoriesController;