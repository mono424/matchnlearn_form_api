/**
 * @param {MongoClient} db 
 */
module.exports = async function (db) {
    const logs = await db.collection('whatsapp-logs').find().toArray();
    for (const log of logs) {
        if (log.meta.number) {
            const student = await db.collection('students').findOne({ phoneNumber: log.meta.number });

            await db.collection('whatsapp-logs').updateOne(
                { _id: log._id },
                { $set: { meta: { ...log.meta, studentId: student._id.toString() } } }
            );
        }
    }
};
