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
                const students = await db.getClient().db().collection("students").aggregate([
                    { 
                        $lookup: {
                        from: 'courses',
                        localField: 'courses',
                        foreignField: '_id',
                        as: '_courses'
                      }
                    }
                ])
                .sort({ "createdAt": -1 });

                const formatted = (await students.toArray()).map(record => {
                    let nrecord = {
                        ...record,
                        courses: record._courses.map(course => course.names[0]).join(", "),
                        preferences: record.preferences.join(", "),
                        degree: record.studyStatus.degree,
                        year: record.studyStatus.year,
                        _courses: undefined,
                        studyStatus: undefined,
                    }
                    delete nrecord._courses;
                    delete nrecord.studyStatus;
                    return nrecord;
                });

                const csv = json2csv.parse(formatted);
                return h.response(csv)
                    .header('Content-Type', "text/csv")
                    .header('Content-Disposition', 'attachment; filename= ' + "students.csv");
            }
        }
    ]
}