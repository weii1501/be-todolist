import HandleError from "../utils/HandleError";
import { Todo } from "../entity/todo.entity";
import { myDataSource } from "../app-data-source";

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
      console.log("err", error);
      if (error instanceof HandleError) {
        throw new HandleError(error.message);
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
        throw new HandleError(
          JSON.stringify({
            status: 404,
            message: "Khong tim thay todo",
          })
        );
      }

      return todo;
    } catch (error) {
      console.log("err", error);
      if (error instanceof HandleError) {
        throw new HandleError(error.message);
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
      console.log("err", error);
      if (error instanceof HandleError) {
        throw new HandleError(error.message);
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
        throw new HandleError(
          JSON.stringify({
            status: 404,
            message: "Khong tim thay todo de update",
          })
        );
      }

      myDataSource.getRepository(Todo).merge(todoToUpdate, todo);
      const result = await myDataSource.getRepository(Todo).save(todoToUpdate);
      console.log("result", todo);
      return result;
    } catch (error) {
      console.log("err", error);
      if (error instanceof HandleError) {
        throw new HandleError(error.message);
      } else {
        throw new Error();
      }
    }
  }

  static async deleteTodo(id: number) {
    try {
      const results = await myDataSource.getRepository(Todo).delete(id);
      return results;
    } catch (error) {
      console.log("err", error);
      if (error instanceof HandleError) {
        throw new HandleError(error.message);
      } else {
        throw new Error();
      }
    }
  }
}

export default TodoService;
