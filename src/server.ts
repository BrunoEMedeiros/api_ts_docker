import express from "express";
import { router } from "./router";
import cors from 'cors';
import { options } from "./cors_cofig";

export class Server{
  public server: express.Application;

  //apenas quando a classe for instanciada vai realmente startar o server
  //starta junto os middlewares e rotas
  constructor(){
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware(){
    this.server.use(express.json());
    this.server.use(cors(options));
    this.server.use(express.urlencoded({ extended: true}))
  }

  private router(){
    //todas as requisições são redirecionadas para o arquivo routes
    this.server.use(router);
  }
}