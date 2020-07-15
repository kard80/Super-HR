module.exports = (sequelize, DataTypes) => {
    const leave = sequelize.define('leave', {
        type: {
            type: DataTypes.STRING
        },
        startDate: {
            type: DataTypes.DATEONLY
        },
        endDate: {
            type: DataTypes.DATEONLY
        },
        timeStartDate: {
            type: DataTypes.STRING,
        },
        timeEndDate: {
            type: DataTypes.STRING
        },
        reason: {
            type: DataTypes.STRING
        },
        totalDate: {
            type: DataTypes.STRING
        }
    })
    leave.associate = models => {
        leave.belongsTo(models.person, {foreignKey: "personId"})
    }

    return leave
}