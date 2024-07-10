import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";

class Database {
  private static instance: Database;
  private dataSource: DataSource;

  constructor() {
    this.dataSource = new DataSource({
      type: "sqlite",
      database: "database.sqlite",
      entities: [__dirname + "/../**/*.entity.js"],
      logging: true,
      synchronize: true,
    });
    this.connect();
  }

  connect() {
    this.dataSource
      .initialize()
      .then(async () => {
        console.log(__dirname + "/../**/*.entity.js");
        console.log("Data Source has been initialized!");
        // Example: Add a new user to the database
        // const user = new User();
        // user.firstName = "John";
        // user.lastName = "Doe";
        // await this.dataSource.manager.save(user);
        // console.log("New User has been saved.");
      })
      .catch((err) => {
        console.error("Error during Data Source initialization:", err);
      });
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  getDataSource(): DataSource {
    return this.dataSource;
  }
}

const instanceDb = Database.getInstance();

export default instanceDb;
