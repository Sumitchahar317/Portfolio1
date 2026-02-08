const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// @route   GET /api/profile
// @desc    Get current user profile
// @access  Public
router.get('/profile', profileController.getProfile);

// @route   POST /api/profile
// @desc    Create user profile
// @access  Private (but public for this demo)
router.post('/profile', profileController.createProfile);


// @route   GET /api/projects
// @desc    Get all projects or filtered by skill
// @access  Public
router.get('/projects', profileController.getProjects);

module.exports = router;
