import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./WhoWeAre.css";

const WhoWeAre = () => {
  return (
    <>
      <div className="who-we-are">
        <header className="header-section">
          <h1>Who We Are</h1>
          <p className="vision">
            <em>
              "Empowering students to achieve their dreams through personalized,
              data-driven guidance."
            </em>
          </p>
        </header>

        <section className="what-we-do">
          <h2>What We Do</h2>
          <ul>
            <li>
              <strong>Personalized Guidance:</strong> Tailored pathways based on
              the innovative 5+3+3+4 framework of NEP 2020.
            </li>
            <li>
              <strong>Comprehensive Digital Academic Reports:</strong> Secure
              and easily accessible digital records of academic performance.
            </li>
            <li>
              <strong>Career Stream Recommendations:</strong> Insights for Class
              10 and stream-specific college suggestions for Class 12.
            </li>
            <li>
              <strong>Scholarship Assistance:</strong> Highlighting government
              and private scholarship opportunities.
            </li>
            <li>
              <strong>Insights on NEP 2020:</strong> Simplified key features of
              the policy for easy understanding.
            </li>
          </ul>
        </section>

        <section className="features">
          <h2>Our Features at a Glance</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Interactive Graphs</h3>
              <p>Explore career options and performance trends dynamically.</p>
            </div>
            <div className="feature-item">
              <h3>Digital Marksheets</h3>
              <p>Maintain and share a single source of academic data.</p>
            </div>
            <div className="feature-item">
              <h3>Data-Driven College Suggestions</h3>
              <p>
                Receive recommendations based on historical cutoffs and JEE
                rankings.
              </p>
            </div>
            <div className="feature-item">
              <h3>Scholarship Access</h3>
              <p>Discover financial support options tailored to your needs.</p>
            </div>
          </div>
        </section>

        <section className="why-choose-us">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>
              <strong>NEP 2020 Aligned:</strong> Rooted in the principles of
              India's transformative education policy.
            </li>
            <li>
              <strong>Accessibility for All:</strong> Designed for students from
              all socioeconomic backgrounds.
            </li>
            <li>
              <strong>Empowering Decisions:</strong> Equipping students with
              tools to make confident career choices.
            </li>
          </ul>
        </section>

        <section className="cta">
          <h2>Ready to Explore Your Future?</h2>
          <p>
            Start your journey today with our platform and discover your
            potential.
          </p>
          <Link to="/">
            <button className="cta-button">Explore Now</button>
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default WhoWeAre;
