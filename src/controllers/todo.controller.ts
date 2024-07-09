import TodoService from "../service/todo.service";

interface TodoInterface {
  name?: string;
  startDate?: string;
  endDate?: string;
}

class TodoController {
  async getTodos() {
    const result = await TodoService.getTodos();
    return result;
  }

  async createTodo(params: TodoInterface) {
    const result = await TodoService.createTodo(params);
    return result;
  }

  async updateTodo(id: number, todo: TodoInterface) {
    const result = await TodoService.updateTodo(id, todo);
    return result;
  }

  async deleteTodo(id: number) {
    const result = await TodoService.deleteTodo(id);
    return result;
  }

  async getTodoById(id: number) {
    const result = await TodoService.getTodoById(id);
    return result;
  }
}

const todoController = new TodoController();

export default todoController;
