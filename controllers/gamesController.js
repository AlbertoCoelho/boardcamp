import db from "../db.js";

const getAllGames = async (req,res) => {
  const { name } = req.query;

  try{
    let query ='';
    if(name){
      query = `WHERE games.name ILIKE $1`;
    }
    console.log(query);
    const result = await db.query(`
      SELECT games.*,categories.name AS categoryName
      FROM games
      JOIN categories
      ON games."categoryId"=categories.id
      ${query}
      `,[`${name}%`]);
    res.status(200).send(result.rows);
  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error getting the games!");
  }
}

const modulesGamesController = { getAllGames };
export default modulesGamesController;