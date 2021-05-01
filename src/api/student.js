const Joi = require('@hapi/joi');
const { ObjectId } = require('mongodb');
const db = require('../db');
const WhatsAppService = require('../services/WhatsApp');

const confirmationMessage = ({ name }) => `**MatchNLearn Confirmation** Hey ${name}, thank you for using MatchNLearn to find a study-group.`;

const FACULTIES = ["in", "wi", "mw", "ei", "other"];
const DEGREES = ["ba", "ma"];
const YEARS = ["1", "2", "3", "4+"];
const EXPERIENCES = ["easy", "alright", "difficult", "struggeling", "first_semester"];
const ATTITUDES = ["learning_lover", "score_chaser", "efficient", "pass_prayer"];
const GROUPSIZES = ["two", "three", "three_or_more", "dont_care"];
const LANGUAGES = ["german", "english", "both"];
const PROGRAMSCOPES = ["all", "only_my_program"];
const PREFERENCES = ["fun", "productivity", "munich"];

module.exports = {
    routes: () => [
        {
            method: 'POST',
            path: '/student',
            options: {
                validate: {
                    failAction: async (request, h, err) => {
                        console.error(err);
                        throw err;
                    },
                    payload: Joi.object({ 
                        name: Joi.string().required(),
                        phoneNumber: Joi.string().regex(/^\+[0-9]+/).required(),
                        faculty: Joi.string().valid(...FACULTIES).required(),
                        courses: Joi.array().min(1).max(4).items(Joi.string()).required(),
                        studyStatus: Joi.object({
                            degree: Joi.string().valid(...DEGREES).required(),
                            year: Joi.string().valid(...YEARS).required(),
                        }),
                        prevSemesterExperience: Joi.string().valid(...EXPERIENCES).required(),
                        attitude: Joi.string().valid(...ATTITUDES).required(),
                        comment: Joi.string(),
                        groupSize: Joi.string().valid(...GROUPSIZES).required(),
                        language: Joi.string().valid(...LANGUAGES).required(),
                        programScope: Joi.string().valid(...PROGRAMSCOPES).required(),
                        preferences: Joi.array().items(Joi.string().valid(...PREFERENCES)).required(),
                    })
                }
            },
            handler: async (request, h) => {
                const { payload } = request;
                payload.courses = payload.courses.map(c => ObjectId(c));
                payload.phoneNumber = payload.phoneNumber.replace(/\s/g, "");
                await db.getClient().db().collection("students").insertOne(payload);
                WhatsAppService.sendMessage(payload.phoneNumber, confirmationMessage(payload));
                return {
                    status: "ok",
                };
            }
        }
    ]
}