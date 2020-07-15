module.exports = (sequelize, DataTypes) => {
    const timeAttendance = sequelize.define('timeAttendance', {
        date: {
            type: DataTypes.STRING
        },
        clockIn: {
            type: DataTypes.STRING,
            timestamps: true
        },
        clockOut: {
            type: DataTypes.STRING,
            timestamps: true
        },
        workingTime: {
            type: DataTypes.STRING
        },
        
        remark: {
            type: DataTypes.STRING
        },
    })
    timeAttendance.associate = models => {
        timeAttendance.belongsTo(models.person, {foreignKey: "personId"})
    }

    return timeAttendance
}