import axios from 'axios';

const BASE_URL = "https://jsonplaceholder.typicode.com";
const DEFAULT_PAGE_SIZE = 10;

export async function getRestUsersList(page = 1, size = DEFAULT_PAGE_SIZE) {
    if (page < 1 || size < 1) {
        console.warn(`URL: Invalid pagination parameters received: page=${page}, size=${size}. Using defaults.`);
        page = 1;
        size = DEFAULT_PAGE_SIZE;
    }
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            params: { _page: page, _limit: size }
        });
        return response.data.map(({ id, name, email, username }) => ({
            id: id.toString(), name, email, login: username,
        }));
    } catch (error) { throw error; }
}

export async function getRestTodosList(page = 1, size = DEFAULT_PAGE_SIZE) {
    if (page < 1 || size < 1) {
        console.warn(`URL: Invalid pagination parameters received: page=${page}, size=${size}. Using defaults.`);
        page = 1;
        size = DEFAULT_PAGE_SIZE;
    }
    try {
        const response = await axios.get(`${BASE_URL}/todos`, {
            params: { _page: page, _limit: size }
        });
        return response.data.map(({ id, title, completed, userId }) => ({
            id: id.toString(), title, completed, userId: userId.toString(),
        }));
    } catch (error) { throw error; }
}

export async function userByIdUrl(id) {
    try {
        const response = await axios.get(`<span class="math-inline">\{BASE\_URL\}/users/</span>{id}`);
        const user = response.data;
        return { id: user.id.toString(), name: user.name, email: user.email, login: user.username };
    } catch (error) {
        if (error.response && error.response.status === 404) return null;
        throw error;
    }
}

export async function todoByIdUrl(id) {
    try {
        const response = await axios.get(`<span class="math-inline">\{BASE\_URL\}/todos/</span>{id}`);
        const todo = response.data;
        return { id: todo.id.toString(), title: todo.title, completed: todo.completed, userId: todo.userId.toString() };
    } catch (error) {
        if (error.response && error.response.status === 404) return null;
        throw error;
    }
}

export async function getRestTodosByUserId(userId, page = 1, size = DEFAULT_PAGE_SIZE) {
    if (page < 1 || size < 1) {
        console.warn(`URL: Invalid pagination parameters received for user ${userId}: page=${page}, size=${size}. Using defaults.`);
        page = 1;
        size = DEFAULT_PAGE_SIZE;
    }
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}/todos`, {
            params: { _page: page, _limit: size }
        });
        return response.data.map(({ id, title, completed, userId }) => ({
            id: id.toString(), title, completed, userId: userId.toString(),
        }));
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        throw error;
    }
}