const express = require('express');
const {addTask, editTask, getTasks, getTask, deleteTask} = require('../controllers/taskController')

const taskRouter = express.Router();

taskRouter.post('/addTask', addTask)
taskRouter.post('/editTask/:taskId', editTask)
taskRouter.get('/getTasks', getTasks)
taskRouter.get('/getTask/:taskId', getTask)
taskRouter.delete('/deleteTask/:taskId', deleteTask)

module.exports = taskRouter;