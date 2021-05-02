module.exports = {
    scripts: [
        {
            key: "group-size-from-num-to-alpha",
            migrateScript: require('./group-size-from-num-to-alpha')
        },
        {
            key: "ws-logs-studentid-and-flag",
            migrateScript: require('./ws-logs-studentid-and-flag')
        },
        {
            key: "add-created-at-to-students",
            migrateScript: require('./add-created-at-to-students')
        }
    ]
}