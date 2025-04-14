import { prisma } from './prisma.js';

export const dbResolvers = {
    Query: {
        usersDb: () => prisma.user.findMany(),
        todosDb: () => prisma.todo.findMany(),
        userDb: (parent, args) =>
            prisma.user.findUnique({
                where: {
                    id: parseInt(args.id)
                }
            }),
        todoDb: (parent, args) =>
            prisma.todo.findUnique({
                where: {
                    id: parseInt(args.id)
                }
            }),
    },
    User: {
        todosDb: (parent) => prisma.todo.findMany({ where: { userId: parent.id } }),
    },
    Todo: {
        userDb: (parent) => prisma.user.findUnique({ where: { id: parent.userId } }),
    },


    Mutation: {
        addUser: (parent, args) =>
            prisma.user.create({ data: args }),
        updateUser: (parent, args) =>
            prisma.user.update({
                where: {
                    id: parseInt(args.id)
                },
                data: {
                    email: args.email,
                    login: args.login,
                    name: args.name
                }
            }),
        deleteUser: async (parent, args) => {
            try {
                await prisma.user.delete({
                    where: {
                        id: parseInt(args.id)
                    }
                });
                return true; }
            catch {
                return false;
            }},

        addTodo: (parent, args) =>
            prisma.todo.create({
                data: {
                    title: args.title,
                    completed: args.completed,
                    userId: parseInt(args.userId)
                }
            }),
        updateTodo: (parent, args) =>
            prisma.todo.update({
                where: {
                    id: parseInt(args.id)
                },
                data: {
                    title: args.title,
                    completed: args.completed
                }
            }),
        deleteTodo: async (parent, args) => {
            try {
                await prisma.todo.delete({
                    where: {
                        id: parseInt(args.id)
                    }
                });
                return true;
            } catch {
                return false;
            }},
    }
};