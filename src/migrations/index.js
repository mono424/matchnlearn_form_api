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
        },
        {
            key: "migrate-group-participents",
            migrateScript: require('./migrate-group-participents')
        },
        {
            key: "student-number-migration2",
            migrateScript: require('./student-number-migration')
        }
    ]
}