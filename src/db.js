const { MongoClient, Db } = require("mongodb");

module.exports = {
    _client: null,
    _db: null,

    /**
     * Returns the mongodb client
     * @returns {MongoClient}
     */
    getClient() {
        return this._client;
    },

        /**
     * Returns the mongodb client
     * @returns {Db}
     */
    getDb() {
        return this._client.db();
    },

    async init(url) {
        const client = new MongoClient(url);
        await client.connect();
        this._client = client;
    }

}