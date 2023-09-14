import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    port: 5432,
    host: 'localhost',
    username: 'postgres',
    database: 'postgres',
    password: 'postgres',
    ssl: true
})

export default sequelize
