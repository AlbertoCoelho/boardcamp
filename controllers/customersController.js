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
      res.status(500).send("There was an error getting the games!");
  }
}

const modulesCustomerController = { getAllCustomers };
export default modulesCustomerController;