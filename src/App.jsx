import Chatbot from "./Chatbot";
import { useMemo, useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const data = useMemo(
    () => ({
      name: "Sawan Kumar",
      role: "Aspiring Software Development Engineer | Backend-focused",
      location: "India",
      summary:
        "I’m a Backend-focused Software Development Engineer in the making with strong foundations in Data Structures and Algorithms. Experienced in building scalable REST APIs using Python and FastAPI. Passionate about writing clean, efficient, and production-ready code. Actively strengthening problem-solving skills for product-based engineering roles..",

      email: "sawankumar2823@gmail.com",
      github: "https://github.com/sawankumar2823-ship-it",
      linkedin: "https://www.linkedin.com/in/sawan-kumar-57338932b",
      profilePhoto: "profile.jpg",
      resume: "Sawan_Resume.pdf",

      skills: [
        "Python",
        "Java",
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Git & GitHub",
      ],

      projects: [
        {
          title: "Resume Website",
          desc: "A modern personal resume website built using React with gradient themes, smooth UI, and tilt cards.",
          tech: ["React", "CSS"],
          link: "#",
        },
        {
          title: "Voice Recognition Project",
          desc: "A project that detects voice and performs actions using Python and APIs.",
          tech: ["Python", "API"],
          link: "#",
        },
        {
          title: "Java OOP Mini Projects",
          desc: "Collection of Java programs using OOP concepts and logic.",
          tech: ["Java", "OOP"],
          link: "#",
        },
      ],

      education: [
        {
          degree: "B.Tech - CSE",
          college: "NIST University",
          year: "2024 - 2028",
        },
        {
          degree: "Intermediate",
          college: "SR DAV PUBLIC SCHOOL , PUNDAG , RANCHI",
          year: "2022 - 2024",
        },
        {
          degree: "Matriculation",
          college: "SR DAV PUBLIC SCHOOL , PUNDAG , RANCHI",
          year: "2020 - 2022",
        },
      ],

      certificates: [],
    }),
    [],
  );

  const themes = [
    { id: "theme-aurora", label: "Aurora" },
    { id: "theme-sunset", label: "Sunset" },
    { id: "theme-ocean", label: "Ocean" },
    { id: "theme-neon", label: "Neon" },
  ];

  const [theme, setTheme] = useState(themes[0].id);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  /* FIX: Prevent page scrolling when modal opens */
  useEffect(() => {
    if (isPhotoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPhotoOpen]);

  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 8;
    const rotateX = -((y - midY) / midY) * 8;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  };

  const handleTiltLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Education", id: "education" },
    { name: "Certificates", id: "certificates" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <div className={`page ${theme}`}>
        {/* PHOTO MODAL */}
        {isPhotoOpen && (
          <div className="photo-modal" onClick={() => setIsPhotoOpen(false)}>
            <div
              className="photo-modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="photo-close"
                onClick={() => setIsPhotoOpen(false)}
              >
                ✕
              </button>

              <img
                src={data.profilePhoto}
                alt="Big Profile"
                className="photo-big"
              />
            </div>
          </div>
        )}

        {/* Navbar */}
        <div className="navbar">
          <div className="container navbar-inner">
            <div className="logo">{data.name}</div>

            <div className="nav-links">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.name}
                </a>
              ))}
            </div>

            <div className="theme-switch">
              {themes.map((t) => (
                <button
                  key={t.id}
                  className={`theme-btn ${theme === t.id ? "active" : ""}`}
                  onClick={() => setTheme(t.id)}
                  title={t.label}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="container hero">
          <div className="hero-grid">
            <div>
              <p className="small">👋 Hello, I’m {data.name}</p>
              <h1>{data.role}</h1>
              <p>{data.summary}</p>

              <div className="btn-row">
                <a className="btn btn-primary" href="#contact">
                  Contact Me
                </a>

                <a
                  className="btn btn-glow"
                  href={data.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download Resume
                </a>

                <a
                  className="btn btn-outline"
                  href={data.github}
                  target="_blank"
                >
                  GitHub
                </a>

                <a
                  className="btn btn-outline"
                  href={data.linkedin}
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div
              className="card tilt-card"
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
            >
              <div className="profile">
                <img
                  src={data.profilePhoto}
                  alt="Profile"
                  className="profile-photo clickable-photo"
                  onClick={() => setIsPhotoOpen(true)}
                  title="Click to view"
                />

                <div>
                  <div className="profile-name">{data.name}</div>
                  <div className="small">{data.location}</div>
                </div>
              </div>

              <div style={{ marginTop: "18px" }} className="small">
                <p>📧 {data.email}</p>
                <p style={{ marginTop: "8px" }}>💻 {data.github}</p>
                <p style={{ marginTop: "8px" }}>🔗 {data.linkedin}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="container section" id="about">
          <h2>About Me</h2>
          <p>
            {data.summary} My goal is to become a strong software developer and
            contribute to impactful products.
          </p>
        </div>

        {/* Skills */}
        <div className="container section" id="skills">
          <h2>Skills</h2>
          <div className="skills">
            {data.skills.map((s, i) => (
              <div
                className="skill tilt-card"
                key={i}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="container section" id="projects">
          <h2>Projects</h2>
          <div className="projects">
            {data.projects.map((p, i) => (
              <div
                className="card tilt-card"
                key={i}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="project-title">{p.title}</div>
                <p style={{ marginTop: "10px" }} className="small">
                  {p.desc}
                </p>

                <div className="tags">
                  {p.tech.map((t, j) => (
                    <span className="tag" key={j}>
                      {t}
                    </span>
                  ))}
                </div>

                {p.link !== "#" && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="container section" id="education">
          <h2>Education</h2>
          {data.education.map((e, i) => (
            <div
              className="card tilt-card"
              key={i}
              style={{ marginTop: "18px" }}
              onMouseMove={handleTiltMove}
              onMouseLeave={handleTiltLeave}
            >
              <div className="project-title">{e.degree}</div>
              <p className="small" style={{ marginTop: "8px" }}>
                {e.college}
              </p>
              <p className="small" style={{ marginTop: "6px" }}>
                {e.year}
              </p>
            </div>
          ))}
        </div>

        {/* Certificates */}
        <div className="container section" id="certificates">
          <h2>Certificates</h2>
          <div className="cert-grid">
            {data.certificates.map((c, i) => (
              <div
                className="card tilt-card"
                key={i}
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                🏆 {c}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="container section" id="contact">
          <div
            className="card contact-card tilt-card"
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
          >
            <h2>Let’s Connect</h2>
            <p>
              Want to work together or discuss a project? Feel free to contact
              me!
            </p>

            <div className="btn-row" style={{ justifyContent: "center" }}>
              <a className="btn btn-primary" href={`mailto:${data.email}`}>
                Email Me
              </a>

              <a className="btn btn-outline" href={data.github} target="_blank">
                GitHub
              </a>

              <a
                className="btn btn-outline"
                href={data.linkedin}
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footer">
          © {new Date().getFullYear()} {data.name}.
        </div>
      </div>

      <Chatbot />
    </>
  );
}
