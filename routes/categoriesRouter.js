import { Router } from "express";
import modulesCategoriesController from "../controllers/categoriesController.js";
import validateCategory from "../middlewares/categoryValidator.js";

const categoriesRouter = Router();

const { getAllCategories,addCategory } = modulesCategoriesController;

categoriesRouter.get("/categories", getAllCategories);
categoriesRouter.post("/categories",validateCategory, addCategory);

export default categoriesRouter;