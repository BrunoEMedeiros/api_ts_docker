import { DatabaseModel } from "./DatabaseModel";
export interface IPessoa{
    id?: number,
    nome?: string,
    idade?: number
}

const banco = new DatabaseModel().pool;

export class Pessoa{
    private _nome: string;
    private _idade: number;
    private _id: number;

    constructor();
    constructor(obj: IPessoa);
    constructor(obj?: IPessoa){
        this._nome = obj?.nome ?? "default";
        this._idade = obj?.idade ?? 18,
        this._id = obj?.id ?? 1;
    }

    /*
    //Da na mesma que ultilizar Pessoa[]
    protected listall(): Array<Pessoa>{
        return listaPessoa
    }
    */
    protected async listall(): Promise<Pessoa[]>{
        try {
            //Não é necessario colocar dentro dessa lista, só fiz como
            //teste de desestruturar um objeto para preencher uma lista
            //de uma classe

            listaPessoa = [];
            await banco.query("select * from pessoa").then((res)=>{
                res.rows.map((pessoa)=>{
                    listaPessoa.push(new Pessoa({
                        id: pessoa.id,
                        nome: pessoa.nome,
                        idade: pessoa.idade
                    }))
                })
            })
            return listaPessoa;

        } catch (error) {
            console.log("Error on model")
            console.log(error);
            return listaPessoa;
        }
        
    }

    protected async store(): Promise<boolean>{
        try {
            let teste = false;
            await banco.query(`insert into pessoa(nome,idade)
                                values('${this._nome}',${this._idade})`)
            .then((res)=>{
                if(res.rowCount != 0){
                   teste = true 
                }
            })

            return teste;
            
        } catch (error) {
            console.log("Error on model")
            console.log(error);
            return false;
        }
        
    }

    protected async update(): Promise<boolean>{
        try {
            let teste = false;
            await banco.query(`select nome,idade from pessoa where id=${this._id}`)
                .then((res)=>{
                    if(res.rows.length != 0){
                        teste = true;
                    }
                })
            
            if(teste){
                await banco.query(`update pessoa set nome='${this._nome}',
                                    idade=${this._idade}
                                    where id=${this._id}`)
                .then((res)=>{
                    if(res.rowCount != 0){
                        teste = true;
                    }
                    else{
                        teste = false;
                    }
                })
            }
            
            return teste;

        } catch (error) {
            console.log("error on model")
            console.log(error)
            return false;
       }
    }

    protected async delete(): Promise<boolean>{
        try {
            let teste = false;
            await banco.query(`select nome,idade from pessoa where id=${this._id}`)
                .then((res)=>{
                    if(res.rows.length != 0){
                        teste = true;
                    }
                })
            
            if(teste){
                await banco.query(`delete from pessoa where id=${this._id}`) 
                .then((res)=>{
                    if(res.rowCount != 0){
                        teste = true;
                    }
                    else{
                        teste = false;
                    }
                })
            }
            
            return teste;

        } catch (error) {
            console.log("error on model")
            console.log(error)
            return false;
        }
    }

    public get nome(){
        return this._nome;
    }

    public get idade(){
        return this._idade
    }

    public set setNome(nome: string){
        this._nome = nome;
    }

    public set setIdade(idade: number){
        this._idade = idade;
    }

}
let listaPessoa: Pessoa[] = [];

/*
let contador:number = 0;
let listaPessoa: Array<Pessoa> = [
    new Pessoa({
        id: 0,
        nome: "Bruno",
        idade: 23
    }),
    new Pessoa({
        id: 1,
        nome: "Maria",
        idade: 25
    }),
    new Pessoa({
        id: 2,
        nome: "João",
        idade: 18
    })
]
*/


