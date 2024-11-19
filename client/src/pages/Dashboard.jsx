import React, { useState } from 'react';
import { 
  Home, 
  BarChart2, 
  Award, 
  User, 
  Menu, 
  XCircle 
} from 'lucide-react';
import './Dash.css';

// Mock data
const userData = {
  name: 'Emily Johnson',
  age: 22,
  email: 'emily.johnson@example.com',
  currentEducation: 'Computer Science, Senior Year'
};

const marksData = [
  { subject: 'Mathematics', score: 87 },
  { subject: 'Computer Science', score: 92 },
  { subject: 'Statistics', score: 85 },
  { subject: 'English', score: 78 }
];

const recommendationData = [
  { id: 1, title: 'Software Engineering Internship', type: 'Career' },
  { id: 2, title: 'Advanced Data Science Course', type: 'Education' },
  { id: 3, title: 'Machine Learning Workshop', type: 'Professional Development' }
];

function Dash() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('home');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return <HomePage />;
      case 'marks':
        return <MarksPage />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="dash-app">
      <div className={`dash-sidebar ${isSidebarOpen ? 'dash-sidebar-open' : 'dash-sidebar-closed'}`}>
        <button 
          className="dash-sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <XCircle /> : <Menu />}
        </button>
        <nav className="dash-nav">
          <button 
            className={`dash-nav-item ${activePage === 'home' ? 'dash-active' : ''}`} 
            onClick={() => setActivePage('home')}
          >
            <Home />
            {isSidebarOpen && <span>Dashboard</span>}
          </button>
          <button 
            className={`dash-nav-item ${activePage === 'marks' ? 'dash-active' : ''}`} 
            onClick={() => setActivePage('marks')}
          >
            <BarChart2 />
            {isSidebarOpen && <span>Marks Analysis</span>}
          </button>
          <button 
            className={`dash-nav-item ${activePage === 'recommendations' ? 'dash-active' : ''}`} 
            onClick={() => setActivePage('recommendations')}
          >
            <Award />
            {isSidebarOpen && <span>Recommendations</span>}
          </button>
          <button 
            className={`dash-nav-item ${activePage === 'profile' ? 'dash-active' : ''}`} 
            onClick={() => setActivePage('profile')}
          >
            <User />
            {isSidebarOpen && <span>Profile</span>}
          </button>
        </nav>
      </div>
      <main className={`dash-main ${isSidebarOpen ? 'dash-main-shifted' : ''}`}>
        {renderPage()}
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="dash-page dash-home">
      <h1>Welcome, {userData.name}</h1>
      <div className="dash-quick-stats">
        <div className="dash-stat-card">
          <h3>Current Education</h3>
          <p>{userData.currentEducation}</p>
        </div>
        <div className="dash-stat-card">
          <h3>Top Recommendation</h3>
          <p>{recommendationData[0].title}</p>
        </div>
      </div>
    </div>
  );
}

function MarksPage() {
  return (
    <div className="dash-page dash-marks">
      <h1>Marks Analysis</h1>
      <div className="dash-marks-grid">
        {marksData.map((subject, index) => (
          <div key={index} className="dash-mark-card">
            <h3>{subject.subject}</h3>
            <div className="dash-progress-bar">
              <div 
                className="dash-progress" 
                style={{width: `${subject.score}%`}}
              ></div>
            </div>
            <span>{subject.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsPage() {
  return (
    <div className="dash-page dash-recommendations">
      <h1>Career & Education Recommendations</h1>
      {recommendationData.map(recommendation => (
        <div key={recommendation.id} className="dash-recommendation-card">
          <h3>{recommendation.title}</h3>
          <p>{recommendation.type}</p>
          <button className="dash-btn-primary">Learn More</button>
        </div>
      ))}
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="dash-page dash-profile">
      <h1>User Profile</h1>
      <div className="dash-profile-section">
        <h3>Personal Information</h3>
        <p>Name: {userData.name}</p>
        <p>Age: {userData.age}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
}

export default Dash;