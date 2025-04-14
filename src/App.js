const { createYoga } = require('graphql-yoga');
const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const axios = require("axios")

const typeDefs = fs.readFileSync(
    path.resolve(__dirname, 'schema.graphql'),
    'utf-8'
);

const usersList = [
    { id: 1, name: "Jan Konieczny", email: "jan.konieczny@wonet.pl", login: "jkonieczny" },
    { id: 2, name: "Anna Wesołowska", email: "anna.w@sad.gov.pl", login: "anna.wesolowska" },
    { id: 3, name: "Piotr Waleczny", email: "piotr.waleczny@gp.pl", login: "p.waleczny" }
];
const todosList = [
    { id: 1, title: "Naprawić samochód", completed: false, user_id: 3 },
    { id: 2, title: "Posprzątać garaż", completed: true, user_id: 3 },
    { id: 3, title: "Napisać e-mail", completed: false, user_id: 3 },
    { id: 4, title: "Odebrać buty", completed: false, user_id: 2 },
    { id: 5, title: "Wysłać paczkę", completed: true, user_id: 2 },
    { id: 6, title: "Zamówic kuriera", completed: false, user_id: 3 },
];

async function getRestTodosList() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
        console.log("Fetched Todos:", response.data.length); // Opcjonalne logowanie
        // Mapujemy odpowiedź API na strukturę oczekiwaną (częściowo) przez schemę.
        // Zwróć uwagę, że API zwraca 'userId', które zachowujemy do późniejszego użycia
        // w resolverze ToDoItem.user.
        return response.data.map(({ id, title, completed, userId }) => ({
            id: id,
            title: title,
            completed: completed,
            user_id: userId, // Zachowujemy userId z API jako user_id do późniejszego linkowania
        }));
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error; // Rzucamy błąd dalej
    }
}

async function getRestUsersList(){
    try {
        const users = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(users);
        return users.data.map(({ id, name, email, username }) => ({
            id: id,
            name: name,
            email: email,
            login: username,
        }))
    } catch (error) {
        throw error
    }
}


const resolvers = {
    Query: {
        users: () => getRestUsersList(),
        todos: () => getRestTodosList(),
        todo: (parent, args, context, info) => todoById(parent, args, context, info),
        user: (parent, args, context, info) => userById(parent, args, context, info),
    },
    User:{
        todos: (parent, args, context, info) => {
            return todosList.filter(t => t.user_id == parent.id);
        }
    },
    ToDoItem:{
        user: (parent, args, context, info) => {
            return usersList.find(u => u.id == parent.user_id);
        }
    }
};

const schema = makeExecutableSchema({ // <--- Użyj makeExecutableSchema
    typeDefs,
    resolvers,
});

const yoga = createYoga({
    schema,
    graphiql: true
});

const server = createServer(yoga);

const port = 4000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
});