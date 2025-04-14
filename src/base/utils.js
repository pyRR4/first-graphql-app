const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

export const todoByIdBase = (parent, args, context, info) =>
    todosList.find(t => t.id == args.id);

export const userByIdBase = (parent, args, context, info) =>
    usersList.find(u => u.id == args.id);

export function getPaginationParams(args) {
    let page = args.page ?? DEFAULT_PAGE;
    let size = args.size ?? DEFAULT_PAGE_SIZE;

    if (page < 1 || size < 1) {
        console.warn(`URL: Invalid pagination parameters received: page=${page}, size=${size}. Using defaults.`);
        page = DEFAULT_PAGE;
        size = DEFAULT_PAGE_SIZE;
    }

    const take = size;
    const skip = (page - 1) * size;
    return { skip, take };
}