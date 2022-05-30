import db from "../db.js";

const getAllGames = async (req,res) => {
  const { name } = req.query;

  try{
    const param= [];
    let query ='';
    if(name){
      query = `WHERE games.name ILIKE $1`;
      param.push(`${name}%`);
    }
    console.log(query);
    const result = await db.query(`
      SELECT games.*,categories.name AS categoryName
      FROM games
      JOIN categories
      ON games."categoryId"=categories.id
      ${query}
      `,param);
    res.status(200).send(result.rows);
  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error getting the games!");
  }
}

const addGame = async (req,res) => {
  try{
    const game = req.body;

    const hasTheGame = await db.query(`
      SELECT * 
      FROM games 
      WHERE name=$1
      `,[game.name]);

    const categoryExists = await db.query(`
        SELECT id
        FROM categories
        WHERE id=$1
    `,[game.categoryId]);

      if(hasTheGame.rowCount !== 0 ){
        res.sendStatus(409);
        return;
      }

      if(categoryExists.rowCount === 0){
        res.sendStatus(400);
        return;
      }

    await db.query(`
    INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") 
    VALUES ($1, $2, $3, $4, $5);
    `,[game.name, game.image, game.stockTotal,game.categoryId,game.pricePerDay])

    res.sendStatus(201);

  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error adding the game!");
  }
}

const modulesGamesController = { getAllGames,addGame };
export default modulesGamesController;