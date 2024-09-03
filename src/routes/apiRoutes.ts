import { Router } from 'express'

import * as TodoController from '../controllers/TodoController'

const router = Router() // criando o roteador

router.get('/todo', TodoController.all) // listar todas as tarefas

router.post('/todo', TodoController.add) // adicionando tarefa

// id = dinâmico
router.put('/todo/:id', TodoController.update) // atualizando tarefa

// não pode ser criada uma função chamada delete, pois é uma palavra reservada
// id = dinâmico
router.delete('/todo/:id', TodoController.remove) // deletando tarefa

export default router
