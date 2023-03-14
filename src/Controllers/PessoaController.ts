import { Request, Response } from "express";
import { Pessoa } from "../Models/PessoaModel";

export default class PessoaController extends Pessoa{

    constructor(nome: string = '', idade: number = 0, id: number = 0)
        {   
            nome = nome ?? "default";
            idade = idade ?? 0;
            super({id, nome, idade})
        }

    public async todos(req:Request, res: Response): Promise<Response>{
        try {
            //acessando a função protected através de um objeto da classe filha
            const pessoas = await new PessoaController().listall();
            return res.status(200).json(pessoas);
            
        } catch (error) {
            console.log("Error on controller method todos");
            console.log(error);
            return res.status(500).send("error");
        }
    }

    public async novo(req: Request, res: Response): Promise<Response>{
        try {
            //acessando função publica atraves de objeto
            const {name, age} = req.body;
            const novaPessoa = await new PessoaController(name, age).store();
            if(novaPessoa == false){
                return res.status(200).send("Erro ao cadastrar pessoa");   
            }
            return res.status(200).json(novaPessoa);

        } catch (error) {
            console.log("Error on controller method store");
            console.log(error);
            return res.status(500).send("error");
        }
        
    }

    public async alterar(req: Request, res: Response): Promise<Response>{
        try {
            let {id} = req.params;
            const codigo: number = parseInt(id);
            const {name, idade} = req.body;
            const updatePessoa = 
            await new PessoaController(name, idade, codigo,).update();
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

    public async deletar(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            const codigo = parseInt(id);
            const deletePessoa = 
            await new PessoaController('',0,codigo).delete();
            return res.status(200).json(deletePessoa);

        } catch (error) {
            console.log("error on controller method deletar");
            console.log(error);
            return res.status(500).send("error");
        }
    }
}