const Project = require('../models/project')

const addProject = async (req, res) =>{
    try {
        const {
            name,
            description,
            creator,
            tasks,
            members,
            status
        } = req.body

        if(!name) {
            return res.status(400).json({success: false, message: 'Project name is required'});
        }
        if(!description) {
            return res.status(400).json({success: false, message: 'Project description is required'});
        }
        if(!creator) {
            return res.status(400).json({success: false, message: 'Creator is required'});
        }
        
    
        const newProject = new Project({
            name: name,
            description: description,
            creator: creator,
            tasks: tasks,
            members: members,
            status: status || 'To Do'
        })

        await newProject.save()
        res.status(200).json({success: true, data: newProject})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}


module.exports = {addProject}