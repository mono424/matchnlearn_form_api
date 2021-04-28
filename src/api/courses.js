const Joi = require('@hapi/joi');
const db = require('../db');

module.exports = {
    routes: () => [
        {
            method: 'GET',
            path: '/courses',
            handler: async (request, h) => {
                const courses = await db.getClient().db().collection("courses").find();
                return await courses.toArray();
            }
        }
    ]
}