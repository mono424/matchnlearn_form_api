const axios = require("axios").default;

const client = axios.create({
    baseURL: process.env.WHATSAPP_API_URL,
});

module.exports = {
    sendMessage(number, message) {
        return client.post("/message", {
            number,
            message
        });
    }
}
