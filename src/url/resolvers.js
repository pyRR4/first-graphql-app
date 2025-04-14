import { getRestUsersList, getRestTodosList, userByIdUrl, todoByIdUrl, getRestTodosByUserId } from './utils.js';

export const urlResolvers = {
    Query: {
        usersUrl: (parent, args) => getRestUsersList(args.page, args.size),
        todosUrl: (parent, args) => getRestTodosList(args.page, args.size),
        userUrl: (parent, args, context, info) => userByIdUrl(args.id),
        todoUrl: (parent, args, context, info) => todoByIdUrl(args.id),
    },
    User: {
        todosUrl: (parent, args) => {
            return getRestTodosByUserId(parent.id, args.page, args.size);
        },
    },
    Todo: {
        userUrl: (parent) => userByIdUrl(parent.userId),
    },
};