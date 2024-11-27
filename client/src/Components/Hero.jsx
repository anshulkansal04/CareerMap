import "./styles.css";

import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Brain, Target, Rocket } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';

const FloatingElement = ({ children, delay }) => {
  return (
    <div className="floating-element" style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

const educationalFacts = [
  "India has over 1.5 million schools",
  "The Right to Education Act was passed in 2009",
  "NEP 2020 aims for 100% Gross Enrolment Ratio",
  "India has over 1000 universities"
];

const Hero = () => {
  const [factIndex, setFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const fadeAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    config: config.molasses,
  });

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setIsVisible(false), 3000); // Fade out after 3s
    const changeFactTimer = setTimeout(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % educationalFacts.length);
      setIsVisible(true); // Fade in the next fact
    }, 4000); // Total duration: fade-out + delay

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(changeFactTimer);
    };
  }, [factIndex]);

  return (
    <div className="edu-hero">
      <div className="animated-bg"></div>
      <div className="hero-content">
        <div className="edu-hero-text">
          <h1 className="edu-hero-title">
            <span className="edu-hero-title-welcome">Welcome To</span>
            <span className="edu-hero-title-future">NEP Future Fit</span>
          </h1>
          <animated.p style={fadeAnimation} className="edu-hero-fact">
            Did you know? {educationalFacts[factIndex]}
          </animated.p>
          <p className="edu-hero-description">
            Empowering students through innovative learning methods and cutting-edge educational technology.
            Join us in shaping the future of education in India.
          </p>
        </div>

        <div className="hero-illustrations">
          <div className="floating-elements">
            <FloatingElement delay={0}>
              <div className="icon-card">
                <BookOpen className="icon" size={32} />
                <span>Learning</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.2}>
              <div className="icon-card">
                <GraduationCap className="icon" size={32} />
                <span>Graduate</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.4}>
              <div className="icon-card">
                <Brain className="icon" size={32} />
                <span>Knowledge</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.6}>
              <div className="icon-card">
                <Target className="icon" size={32} />
                <span>Goals</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.8}>
              <div className="icon-card">
                <Rocket className="icon" size={32} />
                <span>Success</span>
              </div>
            </FloatingElement>
          </div>

          <div className="connection-lines">
            <svg className="connections" viewBox="0 0 400 400">
              <path className="path-line" d="M50,200 C100,100 350,350 350,200" />
              <path className="path-line" d="M50,250 C150,150 250,350 350,250" />
              <path className="path-line" d="M50,150 C200,50 200,350 350,150" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;