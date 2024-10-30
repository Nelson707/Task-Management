const Task = require('../models/task')

const addTask = async (req, res) =>{
    try {
        const {
            name,
            status,
            projects,
            assignedUsers
        } = req.body;
    
        if(!name){
            res.status(400).json({success:false, message:"Project is required"})
        }
    
        const newTask = new Task({
            name: name,
            status: status || 'To Do',
            projects: projects,
            assignedUsers: assignedUsers
        })
    
        const task = await newTask.save();
        res.status(200).json({success: true, data: task});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const editTask = async (req, res) =>{
    try {
        const { taskId } = req.params;
        const {
            name,
            status,
            projects,
            assignedUsers
        } = req.body;

        let query = {_id: taskId}
        let data = {
            name: name,
            status: status,
            projects: projects,
            assignedUsers: assignedUsers
        }

        await Task.updateOne(query, data);
        res.status(200).json({
            success: true, 
            message: 'Task updated successfully',
            data: data});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const getTasks = async (req, res) =>{
    try{
        const task = await Task.find({})
        res.status(200).json({
            success: true, 
            data: task});
    }catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const getTask = async (req, res) =>{
    try {
        const {taskId} = req.params;
        const task = await Task.findById(taskId);
        res.status(200).json({success:true, data:task});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const deleteTask = async (req, res) =>{
    try {
        const {taskId} = req.params;
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({success:true, message:'Task deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {addTask, editTask, getTasks, getTask, deleteTask}