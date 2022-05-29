import { Router } from "express";
import modulesGamesController from "../controllers/gamesController.js";
import validateGame from "../middlewares/gameValidator.js";

const gamesRouter = Router();

const { getAllGames,addGame } = modulesGamesController;

gamesRouter.get("/games", getAllGames);
// gamesRouter.post("/games",validateGame, addGame);

export default gamesRouter;