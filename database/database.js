const Sequelize =require('sequelize')
const db= new Sequelize({
    dialect : 'sqlite',
    storage: 'users.db'
})
const Users = db.define('user',{
    username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        
        allowNull: true,
      },
      usertype:{
          type:Sequelize.STRING
      },
      usertype:{
        type:Sequelize.NUMBER
    },
      speciality:{
        type:Sequelize.STRING
    },
    experience:{
        type:Sequelize.STRING
    },
    clinic:{
        type:Sequelize.STRING
    },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fbAccessToken: {
        type: Sequelize.STRING,
      },
      ghAccessToken: {
        type: Sequelize.STRING,
      },
      gAccessToken: {
        type: Sequelize.STRING,
      },
    })
    module.exports={db,Users}