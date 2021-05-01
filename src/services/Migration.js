const database = require('../db');
const { scripts } = require('../migrations');

const migrationsCollection = "_migrations_";

module.exports = {

    async migrate() {
        this.log("migrate started");
        for (const script of scripts) {
            await this.runScript(script);
        }
        this.log("migrate ended");
    },

    async runScript({ key, migrateScript }) {
        const isRun = await this.checkScriptAlreadyRun(key);
        if (!isRun) {
            this.log(`migrate '${key}'`);
            try {
                const db = database.getDb();
                await migrateScript(db);
                this.updateCollectionEntry(key);
            } catch (error) {
                this.error(error.message);
                this.updateCollectionEntry(key, error.message);
            }
        }
    },

    async checkScriptAlreadyRun(key) {
        const db = database.getDb();
        const res = await db.collection(migrationsCollection).findOne({ _id: key });
        return !!res && res.success;
    },

    async updateCollectionEntry(key, err = null) {
        const db = database.getDb();
        const res = await db.collection(migrationsCollection).updateOne(
            { _id: key },
            { $set: { success: !err, err, lastRun: new Date()  } },
            { upsert: true }
        );
        return !!res;
    },

    log(text) {
        console.log(`[MIGRATION] ${text}`);
    },

    error(text) {
        console.error(`[MIGRATION] ${text}`);
    }
}; 