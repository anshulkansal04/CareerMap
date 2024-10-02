import React from "react";
import { Cog, Zap, Sprout, Users } from "lucide-react";
import './Info.css'; // Importing CSS

export default function Info() {
  return (
    <section className="section-container">
      <div className="section-inner">
        <h2 className="section-title">
          Discover the power of coreplus features
        </h2>
        <div className="features-grid">
          <FeatureCard
            icon={<Cog className="icon" />}
            title="Systemise"
            description="coreplus simplifies your practice management, seamlessly integrating client records, scheduling, and storage for effortless efficiency."
            bgColor="bg-orange"
          />
          <FeatureCard
            icon={<Zap className="icon" />}
            title="Automate"
            description="coreplus turns routine tasks like appointment reminders, telehealth setup, and client bookings into automated processes, boosting your productivity and precision."
            bgColor="bg-emerald"
          />
          <FeatureCard
            icon={<Sprout className="icon" />}
            title="Grow"
            description="Expand and diversify your practice with coreplus, leveraging tools like HealthEngine, HotDoc, and Client Portal for wider reach and data-driven strategies for sustained growth."
            bgColor="bg-pink"
          />
          <FeatureCard
            icon={<Users className="icon" />}
            title="Retain"
            description="Foster client loyalty with coreplus by simplifying bookings and payments, coupled with personalised touches like birthday SMS for engaged and committed clients."
            bgColor="bg-yellow"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, bgColor }) {
  return (
    <div className="feature-card">
      <div className={`${bgColor} icon-bg`}>
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}
