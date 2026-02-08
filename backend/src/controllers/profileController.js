const Profile = require('../models/Profile');

// Create or Update Profile
exports.createProfile = async (req, res) => {
    try {
        // Only allow one profile for this personal portfolio
        let profile = await Profile.findOne();
        if (profile) {
            return res.status(400).json({ msg: 'Profile already exists. Use PUT to update.' });
        }

        profile = new Profile(req.body);
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Projects with Filtering
exports.getProjects = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }

        let projects = profile.projects;
        const { skill } = req.query;

        if (skill) {
            projects = projects.filter(project =>
                project.technologies.some(tech => tech.toLowerCase().includes(skill.toLowerCase()))
            );
        }

        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
