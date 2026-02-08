const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Profile = require('./src/models/Profile');

const seedData = {
    name: "Sumit chahar",
    email: "sumitchahar325@gmail.com",
    about: "I am a Full Stack Developer passionate about building web applications.",
    skills: ["JavaScript", "Node.js", "MongoDB", "React", "Python", "Express", "GIT"],
    education: [
        {
            school: "Global Institute of Technology",
            degree: "Bachelor in Computer Science",
            year: "2024"
        }
    ],
    projects: [
        {
            title: "LiveMeet",
            description: "A real-time video conferencing application featuring peer-to-peer communication and instant messaging.",
            technologies: ["React", "WebRTC", "Socket.io", "Node.js"],
            codeLink: "https://github.com/Sumitchahar317/LiveMeet-Video-call-.git",
            liveLink: "https://livemeet-client-bbe4ch108-sumitchahar317s-projects.vercel.app"
        },
        {
            title: "CarePulse",
            description: "A healthcare support web application designed for patient and volunteer registration and management.",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            codeLink: "https://github.com/Sumitchahar317/CarePluse.git",
            liveLink: " https://carepluse-ctgqb3wd4-sumitchahar317s-projects.vercel.app/"
        },
        {
            title: "Task Manager",
            description: "A RESTful API for managing tasks.",
            technologies: ["Node.js", "Express", "PostgreSQL"],
            codeLink: "https://github.com/Sumitchahar317/TaskManager.git",
            liveLink: "https://taskmanager-dkac.onrender.com/tasks"
        },
        {
            title: "SocialApp",
            description: "A full-stack social media application featuring JWT authentication, a centralized news feed, and real-time post interactions.",
            technologies: ["MongoDB", "Express", "React", "Node.js", "JWT"],
            codeLink: "https://github.com/Sumitchahar317/socialApp.git",
            liveLink: "https://social-app-qbdu.vercel.app/"

        },
        {
            title: "WanderLust",
            description: "A full-stack vacation rental platform inspired by Airbnb, allowing users to list, browse, and book unique accommodations.",
            technologies: ["Node.js", "Express", "MongoDB", "Passport.js"],
            codeLink: "https://github.com/Sumitchahar317/WanderLust.git",
            //  liveLink: "https://wanderlust-ctgqb3wd4-sumitchahar317s-projects.vercel.app/"
        },

    ],
    social: {
        linkedin: "www.linkedin.com/in/sumit-chahar-4827b0253",
        github: "https://github.com/Sumitchahar317?tab=repositories",
    }
};

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/me-api');
        console.log('MongoDB Connected for Seeding');

        // Clear existing profile
        await Profile.deleteMany({});
        console.log('Cleared existing profiles');

        // Insert new profile
        await Profile.create(seedData);
        console.log('Database Seeded Successfully!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
