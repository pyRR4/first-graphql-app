import { usersList, todosList } from './data.js';
import { userByIdBase, todoByIdBase, getPaginationParams } from './utils.js';

export const baseResolvers = {
    Query: {
        usersBase: (parent, args) => {
            const { skip, take } = getPaginationParams(args);
            return usersList.slice(skip, skip + take);
        },
        todosBase: (parent, args) => {
            const { skip, take } = getPaginationParams(args);
            return todosList.slice(skip, skip + take);
        },
        userBase: (parent, args, context, info) => userByIdBase(args.id),
        todoBase: (parent, args, context, info) => todoByIdBase(args.id),
    },
    User: {
        todosBase: (parent, args) => {
            const { skip, take } = getPaginationParams(args);
            const userTodos = todosList.filter(t => t.user_id == parent.id);
            return userTodos.slice(skip, skip + take);
        }
    },
    Todo: {
        userBase: (parent) => userByIdBase(parent.user_id, usersList)
    },
};