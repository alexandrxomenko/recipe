const Sequelize = require("sequelize");
const sequelize = new Sequelize("user", "root", "my-secret-pw", {
    dialect: "mysql",
    host: "172.17.0.2",
    define: {
        timestamps: false
    }
});


module.exports =  FirstCourse = sequelize.define("First-Course",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    urSer: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    recept: {
        type : Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
