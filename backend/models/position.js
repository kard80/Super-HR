module.exports = (sequelize, DataTypes) => {
    const position = sequelize.define('position', {
        position: {
            type: DataTypes.STRING
        }
    })
    position.associate = models => {
        position.hasMany(models.person, {foreignKey: "positionId"})

        position.belongsTo(models.department, {foreignKey: "departmentId"})
    }

    return position
}