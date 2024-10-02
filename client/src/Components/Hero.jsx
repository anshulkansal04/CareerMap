import React from "react";
import { FaBook, FaGraduationCap, FaLightbulb, FaAward } from "react-icons/fa";
import "../App.css";

const NavItem = ({ href, children }) => (
    <a href={href} className="nav-item">
        {children}
    </a>
);

const EducationIcon = ({ Icon, text }) => (
    <div className="education-icon">
        <Icon className="icon" />
        <span>{text}</span>
    </div>
);

function App() {
    return (
        <div className="app">
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="nav-links">
                        <NavItem href="#temp-a">Temp A</NavItem>
                        <NavItem href="#temp-b">Temp B</NavItem>
                        <NavItem href="#temp-c">Temp C</NavItem>
                        <NavItem href="#temp-d">Temp D</NavItem>
                    </div>
                    <button className="login-button">Login / Sign Up</button>
                    {/* <button className="menu-button">
                        <Menu className="menu-icon" />
                    </button> */}
                </div>
            </nav>

            <main className="main-content">
                <div className="hero">
                    <h1 className="hero-title">Future-Ready Education Under NEP 2020</h1>
                    <p className="hero-subtitle">
                        Shaping Futures with Smart Career Guidance
                    </p>
                    <div className="education-icons">
                        <EducationIcon Icon={FaBook} text="Personalized Learning" />
                        <EducationIcon Icon={FaGraduationCap} text="Higher Education" />
                        <EducationIcon Icon={FaLightbulb} text="Skill Development" />
                        <EducationIcon Icon={FaAward} text="Scholarships" />
                    </div>

                </div>
            </main>
        </div>
    );
}

export default App;
