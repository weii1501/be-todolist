import HandleError from "../utils/HandleError";
import { Todo } from "../entity/todo.entity";
import { myDataSource } from "../app-data-source";
import { BadRequestError, CustomError } from "../core/error.response";

interface TodoInterface {
  name?: string;
  startDate?: string;
  endDate?: string;
}

class TodoService {
  static async getTodos() {
    try {
      const todoRepository = myDataSource.getRepository(Todo);
      const todos = await todoRepository.find();
      return todos;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof CustomError) {
        throw new CustomError(error.message, error.status);
      } else {
        throw new Error();
      }
    }
  }

  static async getTodoById(id: number) {
    try {
      const todoRepository = myDataSource.getRepository(Todo);
      const todo = await todoRepository.findOneBy({ id: id });

      if (!todo) {
        throw new CustomError("Khong tim thay todo", 404);
      }

      return todo;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof CustomError) {
        throw new CustomError(error.message, error.status);
      } else {
        throw new Error();
      }
    }
  }

  static async createTodo(params: TodoInterface) {
    try {
      const todo = await myDataSource.getRepository(Todo).create(params);
      const result = await myDataSource.getRepository(Todo).save(todo);
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof CustomError) {
        throw new CustomError(error.message, error.status);
      } else {
        throw new Error();
      }
    }
  }

  static async updateTodo(id: number, todo: TodoInterface) {
    try {
      const todoRepository = myDataSource.getRepository(Todo);
      const todoToUpdate = await todoRepository.findOneBy({ id: id });

      if (!todoToUpdate) {
        throw new CustomError("Khong tim thay todo", 404);
      }

      myDataSource.getRepository(Todo).merge(todoToUpdate, todo);
      const result = await myDataSource.getRepository(Todo).save(todoToUpdate);
      return result;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof CustomError) {
        throw new CustomError(error.message, error.status);
      } else {
        throw new Error();
      }
    }
  }

  static async deleteTodo(id: number) {
    try {
      const results = await myDataSource.getRepository(Todo).delete(id);

      if (!results) {
        throw new CustomError("Khong tim thay todo", 404);
      }

      return results;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof CustomError) {
        throw new CustomError(error.message, error.status);
      } else {
        throw new Error();
      }
    }
  }

  static async deleteAllTodos() {
    try {
      const results = await myDataSource.getRepository(Todo).delete({});

      return results;
    } catch (error) {
      console.log(error);
      if (error instanceof BadRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof CustomError) {
        throw new CustomError(error.message, error.status);
      } else {
        throw new Error();
      }
    }
  }
}

export default TodoService;
