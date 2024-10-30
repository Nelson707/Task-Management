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

const editProject = async (req, res) =>{
    const { id } = req.params;
    const {
        name,
        description,
        creator,
        tasks,
        members,
        status
    } = req.body

    try {
    
        const project = await Project.findByIdAndUpdate(id);

        if(!project){
            return res.status(400).json({success: false, message: 'Project not found'});
        }

        if(name) project.name = name;
        if(description) project.description = description;
        if(creator) project.creator = creator;
        if(tasks) project.tasks = tasks;
        if(members) project.members = members;
        if(status) project.status = status;

        const updatedProject = await project.save();


        return res.status(200).json({
            success: true, 
            message: 'Project updated successfully',
            project: updatedProject
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const getProjects = async (req, res) =>{
    try{
        const projects = await Project.find({});
        res.status(200).json({success:true, data: projects});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const getProject = async (req, res) =>{
    try {
        const { id } = req.params;
        const project = await Project.findById(id)
        res.status(200).json({success:true, data: project});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const deleteProject = async (req, res) =>{
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true, messge: 'Project deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}


module.exports = {addProject, editProject, getProjects, getProject, deleteProject}