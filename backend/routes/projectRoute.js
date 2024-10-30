const express = require('express');
const { addProject, getProjects, getProject, editProject, deleteProject } = require('../controllers/projectController');

const projectRouter = express.Router();

projectRouter.post('/addProject', addProject);
projectRouter.get('/getProjects', getProjects);
projectRouter.get('/getProject/:id', getProject);
projectRouter.delete('/deleteProject/:id', deleteProject);
projectRouter.post('/editProject/:id', editProject);

module.exports = projectRouter;
