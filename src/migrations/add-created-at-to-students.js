/**
 * @param {MongoClient} db 
 */
module.exports = async function (db) {
    const students = await db.collection('students').find().toArray();
    for (const student of students) {

        await db.collection('students').updateOne(
            { _id: student._id },
            { $set: { createdAt: new Date() } }
        );
    }
};
