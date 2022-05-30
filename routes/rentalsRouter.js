import { Router } from "express";
import modulesRentalController from "../controllers/rentalsController.js";
import validateRental from "../middlewares/rentalValidator.js";

const rentalsRouter = Router();

const { getAllRentals,addRental } = modulesRentalController;

rentalsRouter.get("/rentals", getAllRentals);
rentalsRouter.post("/rentals", validateRental, addRental);

export default rentalsRouter;