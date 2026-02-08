const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  about: { type: String }, 
  education: [
    {
      school: String,
      degree: String,
      year: String
    }
  ],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      technologies: [String],
      codeLink: String,
      liveLink: String
    }
  ],
  social: {
    linkedin: String,
    github: String,
    twitter: String
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
