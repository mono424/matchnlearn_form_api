const Joi = require('@hapi/joi');
const db = require('../db');

const GOALS = ["new_friends", "study_partners", "not_sure"];
const FACULTIES = ["in", "wi", "mw", "ei"];
const DEGREES = ["ba", "ma"];
const YEARS = ["1", "2", "3", "4+"];
const EXPERIENCES = ["easy", "alright", "difficult", "struggeling", "first_semester"];
const ATTITUDES = ["learning_lover", "score_chaser", "efficient", "pass_prayer"];
const GROUPSIZES = ["2", "3", "both"];

module.exports = {
    routes: () => [
        {
            method: 'POST',
            path: '/student',
            options: {
                validate: {
                    payload: Joi.object({ 
                        email: Joi.string().email().required(),
                        name: Joi.string().required(),
                        phoneNumber: Joi.string().regex(/^\+[0-9\\s]+/).required(),
                        goal: Joi.string().valid(...GOALS).required(),
                        faculty: Joi.string().valid(...FACULTIES).required(),
                        courses: Joi.array().min(1).items(Joi.string()).required(),
                        studyStatus: Joi.object({
                            degree: Joi.string().valid(...DEGREES).required(),
                            year: Joi.string().valid(...YEARS).required(),
                        }),
                        prevSemesterExperience: Joi.string().valid(...EXPERIENCES).required(),
                        attitude: Joi.string().valid(...ATTITUDES).required(),
                        hobbies: Joi.string(),
                        favWayOfLeanrning: Joi.string(),
                        peoplePreference: Joi.string(),
                        groupSize: Joi.string().valid(...GROUPSIZES).required(),
                    })
                }
            },
            handler: async (request, h) => {
                const { payload } = request;
                const res = await db.getClient().db().collection("students").insertOne(payload);
                return {
                    status: "ok",
                    _id: res.insertedId
                };
            }
        }
    ]
}