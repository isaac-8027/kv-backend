const express = require("express");
import{ Request, Response} from "express";
const server = new express();
server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("helloworld");
});
server.get("/employee", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("my name is isaac");
});

interface Profile{
  name:string,
  age:number;
}

interface data{
  profile:Profile;
}

server.get("/getData", (req: Request, res:Response) => {
  let data:data = {
    profile: {
      name: "isaac",
      age: 22,
    },
  };
  
  
  console.log(data.profile.name);
  res.status(200).send(data);
});
server.listen(3000, () => {
  console.log("server is running in port 3000");
});
