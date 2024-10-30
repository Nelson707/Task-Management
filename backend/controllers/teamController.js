const Team = require('../models/team');

const addTeam = async (req,res) =>{
    try {
        const{
            name,
            members,
            projects
        } = req.body

        if(!name){
            res.status(400).json({success:false, message:'Team name is required'})
        }

        const newTeam = new Team({
            name:name,
            members:members,
            projects:projects
        })

        await newTeam.save();
        res.status(200).json({
            success:true, 
            message:'Team added successfully',
            data:newTeam
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const editTeam = async (req, res) =>{
    try {
        const { teamId } = req.params
        const{
            name,
            members,
            projects
        } = req.body

        let query = {_id:teamId}
        let data = {
            name:name,
            members:members,
            projects:projects
        }

        await Team.updateOne(query,data)
        res.status(200).json({
            success:true, 
            message:'Team added successfully',
            data:data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const getTeams = async (req,res) =>{
    try {
        const team = await Team.find({})
        res.status(200).json({success: true, data: team});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const getTeam = async (req,res) =>{
    try {
        const { teamId } = req.params;
        const team = await Team.findById(teamId);
        res.status(200).json({success: true, data: team});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

const deleteTeam = async (req,res) =>{
    try {
        const { teamId } = req.params;
        await Team.findByIdAndDelete(teamId);
        res.status(200).json({success:true, message:"Team deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {addTeam, editTeam, getTeams, getTeam, deleteTeam}