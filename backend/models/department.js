module.exports = (sequelize, DataTypes) => {
    const department = sequelize.define('department', {
        department: {
            type: DataTypes.STRING
        }
    })
    department.associate = models => {
        department.hasMany(models.position, {foreignKey: "departmentId"})
        department.hasMany(models.person, {foreignKey: "departmentId"})
    }

    return department
}
