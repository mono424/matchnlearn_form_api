require('dotenv').config()
const Hapi = require('@hapi/hapi');
const { registerRoutes } = require('./routes');

// const IS_DEVELOP = process.env.NODE_ENV === "development"; 

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'] // todo: add cors        
            }
        }
    });

    registerRoutes(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();