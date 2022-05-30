import { Router } from "express";
import modulesCustomerController from "../controllers/customersController.js";
import validateCustomer from "../middlewares/customerValidator.js";

const customersRouter = Router();

const { getAllCustomers,getCustomer,addCustomer,updateCustomer } = modulesCustomerController;

customersRouter.get("/customers", getAllCustomers);
customersRouter.get("/customers/:id", getCustomer);
customersRouter.post("/customers",validateCustomer, addCustomer);
customersRouter.put("/customers/:id", updateCustomer);

export default customersRouter;