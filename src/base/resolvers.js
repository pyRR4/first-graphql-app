import { usersList, todosList } from './data.js';
import { userByIdBase, todoByIdBase } from './utils.js';

export const baseResolvers = {
    Query: {
        usersBase: () => usersList,
        todosBase: () => todosList,
        userBase: (parent, args, context, info) => userByIdBase(args.id),
        todoBase: (parent, args, context, info) => todoByIdBase(args.id),
    },
    User: {
        todosBase: (parent) => todosList.filter(t => t.user_id == parent.id),
    },
    Todo: {
        userBase: (parent) => userByIdBase(parent.user_id, usersList),
    },
};