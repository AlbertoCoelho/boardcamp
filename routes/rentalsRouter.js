import { Router } from "express";
import modulesRentalController from "../controllers/rentalsController.js";
import validateRental from "../middlewares/rentalValidator.js";

const rentalsRouter = Router();

const { getAllRentals,addRental,deleteRental,finalizeRental } = modulesRentalController;

rentalsRouter.get("/rentals", getAllRentals);
rentalsRouter.post("/rentals", validateRental, addRental);
rentalsRouter.post("/rentals/:id/return", finalizeRental);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;