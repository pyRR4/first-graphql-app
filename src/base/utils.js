
export const todoByIdBase = (parent, args, context, info) =>
    todosList.find(t => t.id == args.id);

export const userByIdBase = (parent, args, context, info) =>
    usersList.find(u => u.id == args.id);