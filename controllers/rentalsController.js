import db from "../db.js";

const getAllRentals = async (req,res) => {
  const { customerId, gameId } = req.query;

  try{
    const param = [];
    let where ='';
    if(customerId && !gameId){
      where = `WHERE rentals."customerId" = $1`;
      param.push(customerId);
    }
    if(gameId && !customerId){
      where = `WHERE rentals."gameId" = $1`;
      param.push(gameId);
    }
    if(customerId && gameId){
      where = `WHERE rentals."customerId" = $1 and rentals."gameId" = $2`;
      param.push(customerId);
      param.push(gameId);
    }

    const query = {
      text: `
      SELECT rentals.*,customers.name,games.name,categories.*
      FROM rentals
      JOIN customers
      ON customers.id = rentals."customerId"
      JOIN games
      ON games.id = rentals."gameId"
      JOIN categories
      ON categories.id = games."categoryId"
      ${where}`,
      rowMode: 'array'
    }
    

    const result = await db.query( query,param);
    console.log(result.fields.map(field => field.name))

    res.status(200).send(result.rows.map(row => {
      const [
        id,customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee,customerName,gameName,categoryId,categoryName
      ] = row;

      return {
        id,
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
        customer: {
          id: customerId,
          name: customerName,

        },
        game: {
          id: gameId,
          name: gameName,
          categoryId,
          categoryName
        }
      }
    }));
  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error getting the rentals!");
  }
}

// const addGame = async (req,res) => {
//   try{
//     const game = req.body;

//     const hasTheGame = await db.query(`
//       SELECT * 
//       FROM games 
//       WHERE name=$1
//       `,[game.name]);

//     const categoryExists = await db.query(`
//         SELECT id
//         FROM categories
//         WHERE id=$1
//     `,[game.categoryId]);

//       if(hasTheGame.rowCount !== 0 ){
//         res.sendStatus(409);
//         return;
//       }

//       if(categoryExists.rowCount === 0){
//         res.sendStatus(400);
//         return;
//       }

//     await db.query(`
//     INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") 
//     VALUES ($1, $2, $3, $4, $5);
//     `,[game.name, game.image, game.stockTotal,game.categoryId,game.pricePerDay])

//     res.sendStatus(201);

//   } catch (err) {
//       console.log(err);
//       res.status(500).send("There was an error adding the game!");
//   }
// }


const modulesRentalController = { getAllRentals };
export default modulesRentalController;