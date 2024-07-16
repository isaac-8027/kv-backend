const express = require("express");
import{ Request, Response} from "express";
import employeeRouter from "./router/employee.routes";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import HttpException from "./exceptions/http.exeptions";
import errorMiddleware from "./middleware/error.middleware";
import departmentRouter from "./router/department.router";
import cors from "cors"

const server = new express();
server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use(cors());
server.use('/employee',employeeRouter);
server.use('/department',departmentRouter);
server.use(errorMiddleware);
server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("helloworld");
});
// interface Profile{
//   name:string,
//   age:number;
// }

// interface data{
//   profile:Profile;
// }

// server.get("/getData", (req: Request, res:Response) => {
//   let data:data = {
//     profile: {
//       name: "isaac",
//       age: 22,
//     },
//   };
  
  
//   console.log(data.profile.name);
//   res.status(200).send(data);
// });
(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("server listening to 3000");
  });
})();
