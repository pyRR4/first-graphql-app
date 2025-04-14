import { getRestUsersList, getRestTodosList, userByIdUrl, todoByIdUrl } from './utils.js';

export const urlResolvers = {
    Query: {
        usersUrl: () => getRestUsersList(),
        todosUrl: () => getRestTodosList(),
        userUrl: (parent, args, context, info) => userByIdUrl(args.id),
        todoUrl: (parent, args, context, info) => todoByIdUrl(args.id),
    },
    User: {
        todosUrl: async (parent) => {
            const allTodos = await getRestTodosList();
            return allTodos.filter(t => t.userId == parent.id);
        },
    },
    Todo: {
        userUrl: (parent) => userByIdUrl(parent.userId),
    },
};