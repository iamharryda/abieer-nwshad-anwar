import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Youtube, Mail, FileDown, ExternalLink, ChevronDown } from 'lucide-react';

// Main App Component
export default function PortfolioApp() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['about', 'education', 'skills', 'publications', 'certificates'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --bg-primary: #0a0a0a;
          --bg-secondary: #ffffff;
          --text-primary: #ffffff;
          --text-secondary: #0a0a0a;
          --accent: #00ff88;
          --accent-dim: #00cc6a;
          --gray: #666666;
          --gray-light: #cccccc;
          --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
          background: var(--bg-primary);
        }

        .app-container {
          position: relative;
          min-height: 100vh;
        }

        /* Navigation */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.5rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: var(--transition);
          background: transparent;
        }

        nav.scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 4rem;
        }

        .logo {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          gap: 3rem;
          list-style: none;
        }

        .nav-links a {
          color: var(--gray-light);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition);
          position: relative;
          letter-spacing: 0.5px;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: var(--accent);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: var(--transition);
        }

        .nav-links a:hover::after,
        .nav-links a.active::after {
          width: 100%;
        }

        /* Hamburger Menu */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
          z-index: 1001;
          width: 30px;
          height: 24px;
          justify-content: center;
        }

        .hamburger-line {
          width: 100%;
          height: 3px;
          background: var(--text-primary);
          transition: var(--transition);
          border-radius: 2px;
        }

        .hamburger.active .hamburger-line:nth-child(1) {
          transform: translateY(9px) rotate(45deg);
        }

        .hamburger.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active .hamburger-line:nth-child(3) {
          transform: translateY(-9px) rotate(-45deg);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 80%;
          max-width: 300px;
          height: 100vh;
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(20px);
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          padding: 6rem 2rem 2rem;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-menu.active {
          right: 0;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          opacity: 0;
          visibility: hidden;
          transition: var(--transition);
          z-index: 999;
        }

        .mobile-menu-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .mobile-nav-links a {
          color: var(--gray-light);
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 600;
          transition: var(--transition);
          display: block;
          letter-spacing: 0.5px;
        }

        .mobile-nav-links a:hover,
        .mobile-nav-links a.active {
          color: var(--accent);
          transform: translateX(10px);
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: var(--gray-light);
          margin-bottom: 1rem;
          font-weight: 400;
          letter-spacing: 0.5px;
        }

        .hero-description {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          color: var(--gray);
          max-width: 700px;
          margin: 0 auto 3rem;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          background: var(--accent);
          color: var(--bg-primary);
        }

        .btn-primary:hover {
          background: var(--accent-dim);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border: 2px solid var(--text-primary);
        }

        .btn-secondary:hover {
          background: var(--text-primary);
          color: var(--bg-primary);
          transform: translateY(-2px);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
          cursor: pointer;
          color: var(--gray-light);
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        /* Section Styles */
        .section {
          padding: 6rem 4rem;
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .section-light {
          background: var(--bg-secondary);
          color: var(--text-secondary);
        }

        .section-dark {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin-bottom: 3rem;
          letter-spacing: -1px;
        }

        .section-light .section-title {
          color: var(--text-secondary);
        }

        .section-dark .section-title {
          color: var(--text-primary);
        }

        /* About Section */
        .about-content {
          display: flex;
          gap: 4rem;
          align-items: flex-start;
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-image {
          flex-shrink: 0;
          width: 250px;
          height: 250px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          transition: var(--transition);
        }

        .about-image:hover {
          transform: scale(1.05) rotate(2deg);
        }

        .about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-text {
          flex: 1;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--gray);
          margin-bottom: 1.5rem;
        }

        /* Education Section */
        .education-list {
          max-width: 900px;
          margin: 0 auto;
        }

        .education-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: var(--transition);
        }

        .education-item:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.1);
        }

        .education-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .education-degree {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .education-date {
          color: var(--accent);
          font-weight: 600;
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
        }

        .education-school {
          color: var(--gray-light);
          font-size: 1rem;
          margin-bottom: 0.8rem;
        }

        .education-details {
          color: var(--gray);
          line-height: 1.6;
        }

        /* Skills Section */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .skill-category {
          background: rgba(0, 0, 0, 0.03);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .skill-category h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .skill-tag {
          padding: 0.6rem 1.2rem;
          background: var(--bg-secondary);
          border: 2px solid var(--text-secondary);
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: var(--transition);
          cursor: default;
        }

        .skill-tag:hover {
          background: var(--text-secondary);
          color: var(--bg-secondary);
          transform: translateY(-2px);
        }

        /* Publications Section */
        .publications-list {
          max-width: 900px;
          margin: 0 auto;
        }

        .publication-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 2.5rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: var(--transition);
        }

        .publication-item:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
          box-shadow: 0 20px 60px rgba(0, 255, 136, 0.1);
        }

        .publication-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: var(--accent);
          color: var(--bg-primary);
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .publication-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .publication-details {
          color: var(--gray);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .publication-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .publication-link:hover {
          gap: 0.8rem;
        }

        /* Certificates Section */
        .certificates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .certificate-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: var(--transition);
          cursor: pointer;
        }

        .certificate-card:hover {
          transform: translateY(-8px);
          border-color: var(--accent);
          box-shadow: 0 25px 70px rgba(0, 255, 136, 0.15);
        }

        .certificate-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 200, 100, 0.1) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .certificate-image::before {
          display: none;
        }

        .certificate-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.4rem 1rem;
          background: var(--accent);
          color: var(--bg-primary);
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .certificate-content {
          padding: 1.5rem;
        }

        .certificate-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .certificate-issuer {
          color: var(--gray-light);
          font-size: 0.9rem;
          margin-bottom: 0.8rem;
        }

        .certificate-date {
          color: var(--gray);
          font-size: 0.85rem;
          font-family: 'Space Mono', monospace;
        }

        .certificate-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .certificate-footer a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .certificate-footer a:hover {
          gap: 0.8rem;
        }

        /* Footer */
        footer {
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 4rem 4rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .footer-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .footer-title {
          color: var(--gray-light);
          margin-bottom: 2rem;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .social-links a {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          transition: var(--transition);
        }

        .social-links a:hover {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
          transform: translateY(-5px);
        }

        .footer-copyright {
          color: var(--gray);
          font-size: 0.9rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          nav {
            padding: 1rem 2rem;
          }

          nav.scrolled {
            padding: 0.8rem 2rem;
          }

          .nav-links {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .section {
            padding: 4rem 2rem;
          }

          .about-content {
            flex-direction: column;
            gap: 2rem;
          }

          .about-image {
            width: 200px;
            height: 200px;
            margin: 0 auto;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .certificates-grid {
            grid-template-columns: 1fr;
          }

          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="logo">Abieer Nwshad Anwar</div>
        <ul className="nav-links">
          <li><a href="#home" className={activeSection === '' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
          <li><a href="#education" className={activeSection === 'education' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}>Education</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a></li>
          <li><a href="#certificates" className={activeSection === 'certificates' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('certificates'); }}>Certificates</a></li>
        </ul>
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#home" className={activeSection === '' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
          <li><a href="#education" className={activeSection === 'education' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}>Education</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>Skills</a></li>
          <li><a href="#certificates" className={activeSection === 'certificates' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection('certificates'); }}>Certificates</a></li>
        </ul>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">ABIEER NWSHAD ANWAR</h1>
          <p className="hero-subtitle">PhD Candidate in Additive Manufacturing Engineering</p>
          <p className="hero-description">
            Researcher | Engineer | Innovator in Advanced Manufacturing Technologies
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn btn-primary">
              <FileDown size={20} />
              Download CV
            </a>
            <a href="mailto:abieernwshadanwar@gmail.com" className="btn btn-secondary">
              <Mail size={20} />
              Contact Me
            </a>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
          <ChevronDown size={32} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section section-light">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="https://i.ibb.co.com/rf52kvJ0/F1-F43-E18-6590-42-D0-B1-AB-D03-BF29985-BE.jpg" alt="Abieer Nwshad Anwar" />
          </div>
          <div className="about-text">
            <p>
              I am a dedicated PhD candidate specializing in Additive Manufacturing Engineering with a passion for advancing manufacturing technologies. My research focuses on the intersection of materials science, computation modeling, and innovative production methodologies.
            </p>
            <p>
              Through my journey in advanced manufacturing, I strive to push the boundaries of what's possible in advanced manufacturing. My work contributes to developing more efficient, sustainable, and practical applications to solve real-world engineering challenges.
            </p>
            <p>
              Outside of research, I'm passionate about mentoring students, collaborating across disciplines, and contributing to the academic community through publications and conference presentations.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section section-dark">
        <h2 className="section-title">Education</h2>
        <div className="education-list">
          <div className="education-item">
            <div className="education-header">
              <div>
                <h3 className="education-degree">Masters of Nano Technology Engineering</h3>
                <p className="education-school">Excellence in University of Science and Technology</p>
              </div>
              <span className="education-date">Sept 2023 - Present</span>
            </div>
            <p className="education-details">
              Specializing in nanoscale manufacturing processes and CAD-related technologies.
            </p>
          </div>

          <div className="education-item">
            <div className="education-header">
              <div>
                <h3 className="education-degree">Bachelor of Machine Design Manufacturing & Automation</h3>
                <p className="education-school">Changchun University of Science and Technology</p>
              </div>
              <span className="education-date">Sept 2018 - July 2022</span>
            </div>
            <p className="education-details">
              Gained comprehensive knowledge in manufacturing processes and CAD related technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section section-light">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Additive Manufacturing</h3>
            <div className="skill-tags">
              <span className="skill-tag">3D Printing</span>
              <span className="skill-tag">Process Optimization</span>
              <span className="skill-tag">Material Extrusion</span>
            </div>
          </div>

          <div className="skill-category">
            <h3>CAD & Simulation Tools</h3>
            <div className="skill-tags">
              <span className="skill-tag">ANSYS</span>
              <span className="skill-tag">SolidWorks</span>
              <span className="skill-tag">AutoCAD</span>
            </div>
          </div>

          <div className="skill-category">
            <h3>Materials Science</h3>
            <div className="skill-tags">
              <span className="skill-tag">Polymer Analysis</span>
              <span className="skill-tag">Composite Materials</span>
              <span className="skill-tag">Material Testing</span>
            </div>
          </div>

          <div className="skill-category">
            <h3>Programming & Data Analysis</h3>
            <div className="skill-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">MATLAB</span>
              <span className="skill-tag">Data Visualization</span>
              <span className="skill-tag">Statistical Analysis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publications" className="section section-dark">
        <h2 className="section-title">Publications & Research</h2>
        <div className="publications-list">
          <div className="publication-item">
            <span className="publication-badge">MTL - Net</span>
            <h3 className="publication-title">
              A Unit of Deep Learning Architecture for Predicting Production E-money, Defect Rate, and Speed in Industry 4.0 Systems
            </h3>
            <p className="publication-details">
              LNME state-of-the-art Multi-Task Machine Learning Framework for Manufacturing 
              Optimization in Industry 4.0 Systems Published in MDPI
            </p>
            <a href="https://www.researchsquare.com/article/rs-7915830/v1" target="_blank" rel="noopener noreferrer" className="publication-link">
              Read Publication <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="section section-dark">
        <h2 className="section-title">Certificates & Achievements</h2>
        <div className="certificates-grid">
          <div className="certificate-card">
            <div className="certificate-image" style={{backgroundImage: 'url(https://i.ibb.co/N635L6xm/Nano-tech-certificate-page-0001.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <span className="certificate-badge">Research</span>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">NanoInnovation 2024 Conference & Exhibition</h3>
              <p className="certificate-issuer">Sapienza University of Rome</p>
              <p className="certificate-date">September 9-13, 2024</p>
            </div>
            <div className="certificate-footer">
              <a href="https://i.ibb.co/N635L6xm/Nano-tech-certificate-page-0001.jpg" target="_blank" rel="noopener noreferrer">
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="certificate-card">
            <div className="certificate-image" style={{backgroundImage: 'url(https://i.ibb.co/fdSPrPx7/Certificate-1-page-0001.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <span className="certificate-badge">Climate Action</span>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">International Climate Talk</h3>
              <p className="certificate-issuer">YouthNet for Climate Justice</p>
              <p className="certificate-date">June 18, 2020</p>
            </div>
            <div className="certificate-footer">
              <a href="https://i.ibb.co/fdSPrPx7/Certificate-1-page-0001.jpg" target="_blank" rel="noopener noreferrer">
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="certificate-card">
            <div className="certificate-image" style={{backgroundImage: 'url(https://i.ibb.co/ks7Z9j5Y/Certificate-2-page-0001.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <span className="certificate-badge">Leadership</span>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">Faith in the Commonwealth: PVE Training</h3>
              <p className="certificate-issuer">Inclusive Bangladesh & CYPAN</p>
              <p className="certificate-date">July 18, 2020</p>
            </div>
            <div className="certificate-footer">
              <a href="https://i.ibb.co/ks7Z9j5Y/Certificate-2-page-0001.jpg" target="_blank" rel="noopener noreferrer">
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="certificate-card">
            <div className="certificate-image" style={{backgroundImage: 'url(https://i.ibb.co/SX96qBgR/certificate-3-page-0001.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <span className="certificate-badge">Leadership</span>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">Effective Teamwork</h3>
              <p className="certificate-issuer">Bangladesh Youth Leadership Center</p>
              <p className="certificate-date">July 15, 2021</p>
            </div>
            <div className="certificate-footer">
              <a href="https://i.ibb.co/SX96qBgR/certificate-3-page-0001.jpg" target="_blank" rel="noopener noreferrer">
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="certificate-card">
            <div className="certificate-image" style={{backgroundImage: 'url(https://i.ibb.co/Cs1N6d82/Certificate-4-page-0001.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <span className="certificate-badge">Award</span>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">Climate Click Photography (3rd Place)</h3>
              <p className="certificate-issuer">YouthNet & Protiki Jubo Sangshad</p>
              <p className="certificate-date">2021</p>
            </div>
            <div className="certificate-footer">
              <a href="https://i.ibb.co/Cs1N6d82/Certificate-4-page-0001.jpg" target="_blank" rel="noopener noreferrer">
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="certificate-card">
            <div className="certificate-image" style={{backgroundImage: 'url(https://i.ibb.co/j23TR92/Certificate-5-page-0001.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <span className="certificate-badge">Peace</span>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">Resilience & Compassion for Peaceful World</h3>
              <p className="certificate-issuer">Power To Bloom & YCoalition</p>
              <p className="certificate-date">September 4, 2020</p>
            </div>
            <div className="certificate-footer">
              <a href="https://i.ibb.co/j23TR92/Certificate-5-page-0001.jpg" target="_blank" rel="noopener noreferrer">
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="certificate-card">
            <div className="certificate-image" style={{backgroundImage: 'url(https://i.ibb.co/GQVvgSRp/Certificates-6-page-0001.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <span className="certificate-badge">Leadership</span>
            </div>
            <div className="certificate-content">
              <h3 className="certificate-title">Faith in the Commonwealth Training</h3>
              <p className="certificate-issuer">Inclusive Bangladesh</p>
              <p className="certificate-date">July 18, 2020</p>
            </div>
            <div className="certificate-footer">
              <a href="https://i.ibb.co/GQVvgSRp/Certificates-6-page-0001.jpg" target="_blank" rel="noopener noreferrer">
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <h3 className="footer-name">Abieer Nwshad Anwar</h3>
          <p className="footer-title">PhD Candidate - Additive Manufacturing Engineer</p>
          
          <div className="social-links">
            <a href="https://www.linkedin.com/in/abieer-nwshad-anwar-11a6a1201/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="https://scholar.google.com/citations?user=pCc_tx0AAAAJ&hl=en&oi=ao" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3.5-10c0-1.933-1.567-3.5-3.5-3.5S8.5 10.067 8.5 12s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5z" />
              </svg>
            </a>
            <a href="mailto:abieernwshadanwar@gmail.com" aria-label="Email"><Mail size={20} /></a>
          </div>

          <p className="footer-copyright">
            © 2024 ALL RIGHTS RESERVED. ABIEER NWSHAD ANWAR
          </p>
        </div>
      </footer>
    </div>
  );
}