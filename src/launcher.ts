import { DatabaseModel } from "./Models/DatabaseModel";
import { Server } from "./server"

//cria um instancia da classe Server onde ao chamar o atributo server 
//ganha acesso a todo express
new DatabaseModel().testeConexao().then((res)=>{
    if(res){
        new Server().server.listen(3000,()=>{
            console.log("Server running on 3000 port");
        });
    }
    else{
        console.log("Database not avaliable now, try again latter!")
    }
})



