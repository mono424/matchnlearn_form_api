require('dotenv').config()
const Hapi = require('@hapi/hapi');
const db = require('./db');
const { registerRoutes } = require('./routes');

// const IS_DEVELOP = process.env.NODE_ENV === "development"; 

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost',
        routes: {
            cors: true // todo: add cors
        }
    });

    await db.init(process.env.MONGO_URL);
    registerRoutes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();