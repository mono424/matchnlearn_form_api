function fixNumber(number) {
    number = number.replace(/[^0-9]/g, "");
    number = number.replace(/^00/, "");
    number = number.replace(/^0/, "49");
    return "+" + number;
}

/**
 * @param {MongoClient} db 
 */
module.exports = async function (db) {
    const students = await db.collection('students').find().toArray();
    for (const student of students) {
        const phoneNumber = fixNumber(student.phoneNumber);
            
        await db.collection('students').updateOne(
            { _id: student._id },
            { $set: { phoneNumber } }
        );
    }
};
