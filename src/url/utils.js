import axios from 'axios';

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getRestUsersList() {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data.map(({ id, name, email, username }) => ({
            id: id.toString(), name, email, login: username,
        }));
    } catch (error) { throw error; }
}

export async function getRestTodosList() {
    try {
        const response = await axios.get(`${BASE_URL}/todos`);
        // Zwróć też userId, przyda się w resolverze ToDoItem.user
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