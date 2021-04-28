const routes= [
    require('./api/index'),
    require('./api/student'),
    require('./api/courses'),
];

module.exports = {
    registerRoutes: (server) => {
        routes
            .reduce((res, r) => ([...res, ...r.routes()]), [])
            .forEach(r => server.route(r));
    }
};
