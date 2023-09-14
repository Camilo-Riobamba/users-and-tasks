import { DataTypes } from 'sequelize'
import sequelize from '../connection/database.js'

import Task from './tasks.js'

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})

Users.hasMany(Task, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

export default Users
