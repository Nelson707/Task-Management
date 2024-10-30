const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        default: 'To Do'
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    assignedUsers: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
})

const Task = mongoose.model('Task', tasksSchema)

module.exports = Task;
