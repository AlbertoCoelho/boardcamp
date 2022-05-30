import db from "../db.js";
import dayjs from "dayjs";

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
    

    const result = await db.query(query,param);

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

const addRental = async (req,res) => {
  const day = dayjs();

  try{
    const { customerId,gameId,daysRented } = req.body;

    const hasTheGame = await db.query(`
      SELECT * 
      FROM games 
      WHERE id=$1
      `,[gameId]);

    const customerExist = await db.query(`
        SELECT id
        FROM customers
        WHERE id=$1
    `,[customerId]);

    const gameAvailable = await db.query(`
    SELECT *
    FROM rentals
    WHERE "gameId" = $1 
    AND "returnDate" IS null
    `,[gameId]);

      if(hasTheGame.rowCount === 0 ){
        res.sendStatus(400);
        return;
      }

      if(customerExist.rowCount === 0){
        res.sendStatus(400);
        return;
      }

      if(hasTheGame.rows[0].stockTotal === gameAvailable.rowCount){
        res.sendStatus(400);
        return;
      }

    const originalPrice = daysRented * hasTheGame.rows[0].pricePerDay;

    await db.query(`
    INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") 
    VALUES ($1, $2, $3, $4, null, $5, null);
    `,[customerId,gameId,day.format("YYYY-MM-DD"),daysRented,originalPrice])

    res.sendStatus(201);

  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error adding the rental!");
  }
}

const deleteRental = async (req,res) => {
  const { id } = req.params;

  try {
    const idExist = await db.query(`
    SELECT *
    FROM rentals
    WHERE id = $1 
    `,[id])

    if(idExist.rowCount === 0 ){
      res.sendStatus(404);
      return;
    }

    if(idExist.rows[0].returnDate !== null){
      res.sendStatus(400);
      return;
    }

    await db.query(`
    DELETE
    FROM rentals
    WHERE id = $1
    `,[id]);

    res.sendStatus(200);

  } catch (err){
    console.log(err);
    res.status(500).send("There was an error deleting the rental!");
  }

}

const finalizeRental = async (req,res) => {
  const { id } = req.params;
  const theDayIClosed = dayjs().format("YYYY-MM-DD");

  try {
    const idExist = await db.query(`
    SELECT *
    FROM rentals
    WHERE id = $1 
    `,[id])

    if(idExist.rowCount === 0 ){
      res.sendStatus(404);
      return;
    }

    if(idExist.rows[0].returnDate !== null){
      res.sendStatus(400);
      return;
    }

    const rentDate = idExist.rows[0].rentDate;
    const delay = dayjs().diff(rentDate, 'day') - idExist.rows[0].daysRented;
    const price = idExist.rows[0].originalPrice / idExist.rows[0].daysRented;
    const delayFee = delay > 0 && delay * price;

    await db.query(`
    UPDATE rentals
    SET "returnDate" = $1, "delayFee" = $2
    WHERE id = $3`
    , [theDayIClosed, delayFee, id]);

    res.sendStatus(200);

  } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred while finalizing the rental!");
  }
}


const modulesRentalController = { getAllRentals,addRental,deleteRental,finalizeRental };
export default modulesRentalController;