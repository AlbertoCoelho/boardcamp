import { Router } from "express";
import modulesCustomerController from "../controllers/customersController.js";
import validateCustomer from "../middlewares/customerValidator.js";

const customersRouter = Router();

const { getAllCustomers } = modulesCustomerController;

customersRouter.get("/customers", getAllCustomers);
//gamesRouter.post("/games",validateCustomer, addGame);

export default customersRouter;