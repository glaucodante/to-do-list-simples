import { Router } from 'express'
import { Request, Response } from 'express'
import { Todo } from '../models/TodoModels'
import { error } from 'console'
/*
CONTROLLER: Atua como intermediário entre o Model e a View, processando as requisições
e decidindo quais modelos acessar e quais visualizações renderizar.

*/
// este arquivo está exportando as FUNÇÕES assíncronas para o api.ts (routes)
export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll() // buscando no model os registros do BD
    res.json({ list }) // exibindo os dados no insomnia
}

export const add = async (req: Request, res: Response) => {
    // enviando informações por meio do corpo da requisição
    if (req.body.title) { // se enviou no body o titulo
        let newTodo = await Todo.create({ // criando a tarefa
            title: req.body.title, // titulo
            done: req.body.done ? true : false // if Ternário // feita a tarefa ou nao 
        })
        res.status(201).json({ item: newTodo }) // 201 = deu certo e hou inserção de dados
    } else {
        res.json({ error: 'Dados não enviados' })
    }
}
//Função Update - com atualizações independentes em cada processo.
// Todo parâmetro (params) vem como uma string, o endpoint tbm 
export const update = async (req: Request, res: Response) => {
    // na URL o id é dinamico, por isso tenho que busca-lo tbm        
    let id: string = req.params.id // buscando em parâmetro pelo id
    // findByPk = find by primary key = pegar pela chave primaria
    let todo = await Todo.findByPk(id) // pegar pelo id
    if (todo) {
        if (req.body.title) { // se eu tiver um titulo
            todo.title = req.body.title // então altere o título
        }
        // PARA FAZER ALTERAÇÃO DE BOOLEAN, existem DUAS POSSIBILIDADES 
        // ACEITA STRING = O NOME TRUE OU FALSE 
        // ou ACEITA 1 ou 0 = TRUE OU FALSE
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) { // se done for igual a 
                case 'true':
                case '1':
                    todo.done = true
                    break
                case 'false': // caso contrário 
                case '0':
                    todo.done = false
                    break
            }
        }

        await todo.save() //  para salvar a atualização
        res.json({ item: todo }) // envia a alteração

    } else {
        res.status(404).json({ error: 'Item não encontrado' })
    }

}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id // id é uma string

    let todo = await Todo.findByPk(id) // buscando pelo id
    if (todo) {
        await todo.destroy() // achou o registro pelo ID, então exclui
        res.json({ item: todo }) // envia o item deletado
    } else {
        res.status(404).json({ error: 'Item não encontrado, não pode ser deletado.' })
    }
}


