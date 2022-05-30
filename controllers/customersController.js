import db from "../db.js";

const getAllCustomers = async (req,res) => {
  const { cpf } = req.query;

  try{
    const param= [];
    let query ='';
    if(cpf){
      query = `WHERE customers.cpf ILIKE $1`;
      param.push(`${cpf}%`);
    }
    console.log(query);
    const result = await db.query(`
      SELECT *
      FROM customers
      ${query}
      `,param);
    res.status(200).send(result.rows);
  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error getting the customers!");
  }
}

const getCustomer = async (req,res) => {
  const { id } = req.params;

  try {
    const result = await db.query(`
      SELECT *
      FROM customers
      WHERE id=$1
    `,[id]);

    if(result.rowCount === 0 ){
      res.sendStatus(404);
    }

    res.send(result.rows[0]);
  } catch(err) {
      console.log(err);
      res.status(500).send("There was an error getting the customer!");
  }
}

const addCustomer = async (req,res) => {
  try{
    const customer = req.body;

    const hasTheCustomer = await db.query(`
      SELECT * 
      FROM customers 
      WHERE cpf=$1
      `,[customer.cpf]);

      if(hasTheCustomer.rowCount !== 0 ){
        res.sendStatus(409);
        return;
      }

    await db.query(`
    INSERT INTO customers (name,phone,cpf,birthday) 
    VALUES ($1, $2, $3, $4);
    `,[customer.name, customer.phone, customer.cpf, customer.birthday])

    res.sendStatus(201);

  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error adding the client!");
  }
}

const updateCustomer = async (req,res) => {
  const { id } = req.params;

  try {
    const customer = req.body;

    const itsNotMe = await db.query(`
      SELECT * 
      FROM customers 
      WHERE cpf = $1
      AND id != $2
      `,[customer.cpf,id]);

      if(itsNotMe.rowCount !== 0 ){
        res.sendStatus(409);
        return;
      }

    await db.query(`
    UPDATE customers 
    SET name=$1,phone=$2,cpf=$3,birthday=$4
    WHERE id=$5
    `,[customer.name, customer.phone, customer.cpf, customer.birthday, id]);

    res.sendStatus(201);
  } catch (err) {
      console.log(err);
      res.status(500).send("There was an error updating the client!")
  }
}

const modulesCustomerController = { getAllCustomers, getCustomer,addCustomer,updateCustomer };
export default modulesCustomerController;