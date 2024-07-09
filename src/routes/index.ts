import express from "express";
import todosRouter from "./todos";

const apiRouter = express.Router();

apiRouter.use("/todos", todosRouter);

export default apiRouter;