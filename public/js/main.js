import { fetchSkills, fetchEducation, fetchExperience, fetchPersonalInfo, fetchProjects } from './helpers/data-fetcher.js';

init();

let personalInfo = null;
let skills = null;
let education = null;
let experience = null;
let projects = null;

async function init() {
    await registerEventListeners();
}

async function getData() {
    personalInfo = await fetchPersonalInfo();
    if (!personalInfo) alert('Failed to load personal info data');

    skills = await fetchSkills();
    if (!skills) alert('Failed to load skills data');

    education = await fetchEducation();
    if (!education) alert('Failed to load education data');

    experience = await fetchExperience();
    if (!experience) alert('Failed to load experience data');

    projects = await fetchProjects();
    if (!projects) alert('Failed to load projects data');
}

async function registerEventListeners() {   
    document.addEventListener('DOMContentLoaded', async () => {
        await getData();
        await renderPage();
    });
}

async function renderPage() {
    let myNameEl = document.getElementById('my_name');  
    let phoneNbrEl = document.getElementById('phone_nbr');  
    let emailEl = document.getElementById('email');  
    let educationEl = document.getElementById('education_list');  
    let professionalExperienceEl = document.getElementById('professional_experience');  
    let skillsEl = document.getElementById('skills_list');  
    let projectsEl = document.getElementById('projects_list');  

    myNameEl.innerHTML = `My name is <strong>${personalInfo.name}</strong>.`
    phoneNbrEl.innerHTML = `${personalInfo.phone}`;
    emailEl.innerHTML = `${personalInfo.email}`;

    let educationListHtml = education.map(e => `
    <li><strong class="completion-year">${e.completion_year}</strong> - ${e.degree}</li>
    `).join("");

    educationEl.innerHTML = educationListHtml;


    let experienceHtml = experience.map(e => `
    <li class="event" data-date="${e.start_date} - ${e.end_date}">
        <h3>${e.position} - ${e.company}</h3>
        <ul class="bullet-point-list">
        ${(e.tasks || []).map(t => `<li>${t}</li>`).join("")}
        </ul>
    </li>
    `).join("");

    professionalExperienceEl.innerHTML = experienceHtml;

    let skillsListHtml = skills.map(s => `
        <img class="tech-icon" src="${s.icon_url}"  title="${s.skill}"/>
    `).join("");
    skillsEl.innerHTML = skillsListHtml;

    let projectsListHtml = projects.map(p => `
    <div class="card">
        
        <div class="card-header">
        <h1>${p.name}</h1>
        <p>${p.description}</p>
        </div>

        <div class="card-content">
        <div class="skills-list">
            ${p.technologies?.map(s => `
            <img 
                class="tech-icon" 
                src="${s.iconUrl}"  
                title="${s.tech}"
            />
            `).join("") || ""}
        </div>
        </div>

        ${
        (p.demoUrl || p.repoUrl) ? `
            <div class="card-extra-icons-container">
            
            ${
                p.demoUrl ? `
                <a class="card-extra-icon"
                    title="Live demo"
                    href="${p.demoUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img 
                    src="public/images/airplay_white.svg" 
                    alt="Live demo icon">
                </a>
                ` : ""
            }

            ${
                p.repoUrl ? `
                <a class="card-extra-icon"
                    title="Project repository"
                    href="${p.repoUrl}" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <img 
                    src="public/images/github_white.svg" 
                    alt="GitHub icon">
                </a>
                ` : ""
            }

            </div>
        ` : ""
        }

    </div>
    `).join("");

    projectsEl.innerHTML = projectsListHtml;
}