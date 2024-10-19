const express = require('express');
const { addProject } = require('../controllers/projectController');

const projectRouter = express.Router();

projectRouter.post('/addProject', addProject);

module.exports = projectRouter;
