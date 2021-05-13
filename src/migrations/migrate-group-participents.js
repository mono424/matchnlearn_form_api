/**
 * @param {MongoClient} db 
 */
module.exports = async function (db) {
    const groups = await db.collection('groups').find().toArray();
    for (const group of groups) {
        const students = group.students.map(student => {
            return {
                studentId: student._id,
                numberOfMessages: 0,
                lastMessageAt: new Date(0)
            }
        });

        await db.collection('groups').updateOne(
            { _id: group._id },
            {
                $set: {
                    students,
                    lastMessageId: null,
                    lastMessageAt: new Date(0)
                }
            }
        );
    }
};
