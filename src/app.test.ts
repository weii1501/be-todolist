import request from "supertest";
import app from "./app";

import { myDataSource } from "./app-data-source";

beforeAll(async () => {
  await myDataSource.initialize();
});

afterAll(async () => {
  await myDataSource.destroy();
});

describe("GET /v1/api/todos", () => {
  it("should return all todos", async () => {
    const res = await request(app).get("/v1/api/todos");
    const todos = res.body.content;
    expect(res.statusCode).toBe(200);
  });
});

describe("GET /v1/api/todos/:id", () => {
  it("should return a todo by id", async () => {
    for (let i = 1; i <= 10; i++) {
      const res = await request(app).get("/v1/api/todos/200");
      const todo = res.body.content;
      if (todo) {
        expect(res.statusCode).toBe(200);
      } else {
        expect(res.statusCode).toBe(404);
      }
    }
  });
});

describe("POST /v1/api/todos", () => {
  it("should create a new todo", async () => {
    const res = await request(app).post("/v1/api/todos").send({
      name: "New Todo",
      startDate: "2021-01-01",
      endDate: "2021-01-02",
    });
    const todo = res.body.content;
    expect(res.statusCode).toBe(201);
    expect(todo.name).toBe("New Todo");
    expect(todo.startDate).toBe("2021-01-01");
    expect(todo.endDate).toBe("2021-01-02");
  });
});

describe("PUT /v1/api/todos/:id", () => {
  it("should update a todo", async () => {
    const res = await request(app).put("/v1/api/todos/5").send({
      name: "Updated Todo",
      startDate: "2021-01-01",
      endDate: "2021-01-02",
    });
    const todo = res.body.content;
    expect(todo.name).toBe("Updated Todo");
    expect(todo.startDate).toBe("2021-01-01");
    expect(todo.endDate).toBe("2021-01-02");
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /v1/api/todos/:id", () => {
  it("should delete a todo", async () => {
    const res = await request(app).delete("/v1/api/todos/1");
    expect(res.statusCode).toBe(204);
  });
});
