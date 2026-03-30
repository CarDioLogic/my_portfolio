export function fetchSkills() {
    return fetch('data/skills.json').then(res => res.json());
}

export function fetchEducation() {
    return fetch('data/education.json').then(res => res.json());
}

export function fetchExperience() {
    return fetch('data/experience.json').then(res => res.json());
}

export function fetchPersonalInfo() {
    return fetch('data/personal-info.json').then(res => res.json());
}

export function fetchProjects() {
    return fetch('data/projects.json').then(res => res.json());
}