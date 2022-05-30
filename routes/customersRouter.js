import { Router } from "express";
import modulesCustomerController from "../controllers/customersController.js";
import validateCustomer from "../middlewares/customerValidator.js";

const customersRouter = Router();

const { getAllCustomers,getCustomer } = modulesCustomerController;

customersRouter.get("/customers", getAllCustomers);
customersRouter.get("/customers/:id", getCustomer);
//gamesRouter.post("/games",validateCustomer, addGame);

export default customersRouter;