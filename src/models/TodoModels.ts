import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../instances/pg' // instanciando Postgres

// MODEL: Responsável por gerenciar os dados e a lógica da aplicação.

// CRIANDO A LÓGICA DO BANCO DE DADOS
export interface TodoInstance extends Model {
    id: number
    title: string
    done: boolean
}

export const Todo = sequelize.define<TodoInstance>('Todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'todos',
    timestamps: false

})