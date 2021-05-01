const groupSizeMap = {
    "2": "two",
    "3": "three",
    "3+": "three_or_more",
    "dont_care": "dont_care",
};

/**
 * @param {MongoClient} db 
 */
module.exports = async function (db) {
    const students = await db.collection('students').find().toArray();
    for (const student of students) {
        const newGroupSize = groupSizeMap[student.groupSize];

        await db.collection('students').updateOne(
            { _id: student._id },
            { $set: { groupSize: newGroupSize } }
        );
    }
};
