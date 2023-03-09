
export interface IPessoa{
    id?: number,
    nome?: string,
    idade?: number
}

export class Pessoa{
    private _nome: string;
    private _idade: number;
    private _id: number;

    constructor();
    constructor(obj: IPessoa);
    constructor(obj?: IPessoa){
        this._nome = obj?.nome ?? "default";
        this._idade = obj?.idade ?? 18,
        this._id = obj?.id ?? contador;
    }

    /*
    //Da na mesma que ultilizar Pessoa[]
    protected listall(): Array<Pessoa>{
        return listaPessoa
    }
    */
    protected listall(): Pessoa[]{
        return listaPessoa
    }

    protected store(): Pessoa[]{
        try {
            listaPessoa.push(new Pessoa({
                id: contador++,
                nome: this._nome,
                idade: this._idade
            }));
    
            return listaPessoa;
            
        } catch (error) {
            console.log("Error on model")
            console.log(error);
            return listaPessoa;
        }
        
    }

    protected update(id: number, novo_nome?: string, nova_idade?: number): Pessoa[] | boolean{
       try {
        const novo = listaPessoa.find((pessoa)=>{
            return pessoa._id == id
        });

        if(novo != undefined){
            novo._nome = novo_nome ?? novo._nome;
            novo._idade = nova_idade ?? novo._idade;

            return listaPessoa;
        }

        return false
        
        } catch (error) {
            console.log("error on model")
            console.log(error)
            return false;
       }
    }

    protected delete(id: number): Pessoa[] | boolean{
        try {
            const novo = listaPessoa.filter((pessoa)=>{
                return pessoa._id != id
            });

           if(listaPessoa.length != 0){
                return novo;
           }

           return false;

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
let contador:number = 0;

/*
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


