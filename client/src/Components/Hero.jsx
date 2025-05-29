import "./styles.css";

import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Brain, Target, Rocket, ArrowRight } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';
import { useSelector } from "react-redux";

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
  "India has over 1000 universities",
  "Every student has unique potential waiting to be discovered",
  "The right guidance can transform career uncertainties into clear paths",
  "NEP 2020 opens doors to interdisciplinary learning opportunities",
  "Career counseling increases student success rates by 60%"
];

const Hero = () => {
  const [factIndex, setFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const fadeAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(-10px)',
    config: config.gentle,
  });

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setIsVisible(false), 4000);
    const changeFactTimer = setTimeout(() => {
      setFactIndex((prevIndex) => (prevIndex + 1) % educationalFacts.length);
      setIsVisible(true);
    }, 5000);

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
            <span className="edu-hero-title-welcome">Discover Your Path with</span>
            <span className="edu-hero-title-future">NEP Future Fit</span>
          </h1>
          <animated.div style={fadeAnimation} className="edu-hero-fact">
            💡 {educationalFacts[factIndex]}
          </animated.div>
          <p className="edu-hero-description">
            Get personalized career guidance and academic counseling tailored to your interests, 
            skills, and aspirations. Navigate your educational journey with confidence and clarity.
          </p>
          { user ? (
            <a href="/dashboard" className="hero-cta">
              Go to Dashboard
              <ArrowRight className="hero-cta-icon" size={20} />
            </a>
          ) : (
            <a href="/login" className="hero-cta">
              Start Your Journey
              <ArrowRight className="hero-cta-icon" size={20} />
            </a>
          )}
        </div>

        <div className="hero-illustrations">
          {/* Desktop View - Original Floating Cards */}
          <div className="floating-elements desktop-only">
            <FloatingElement delay={0}>
              <div className="icon-card">
                <BookOpen className="icon" size={28} />
                <span>Learn</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.2}>
              <div className="icon-card">
                <Brain className="icon" size={28} />
                <span>Explore</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.4}>
              <div className="icon-card">
                <Target className="icon" size={28} />
                <span>Focus</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.6}>
              <div className="icon-card">
                <GraduationCap className="icon" size={28} />
                <span>Achieve</span>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.8}>
              <div className="icon-card">
                <Rocket className="icon" size={28} />
                <span>Excel</span>
              </div>
            </FloatingElement>
          </div>

          <div className="connection-lines desktop-only">
            <svg className="connections" viewBox="0 0 400 400">
              <path className="path-line" d="M80,150 Q200,80 320,180" />
              <path className="path-line" d="M60,250 Q180,180 340,220" />
              <path className="path-line" d="M90,320 Q220,240 350,300" />
              <path className="path-line" d="M120,100 Q250,150 380,120" />
            </svg>
          </div>

          {/* Mobile View - Journey Path */}
          <div className="journey-path mobile-only">
            <div className="path-step" data-step="1">
              <div className="step-icon">
                <BookOpen size={24} />
              </div>
              <span className="step-label">Learn</span>
            </div>
            
            <div className="path-connector">
              <ArrowRight size={16} className="connector-arrow" />
            </div>
            
            <div className="path-step" data-step="2">
              <div className="step-icon">
                <Brain size={24} />
              </div>
              <span className="step-label">Explore</span>
            </div>
            
            <div className="path-connector">
              <ArrowRight size={16} className="connector-arrow" />
            </div>
            
            <div className="path-step" data-step="3">
              <div className="step-icon">
                <Target size={24} />
              </div>
              <span className="step-label">Focus</span>
            </div>
            
            <div className="path-connector">
              <ArrowRight size={16} className="connector-arrow" />
            </div>
            
            <div className="path-step" data-step="4">
              <div className="step-icon">
                <GraduationCap size={24} />
              </div>
              <span className="step-label">Achieve</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;