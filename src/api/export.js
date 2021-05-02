const json2csv = require('json2csv');
const db = require('../db');

module.exports = {
    routes: () => [
        {
            method: 'GET',
            path: '/export',
            options: {
                auth: 'simple'
            },
            handler: async (request, h) => {
                const students = await db.getClient().db().collection("students").find().sort({ "createdAt": -1 });
                const csv = json2csv.parse(await students.toArray());
                return h.response(csv)
                    .header('Content-Type', "text/csv")
                    .header('Content-Disposition', 'attachment; filename= ' + "students.csv");
            }
        }
    ]
}