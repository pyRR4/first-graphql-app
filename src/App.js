import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import _ from 'lodash';

import { baseResolvers } from './base/resolvers.js';
import { urlResolvers } from './url/resolvers.js';
import { dbResolvers } from './db/resolvers.js';

const typeDefs = readFileSync(join(process.cwd(), 'src', 'schema.graphql'), 'utf8');

const resolvers = _.merge({}, baseResolvers, urlResolvers, dbResolvers);

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

import { prisma } from './db/prisma.js';
process.on('SIGINT', async () => { await prisma.$disconnect(); process.exit(0); });
process.on('SIGTERM', async () => { await prisma.$disconnect(); process.exit(0); });