const API_URL = '/api';

// Select DOM elements
const nameEl = document.getElementById('name');
const bioEl = document.getElementById('bio');
const socialLinksEl = document.getElementById('social-links');
const skillsListEl = document.getElementById('skills-list');
const projectsListEl = document.getElementById('projects-list');
const educationListEl = document.getElementById('education-list');
const skillSearchInput = document.getElementById('skill-search');
const yearEl = document.getElementById('year');
const footerNameEl = document.getElementById('footer-name');

// Fetch Profile Data
async function fetchProfile() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const profile = await response.json();
        renderProfile(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        nameEl.textContent = 'Error loading profile';
    }
}

// Render Profile Data
function renderProfile(profile) {
    // Header Info
    nameEl.textContent = profile.name;
    footerNameEl.textContent = profile.name;
    bioEl.textContent = profile.about;
    yearEl.textContent = new Date().getFullYear();

    // Social Links
    socialLinksEl.innerHTML = '';
    if (profile.social) {
        Object.entries(profile.social).forEach(([platform, link]) => {
            if (link) {
                const iconClass = `fa-brands fa-${platform}`;
                const a = document.createElement('a');
                a.href = link;
                a.target = '_blank';
                a.className = 'social-icon text-decoration-none';
                a.innerHTML = `<i class="${iconClass}"></i>`;
                socialLinksEl.appendChild(a);
            }
        });
    }

    // Skills
    renderSkills(profile.skills || []);

    // Projects
    renderProjects(profile.projects || []);

    // Education
    renderEducation(profile.education || []);

}

function renderSkills(skills) {
    skillsListEl.innerHTML = skills.map(skill => `<span class="badge badge-skill rounded-pill">${skill}</span>`).join('');
}

function renderProjects(projects) {
    if (projects.length === 0) {
        projectsListEl.innerHTML = '<div class="col-12"><p class="text-muted text-center py-5 bg-light rounded-3">No projects found matching that skill.</p></div>';
        return;
    }

    projectsListEl.innerHTML = projects.map(project => `
        <div class="col-md-6 col-lg-5 mb-4">
            <div class="card h-100 project-card-custom border-0 shadow-sm p-3">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <h3 class="h5 fw-bold text-dark mb-0">${project.title}</h3>
                    </div>
                    
                    <p class="card-text text-secondary small mb-4 flex-grow-1" style="line-height: 1.6;">${project.description}</p>
                    
                    <div class="mt-auto">
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            ${project.technologies.map(tech => `<span class="project-tech-badge">${tech}</span>`).join('')}
                        </div>
                        ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="project-link-btn">Live Link <i class="fas fa-arrow-right small"></i></a>` : ''}<br><br>
                         ${project.codeLink ? `<a href="${project.codeLink}" target="_blank" class="project-link-btn">Github Link <i class="fas fa-arrow-right small"></i></a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderEducation(education) {
    if (!education || education.length === 0) {
        educationListEl.innerHTML = '<p class="text-muted small">No education listed yet.</p>';
        return;
    }
    educationListEl.innerHTML = education.map(edu => `
        <div class="timeline-item mb-2">
            <h3 class="h6 fw-bold text-dark mb-1">${edu.school}</h3>
            <div class="d-flex justify-content-between align-items-center">
                <span class="small text-secondary fw-medium">${edu.degree}</span>
                <span class="badge bg-light text-dark border">${edu.year}</span>
            </div>
        </div>
    `).join('');
}

// Search Projects
let debounceTimeout;
skillSearchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        searchProjects(query);
    }, 300);
});

async function searchProjects(skill) {
    try {
        let url = `${API_URL}/projects`;
        if (skill) {
            url += `?skill=${encodeURIComponent(skill)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error searching projects:', error);
    }
}

// Initial Load
document.addEventListener('DOMContentLoaded', fetchProfile);
