import React, { useState } from "react";
import "./EducationDetailsForm.css";

function EducationDetailsForm() {
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [hasExam, setHasExam] = useState(false);
  const [exams, setExams] = useState([]);

  const handleAddSubject = () => {
    if (subjects.length < 5) {
      setSubjects([...subjects, { subjectName: "", marksObtained: "", maxMarks: "" }]);
    }
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddExam = () => {
    setExams([...exams, { examName: "", marksObtained: "", maxMarks: "", rank: "" }]);
  };

  const handleExamChange = (index, field, value) => {
    const updatedExams = [...exams];
    updatedExams[index][field] = value;
    setExams(updatedExams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Education details submitted successfully!");
  };

  return (
    <div className="education-form-container">
      <div className="personal-banner">
        <img
          src="https://via.placeholder.com/600x200"
          alt="Banner"
          className="personal-banner-image"
        />
        <div className="personal-logo">Logo</div>
      </div>

      <h2 className="education-heading">Education Details</h2>

      <form className="education-form" onSubmit={handleSubmit}>
        <div className="education-form-group">
          <label className="education-label">Select Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="education-input"
          >
            <option value="">Select Class</option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="education-form-group">
          <button type="button" className="education-add-button" onClick={handleAddSubject}>
            Add Subject
          </button>
          {subjects.map((subject, index) => (
            <div key={index} className="subject-group">
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.subjectName}
                onChange={(e) => handleSubjectChange(index, "subjectName", e.target.value)}
                className="education-input"
              />
              <input
                type="text"
                placeholder="Marks Obtained"
                value={subject.marksObtained}
                onChange={(e) => handleSubjectChange(index, "marksObtained", e.target.value)}
                className="education-input"
              />
              <input
                type="text"
                placeholder="Max Marks"
                value={subject.maxMarks}
                onChange={(e) => handleSubjectChange(index, "maxMarks", e.target.value)}
                className="education-input"
              />
            </div>
          ))}
        </div>

        <div className="education-form-group">
          <label className="education-label">Have you given any competitive exams?</label>
          <div>
            <label>
              <input
                type="radio"
                name="hasExam"
                value="no"
                checked={!hasExam}
                onChange={() => setHasExam(false)}
              />
              No
            </label>
            <label>
              <input
                type="radio"
                name="hasExam"
                value="yes"
                checked={hasExam}
                onChange={() => setHasExam(true)}
              />
              Yes
            </label>
          </div>
        </div>

        {hasExam && (
          <div className="education-form-group">
            <button type="button" className="education-add-button" onClick={handleAddExam}>
              Add Exam
            </button>
            {exams.map((exam, index) => (
              <div key={index} className="exam-group">
                <input
                  type="text"
                  placeholder="Exam Name"
                  value={exam.examName}
                  onChange={(e) => handleExamChange(index, "examName", e.target.value)}
                  className="education-input"
                />
                <input
                  type="text"
                  placeholder="Marks Obtained"
                  value={exam.marksObtained}
                  onChange={(e) => handleExamChange(index, "marksObtained", e.target.value)}
                  className="education-input"
                />
                <input
                  type="text"
                  placeholder="Max Marks / Rank"
                  value={exam.maxMarks}
                  onChange={(e) => handleExamChange(index, "maxMarks", e.target.value)}
                  className="education-input"
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="education-next-button">
          Next
        </button>
      </form>
    </div>
  );
}

export default EducationDetailsForm;
