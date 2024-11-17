import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './CollegePred.css';
import Navbar from '../Components/Navbar';

export default function CollegePredictor() {
  const [rank, setRank] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showGraph, setShowGraph] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const courses = [
    'Computer Science Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Electronics and Communication Engineering',
    'Chemical Engineering'
  ];

  const getRowClassName = (index) => {
    const baseClass = 'college-row';
    const tierClass = index < 3 ? 'college-tier-top' :
      index < 7 ? 'college-tier-mid' : 'college-tier-standard';
    return `${baseClass} ${tierClass}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setColleges([]);

    try {
      const response = await fetch('http://localhost:5000/api/colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rank: parseInt(rank),
          course: selectedCourse
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch college data');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (data.length === 0) {
        setError('No colleges found matching your criteria');
      } else {
        setColleges(data);
      }
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGraphClick = (college) => {
    setSelectedCollege(college);
    setShowGraph(true);
  };

  const handleDetailsClick = (college) => {
    setSelectedCollege(college);
    setShowDetails(true);
  };

  const prepareGraphData = (cutoffs) => {
    return Object.entries(cutoffs)
      .filter(([_, value]) => value !== null)
      .map(([year, value]) => ({
        year,
        cutoff: value
      }));
  };

  const formatFacility = (facility) => {
    return facility.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <>
      <Navbar />
      <div className="college-bg">
        <div className="college-container">
          <h1 className="college-page-title">College Cutoff Analyzer</h1>

          <form onSubmit={handleSubmit} className="college-form">
            <div className="college-form-group">
              <label className="college-form-label">Enter Your Rank:</label>
              <input
                type="number"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                required
                className="college-form-input"
                placeholder="Enter your rank"
                disabled={loading}
              />
            </div>

            <div className="college-form-group">
              <label className="college-form-label">Select Course:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
                className="college-form-select"
                disabled={loading}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <button 
              type="submit" 
              className="college-submit-btn"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Colleges'}
            </button>
          </form>

          {error && (
            <div className="college-error-message">
              {error}
            </div>
          )}

          {loading && (
            <div className="college-loading">
              <div className="college-spinner"></div>
              <p>Searching for colleges...</p>
            </div>
          )}

          {colleges.length > 0 && (
            <div className="college-table-container">
              <table className="college-table">
                <thead>
                  <tr className="college-table-header">
                    <th className="college-header-cell">S.No.</th>
                    <th className="college-header-cell">College Name</th>
                    <th className="college-header-cell">Cutoff Rank</th>
                    <th className="college-header-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {colleges.map((college, index) => (
                    <tr key={index} className={getRowClassName(index)}>
                      <td className="college-table-cell college-rank-cell">{index + 1}</td>
                      <td className="college-table-cell college-name-cell">{college.name}</td>
                      <td className="college-table-cell college-cutoff-cell">{college.cutoffs['2025']}</td>
                      <td className="college-table-cell college-action-cell">
                        <button
                          onClick={() => handleGraphClick(college)}
                          className="college-action-btn college-graph-btn"
                          title="View Trends"
                        >
                          📊
                        </button>
                        <button
                          onClick={() => handleDetailsClick(college)}
                          className="college-action-btn college-info-btn"
                          title="College Info"
                        >
                          ℹ️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showGraph && selectedCollege && (
            <div className="college-modal-overlay">
              <div className="college-modal">
                <h2 className="college-modal-title">{selectedCollege.name} - Cutoff Trends</h2>
                <div className="college-graph-container">
                  <LineChart
                    width={600}
                    height={300}
                    data={prepareGraphData(selectedCollege.cutoffs)}
                    className="college-trend-chart"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="cutoff"
                      stroke="#2563eb"
                      strokeWidth={2}
                    />
                  </LineChart>
                </div>
                <button
                  onClick={() => setShowGraph(false)}
                  className="college-close-btn"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showDetails && selectedCollege && (
            <div className="college-modal-overlay">
              <div className="college-modal college-details-modal">
                <h2 className="college-modal-title">{selectedCollege.name}</h2>
                <div className="college-details-content">
                  <div className="college-detail-row">
                    <span className="detail-label">Campus Size:</span>
                    <span className="detail-value">{selectedCollege.details.campus_size}</span>
                  </div>
                  <div className="college-detail-row">
                    <span className="detail-label">Total Students:</span>
                    <span className="detail-value">{selectedCollege.details.total_students}</span>
                  </div>
                  <div className="college-detail-row">
                    <span className="detail-label">Total Faculty:</span>
                    <span className="detail-value">{selectedCollege.details.total_faculty}</span>
                  </div>
                  <div className="college-detail-row">
                    <span className="detail-label">Established Year:</span>
                    <span className="detail-value">{selectedCollege.details.established_year}</span>
                  </div>
                  <div className="college-detail-row">
                    <span className="detail-label">College Type:</span>
                    <span className="detail-value">{selectedCollege.details.college_type}</span>
                  </div>
                  <div className="college-detail-row">
                    <span className="detail-label">Average Fees:</span>
                    <span className="detail-value">
                      ₹{typeof selectedCollege.details.average_fees === 'number' 
                          ? selectedCollege.details.average_fees.toLocaleString() 
                          : selectedCollege.details.average_fees}
                    </span>
                  </div>
                  <div className="college-facilities">
                    <h3>Facilities</h3>
                    <div className="facilities-grid">
                      {selectedCollege.details.facilities.map((facility, index) => (
                        <div key={index} className="facility-item">
                          {formatFacility(facility)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="college-close-btn"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}