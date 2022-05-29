import { Router } from "express";
import modulesGamesController from "../controllers/gamesController.js";
//import validateCategory from "../middlewares/categoryValidator.js";

const gamesRouter = Router();

const { getAllGames } = modulesGamesController;

gamesRouter.get("/games", getAllGames);
//gamesRouter.post("/games",validateCategory, addGame);

export default gamesRouter;