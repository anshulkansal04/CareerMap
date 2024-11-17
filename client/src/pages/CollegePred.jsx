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
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGraphClick = (college) => {
    setSelectedCollege(college);
    setShowGraph(true);
  };

  const prepareGraphData = (cutoffs) => {
    return Object.entries(cutoffs).map(([year, value]) => ({
      year,
      cutoff: value
    }));
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
              />
            </div>

            <div className="college-form-group">
              <label className="college-form-label">Select Course:</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
                className="college-form-select"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="college-submit-btn">
              Search Colleges
            </button>
          </form>

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
        </div>
      </div>
    </>
  );
}