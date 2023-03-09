import { Request, Response } from "express";
import { Pessoa } from "../Models/PessoaModel";

export default class PessoaController extends Pessoa{

    constructor(nome?: string, idade?: number, id: number = 0)
        {
            super({id, nome, idade})
        }

    public todos(req:Request, res: Response): Response{
        try {
            //acessando a função protected através de um objeto da classe filha
            const pessoas = new PessoaController().listall();
            console.log(pessoas);
            return res.status(200).json(pessoas);
            
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public novo(req: Request, res: Response): Response{
        try {
            //acessando função publica atraves de objeto
            const {name, age} = req.body;
            const novaPessoa = new PessoaController(name, age).store();
            return res.status(200).json(novaPessoa);

        } catch (error) {
            console.log("Error on controller method store");
            console.log(error);
            return res.status(500).send("error");
        }
        
    }

    public alterar(req: Request, res: Response): Response{
        try {
            const {id, name, idade} = req.body;
            const updatePessoa = new PessoaController().update(id, name, idade);
            if(updatePessoa == false){
                return res.status(200).send("Pessoa não encontrada");   
            }
            return res.status(200).json(updatePessoa);

        } catch (error) {
            console.log("error on controller method alterar");
            console.log(error);
            return res.status(500).send("error");
        }
    }  

    public daletar(req: Request, res: Response): Response{
        try {
            const { id } = req.params;
            const codigo = parseInt(id);
            const deletePessoa = new PessoaController().delete(codigo);
            return res.status(200).json(deletePessoa);

        } catch (error) {
            console.log("error on controller method deletar");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}