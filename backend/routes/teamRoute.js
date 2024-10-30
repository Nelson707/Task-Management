const express = require('express');
const {addTeam, editTeam, getTeams, getTeam, deleteTeam} = require('../controllers/teamController')

const teamRouter = express.Router();

teamRouter.post('/addTeam', addTeam)
teamRouter.post('/editTeam/:teamId', editTeam)
teamRouter.get('/getTeams', getTeams)
teamRouter.get('/getTeam/:teamId', getTeam)
teamRouter.delete('/deleteTeam/:teamId', deleteTeam)

module.exports = teamRouter;