import { Router } from "express";
import PessoaController from "./Controllers/PessoaController";

const router: Router = Router()
const pessoaController: PessoaController = new PessoaController()

//Routes
router.get("/", pessoaController.todos);
router.post("/novo", pessoaController.novo);
router.put("/alterar", pessoaController.alterar);
router.delete("/deletar/:id", pessoaController.daletar);

export { router };
