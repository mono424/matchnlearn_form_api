const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const { ObjectId } = require('mongodb');
const db = require('../db');
const WhatsAppService = require('../services/WhatsApp');

const confirmationMessage = ({ name }) => `**MatchNLearn Confirmation** Hey ${name}, thank you for using MatchNLearn to find a study-group.`;

const GRADES = [1, 2, 3, 4];
const PREPARATION = ["A", "B", "C", "D", "E"];

const validKeysOfCourseRelatedObject = (obj, courses) => {
    for (const key of Object.keys(obj)) {
        if (!courses.includes(key)) return false;
    }
    return true;
}

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
                        courses: Joi.array().min(1).max(4).items(Joi.string()).required(),
                        grades: Joi.object(),
                        preparation: Joi.object(),
                    })
                }
            },
            handler: async (request, h) => {
                const { payload } = request;
                
                // Validate grades and preparation
                if (
                    !validKeysOfCourseRelatedObject(payload.grades, payload.courses) ||
                    Object.values(payload.grades).filter(g => !GRADES.includes(g)).length > 0
                ) return Boom.badRequest("Invalid format of key 'grades'.");
                if (
                    !validKeysOfCourseRelatedObject(payload.preparation, payload.courses) ||
                    Object.values(payload.preparation).filter(p => !PREPARATION.includes(p)).length > 0
                ) return Boom.badRequest("Invalid format of key 'grades'.");

                // Add additional information and create record and send whatsapp message
                payload.courses = payload.courses.map(c => ObjectId(c));
                payload.phoneNumber = payload.phoneNumber.replace(/\s/g, "");
                payload.createdAt = new Date();
                payload.version = 2;
                const result = await db.getClient().db().collection("students").insertOne(payload);
                WhatsAppService.sendMessage(result.insertedId, confirmationMessage(payload));
                return {
                    status: "ok",
                };
            }
        }
    ]
}