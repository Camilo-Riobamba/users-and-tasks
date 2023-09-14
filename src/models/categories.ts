import { DataTypes } from 'sequelize'
import sequelize from '../connection/database.js'
import Tasks from './tasks.js'

const Categories = sequelize.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
})

Categories.hasMany(Tasks, {
    foreignKey: 'categoryId',
    sourceKey: 'id'
})

export default Categories
