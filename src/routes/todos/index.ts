import express, { Request, Response } from "express";
import MessageHandle from "../../utils/MessageHandle";
import TodoController from "../../controllers/todo.controller";

const todosRouter = express.Router();

todosRouter.route("/").get(async function (req: Request, res: Response) {
  MessageHandle(TodoController.getTodos, req, res);
});

todosRouter.route("/:id").get(async function (req: Request, res: Response) {
  MessageHandle(
    async function (params) {
      const result = await TodoController.getTodoById(Number(req.params.id));
      return result;
    },
    req,
    res
  );
});

todosRouter.route("/").post(async function (req: Request, res: Response) {
  MessageHandle(TodoController.createTodo, req, res);
});

todosRouter.route("/:id").put(async function (req: Request, res: Response) {
  MessageHandle(
    async function (params) {
      const result = await TodoController.updateTodo(
        Number(req.params.id),
        req.body
      );
      return result;
    },
    req,
    res
  );
});

todosRouter.route("/:id").delete(async function (req: Request, res: Response) {
  MessageHandle(
    async function (params) {
      const result = await TodoController.deleteTodo(Number(req.params.id));
      return result;
    },
    req,
    res
  );
});

export default todosRouter;
