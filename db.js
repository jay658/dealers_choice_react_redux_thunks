const Sequelize = require ("sequelize")
const db = new Sequelize (process.env.DATABASEURL || "postgres://localhost/acme-react-redux")

const Game = db.define('game', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    genre:{
        type: Sequelize.ENUM('rpg', 'rts', 'moba', 'fps'),
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
})

const Company = db.define('company', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    }
})

Game.belongsTo(Company)
Company.hasMany(Game)


module.exports = {
    Game,
    Company,
    db
}