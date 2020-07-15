module.exports = (sequelize, DataTypes) => {
    const person = sequelize.define('person', {
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            isEmail: true,
        },
        gender: {
            type: DataTypes.STRING
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY
        },
        martialStatus: {
            type: DataTypes.STRING
        },
        nationality: {
            type: DataTypes.STRING
        },
        IDNumber: {
            type: DataTypes.STRING
        },
        contactNumber: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        employeeCode: {
            type: DataTypes.STRING,
        },
        workingStartDate: {
            type: DataTypes.DATE
        },
        probationEndDate: {
            type: DataTypes.DATE
        },
        employeeType: {
            type: DataTypes.STRING
        },
        employeeStatus: {
            type: DataTypes.STRING
        },
        resignationDate: {
            type: DataTypes.DATE
        },
        resignationReason: {
            type: DataTypes.STRING
        },
        taxID: {
            type: DataTypes.STRING
        },
        accountNO: {
            type: DataTypes.STRING
        },
        accountName: {
            type: DataTypes.STRING
        },
        compensationType: {
            type: DataTypes.STRING
        },
        salary: {
            type: DataTypes.STRING
        },
        picture: {
            type: DataTypes.STRING
        }
    })
    person.associate = models => {
        person.hasMany(models.leave, {foreignKey: "personId"})
        person.hasMany(models.timeAttendance, {foreignKey: "personId"})
        
        person.belongsTo(models.position, {foreignKey: "positionId"})
        person.belongsTo(models.department, {foreignKey: 'departmentId'})
        person.belongsTo(models.user, {foreignKey: 'userId'})
    }

    return person
}
