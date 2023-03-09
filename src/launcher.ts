import { Server } from "./server"

//cria um instancia da classe Server onde ao chamar o atributo server 
//ganha acesso a todo express
new Server().server.listen(3000,()=>{
    console.log("Server running on 3000 port");
});