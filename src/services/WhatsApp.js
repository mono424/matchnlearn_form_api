const axios = require("axios").default;

const client = axios.create({
    baseURL: process.env.WHATSAPP_API_URL,
    auth: {
        username: process.env.WHATSAPP_API_USER,
        password: process.env.WHATSAPP_API_PASS
    },
    timeout: 60 * 1000
});

module.exports = {
    sendMessage(studentId, message) {
        return client.post("/message", {
            studentId,
            message
        });
    }
}
