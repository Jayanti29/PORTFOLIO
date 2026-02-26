const profile = {
  name: "Jayanti Gautam",
  role: "BCA (Data Science) Student",
  githubUsername: "Jayanti29",
  githubUrl: "https://github.com/Jayanti29",
  linkedinUrl: "https://www.linkedin.com/in/jayanti-gautam-066793312/",
  resumePrimary: "./JAYANTI_GAUTAM.pdf",
  resumeAlt: "./jayanti_beerbiceps.pdf",
  email: "jayantigautam29@gmail.com",
  aboutShort:
    "Motivated BCA Data Science student building practical solutions in data, web, and digital growth.",
  aboutFull:
    "I am a BCA (Data Science) student at Presidency University, Bengaluru. I have hands-on internship experience across technology research, web development, SEO/SMM, and digital strategy. I enjoy solving real-world problems with a mix of data thinking, product mindset, and user-focused execution.",
  skills: [
    "Java",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "C",
    "DSA",
    "Machine Learning Fundamentals",
    "Data Analysis",
    "SEO",
    "SMM",
    "Project Management",
    "Poster Designing",
    "PPT",
    "Research Paper Writing"
  ],
  languages: ["English", "Hindi", "Maithali", "Urdu"],
  education: [
    {
      degree: "BCA (Data Science)",
      school: "Presidency University",
      year: "July 2024 - August 2027"
    },
    {
      degree: "10th - 12th (Senior High)",
      school: "St. Joseph Public School, Bengaluru (Chokkanahalli, Arekere Colony, 562163)",
      year: "May 2013 - 2023"
    }
  ],
  internships: [
    {
      company: "ScanPick Pvt Ltd",
      role: "Internship",
      duration: "Sep 28 - December (Certification)",
      points: [
        "Conducted research on software and hardware technologies to support product development.",
        "Assisted in feasibility analysis, documentation, and prototype evaluations.",
        "Collaborated with teams to contribute insights for tech innovation."
      ]
    },
    {
      company: "InAmigos",
      role: "Internship (Paid)",
      duration: "January - February",
      points: [
        "Conducted research for community-focused and social impact initiatives.",
        "Supported data collection, analysis, and report preparation.",
        "Contributed insights for strategy and outreach efforts."
      ]
    },
    {
      company: "DigiShuja",
      role: "Internship (Paid)",
      duration: "January - Present",
      points: [
        "Developing and maintaining responsive websites for digital marketing campaigns.",
        "Researching web technology and UX trends to improve performance.",
        "Collaborating with design/marketing teams for SEO-friendly implementations."
      ]
    },
    {
      company: "Zaroshka",
      role: "Website Support Internship (Paid)",
      duration: "Duration: Update",
      points: [
        "Provided website maintenance and technical support.",
        "Updated website content and improved user experience.",
        "Coordinated with design and marketing teams for performance optimization."
      ]
    },
    {
      company: "Baricha (Tea Brand)",
      role: "Digital Marketing & Website Support Internship",
      duration: "Duration: Update",
      points: [
        "Supported digital marketing campaigns on social media.",
        "Assisted in website development, updates, and monitoring.",
        "Contributed to SEO and online brand positioning."
      ]
    }
  ]
};

function fillStaticData() {
  const byId = (id) => document.getElementById(id);

  if (byId("aboutShort")) byId("aboutShort").textContent = profile.aboutShort;
  if (byId("aboutText")) byId("aboutText").textContent = profile.aboutFull;

  byId("githubLink").href = profile.githubUrl;
  byId("linkedinLink").href = profile.linkedinUrl;
  byId("resumeTopLink").href = profile.resumePrimary;

  byId("emailLink").href = `mailto:${profile.email}`;
  byId("emailLink").textContent = profile.email;

  const educationList = byId("educationList");
  profile.education.forEach((item) => {
    const div = document.createElement("div");
    div.className = "edu-item";
    div.innerHTML = `<strong>${item.degree}</strong><br>${item.school} • ${item.year}`;
    educationList.appendChild(div);
  });

  const skillsGrid = byId("skillsGrid");
  profile.skills.forEach((s) => {
    const chip = document.createElement("span");
    chip.className = "skill";
    chip.textContent = s;
    skillsGrid.appendChild(chip);
  });

  if (byId("languageList")) {
    byId("languageList").textContent = `Languages: ${profile.languages.join(", ")}`;
  }

  if (byId("footerText")) {
    byId("footerText").textContent = `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`;
  }
}

function fillInternships() {
  const wrap = document.getElementById("internshipsGrid");
  if (!wrap) return;
  profile.internships.forEach((item) => {
    const card = document.createElement("article");
    card.className = "project";
    card.innerHTML = `
      <h3>${item.company}</h3>
      <div class="meta">${item.role} • ${item.duration}</div>
      <ul>
        ${item.points.map((p) => `<li>${p}</li>`).join("")}
      </ul>
    `;
    wrap.appendChild(card);
  });
}

async function loadGithubProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "<p>Loading projects...</p>";
  try {
    const res = await fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=12`);
    const repos = await res.json();
    const list = repos.filter((r) => !r.fork).slice(0, 9);
    grid.innerHTML = "";
    list.forEach((repo) => {
      const card = document.createElement("article");
      card.className = "project";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <div class="meta">${repo.language || "N/A"} • ★ ${repo.stargazers_count}</div>
        <a href="${repo.html_url}" target="_blank" rel="noreferrer">View Repository</a>
      `;
      grid.appendChild(card);
    });
  } catch {
    grid.innerHTML = "<p>Unable to fetch projects right now.</p>";
  }
}

fillStaticData();
fillInternships();
loadGithubProjects();
function initBlasterCursor() {
  const c = document.createElement("div");
  c.className = "blaster";
  c.innerHTML = `<span class="body"></span><span class="barrel"></span><span class="grip"></span><span class="muzzle"></span>`;
  document.body.appendChild(c);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  window.addEventListener("mousemove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });

  window.addEventListener("mousedown", () => c.classList.add("fire"));
  window.addEventListener("mouseup", () => c.classList.remove("fire"));

  function tick() {
    x += (tx - x) * 0.3;
    y += (ty - y) * 0.3;
    c.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(tick);
  }
  tick();
}

initBlasterCursor();
