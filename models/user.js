const Sequelize = require("sequelize");
const sequelize = new Sequelize("user", "root", "my-secret-pw", {
    dialect: "mysql",
    host: "172.17.0.2",
    define: {
        timestamps: false
    }
});



const User = sequelize.define("users",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    login:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = User;