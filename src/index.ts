import e from 'express'
import expressAsyncHandler from 'express-async-handler'

import sequelize from './connection/database.js'
import Users from './models/users.js'
import Tasks from './models/tasks.js'
import Categories from './models/categories.js'

const app = e()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get(
    '/users',
    expressAsyncHandler(async (_req, res) => {
        const users = await Users.findAll()
        res.json(users)
    })
)
app.get(
    '/users/:userId',
    expressAsyncHandler(async (req, res) => {
        const user = await Users.findByPk(req.params.userId)
        res.json(user)
    })
)
app.post(
    '/users',
    expressAsyncHandler(async (req, res) => {
        const user = await Users.create(req.body)
        res.json(user)
    })
)

app.get(
    '/tasks/:userId',
    expressAsyncHandler(async (req, res) => {
        const tasks = await Tasks.findAll({
            where: {
                userId: req.params.userId
            }
        })
        res.json(tasks)
    })
)
app.post(
    '/tasks/',
    expressAsyncHandler(async (req, res) => {
        const task = await Tasks.create(req.body)
        res.json(task)
    })
)

app.get(
    '/tasks',
    expressAsyncHandler(async (req, res) => {
        const task = await Tasks.findAll()
        res.json(task)
    })
)
app.put(
    '/tasks/:taskId',
    expressAsyncHandler(async (req, res) => {
        const task = await Tasks.findByPk(req.params.taskId)
        if (task == null) res.status(404).send('Task not found')

        task.completed = req.body.completed

        await task.save()
        res.json(task)
    })
)
app.delete(
    '/tasks/:taskId',
    expressAsyncHandler(async (req, res) => {
        const task = await Tasks.findByPk(req.params.taskId)
        void task.destroy()
        res.json(task)
    })
)

app.post(
    '/categories/',
    expressAsyncHandler(async (req, res) => {
        const category = Categories.create(req.body)
        res.json(category)
    })
)

try {
    await sequelize.sync()
    console.log('Connection has been established successfully.')
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    })
} catch (error) {
    console.error('Unable to connect to the database:', error)
}
