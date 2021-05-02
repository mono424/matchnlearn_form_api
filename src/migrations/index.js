module.exports = {
    scripts: [
        {
            key: "group-size-from-num-to-alpha",
            migrateScript: require('./group-size-from-num-to-alpha')
        },
        {
            key: "ws-logs-phonenumber-to-studentid",
            migrateScript: require('./ws-logs-phonenumber-to-studentid')
        },
        {
            key: "add-created-at-to-students",
            migrateScript: require('./add-created-at-to-students')
        }
    ]
}