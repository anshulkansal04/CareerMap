import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './CollegePred.css';

function CollegePred() {
  const [rank, setRank] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const courses = [
    'Computer Science Enginnering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Electronics and Communication Engineering',
    'Chemical Engineering'
  ];

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
    <div className="college-pred-container">
      <h1 className="college-pred-heading">College Cutoff Analyzer</h1>
      
      <form onSubmit={handleSubmit} className="college-pred-form">
        <div className="form-group">
          <label className="form-label">Enter Your Rank:</label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required
            className="rank-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Select Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
            className="course-select"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="college-pred-submit-btn">
          Search Colleges
        </button>
      </form>

      {colleges.length > 0 && (
        <div className="college-table-container">
          <table className="college-pred-table">
            <thead className="college-pred-table-header">
              <tr className="college-pred-table-row">
                <th className="college-pred-table-cell">S.No.</th>
                <th className="college-pred-table-cell">College Name</th>
                <th className="college-pred-table-cell">Cutoff Rank</th>
                <th className="college-pred-table-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="college-pred-table-body">
              {colleges.map((college, index) => (
                <tr key={index} className="college-pred-table-row">
                  <td className="college-pred-table-cell">{index + 1}</td>
                  <td className="college-pred-table-cell">{college.name}</td>
                  <td className="college-pred-table-cell">{college.cutoffs['2024']}</td>
                  <td className="college-pred-table-cell">
                    <button
                      onClick={() => handleGraphClick(college)}
                      className="graph-btn"
                    >
                      📊
                    </button>
                    <button className="info-btn">
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
        <div className="modal-overlay">
          <div className="college-pred-modal">
            <h2 className="college-pred-modal-heading">{selectedCollege.name} - Cutoff Trends</h2>
            <div className="college-pred-graph-container">
              <LineChart width={600} height={300} data={prepareGraphData(selectedCollege.cutoffs)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cutoff" stroke="#8884d8" />
              </LineChart>
            </div>
            <button
              onClick={() => setShowGraph(false)}
              className="college-pred-close-btn"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollegePred;
