require('dotenv').config()
const Hapi = require('@hapi/hapi');
const db = require('./db');
const migration = require('./services/Migration');
const { registerRoutes } = require('./routes');
const { validateGenerator } = require('./auth');

// const IS_DEVELOP = process.env.NODE_ENV === "development";

const adminUser = {
    username: "admin",
    password: process.env.ADMIN_PASSWORD
};

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: true // todo: add cors
        }
    });

    await db.init(process.env.MONGO_URL);
    await migration.migrate();

    await server.register(require('@hapi/basic'));
    server.auth.strategy('simple', 'basic', { validate: validateGenerator([adminUser]) });
    registerRoutes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();