import express, { Request, Response } from "express";
import MessageHandle from "../../utils/MessageHandle";
import TodoController from "../../controllers/todo.controller";
import { body } from "express-validator";
import { validationErrorHandler } from "../../middlewares/validationErrorHandler";
import { BadRequestError } from "../../core/error.response";

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

todosRouter.route("/").post(
  body("name")
    .notEmpty()
    .withMessage("Task name is required")
    .isLength({ max: 80 })
    .withMessage("Task name must be at most 80 characters"),

  // Start date là optional, nhưng nếu có thì phải đúng định dạng YYYY-MM-DD
  body("startDate")
    .optional()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Start date must be in YYYY-MM-DD format"),

  // End date là optional, nhưng nếu có thì phải đúng định dạng YYYY-MM-DD
  body("endDate")
    .optional()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("End date must be in YYYY-MM-DD format"),

  // Nếu có endDate thì phải có startDate
  body("endDate").custom((value, { req }) => {
    if (value && !req.body.startDate) {
      throw new BadRequestError("Start date is required when end date is provided");
    }
    return true;
  }),
  validationErrorHandler,
  async function (req: Request, res: Response) {
    MessageHandle(TodoController.createTodo, req, res);
  }
);

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
