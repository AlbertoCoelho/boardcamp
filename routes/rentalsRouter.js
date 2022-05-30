import { Router } from "express";
import modulesRentalController from "../controllers/rentalsController.js";
import validateRental from "../middlewares/rentalValidator.js";

const rentalsRouter = Router();

const { getAllRentals } = modulesRentalController;

rentalsRouter.get("/rentals", getAllRentals);
// rentalsRouter.get("/customers/:id", getCustomer);
// rentalsRouter.post("/customers", validateCustomer, addCustomer);
// rentalsRouter.put("/customers/:id", validateCustomer, updateCustomer);

export default rentalsRouter;