module.exports = {
    scripts: [
        {
            key: "group-size-from-num-to-alpha",
            migrateScript: require('./group-size-from-num-to-alpha')
        },
        {
            key: "wa-meta-phoneNumber-to-studentId",
            migrateScript: require('./wa-meta-phoneNumber-to-studentId')
        }
    ]
}