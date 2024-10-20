import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-item">
          <h2 className="carousel-title">New School Structure (5+3+3+4 Model)</h2>
          <p className="carousel-content">
            <strong>New Stages of Learning:</strong> The NEP replaces the old 10+2 system with a 5+3+3+4 structure, covering ages 3-18. It includes a Foundational Stage (ages 3-8), Preparatory Stage (ages 8-11), Middle Stage (ages 11-14), and Secondary Stage (ages 14-18).
            <br /><br />
            <strong>Focus on Early Learning:</strong> The Foundational Stage includes three years of preschool (ages 3-6), ensuring children start learning through play and activities before entering Grade 1.
            <br /><br />
            <strong>Student-Centric Approach:</strong> The new structure aims to cater to different learning needs at various ages, offering more relevant content at each stage for better cognitive, social, and emotional development.
          </p>
        </div>

        <div className="carousel-item">
          <h2 className="carousel-title">Focus on Basic Reading, Writing, and Math Skills</h2>
          <p className="carousel-content">
            <strong>Priority on Literacy and Numeracy:</strong> The policy aims to ensure that all students achieve foundational literacy and numeracy by Grade 3, recognizing these skills as essential for all further learning.
            <br /><br />
            <strong>National Mission on Literacy:</strong> A National Mission on Foundational Literacy and Numeracy will be set up to support this goal, focusing on teacher training and learning materials.
            <br /><br />
            <strong>Engaging Learning Methods:</strong> Teaching methods will focus on making learning fun and interactive, using play-based and activity-based methods.
          </p>
        </div>

        <div className="carousel-item">
          <h2 className="carousel-title">Learning in Local Languages</h2>
          <p className="carousel-content">
            <strong>Mother Tongue as the Medium:</strong> The policy recommends education in the mother tongue or local language until at least Grade 5, and preferably till Grade 8, to enhance comprehension.
            <br /><br />
            <strong>Three-Language Formula:</strong> Students are encouraged to learn three languages, with at least two being native to India, fostering multilingualism.
            <br /><br />
            <strong>Regional Learning Materials:</strong> The NEP plans to develop textbooks in local languages, allowing students to study subjects like science and math in their mother tongue.
          </p>
        </div>

        <div className="carousel-item">
          <h2 className="carousel-title">More Choices in Higher Education</h2>
          <p className="carousel-content">
            <strong>Flexibility in Subject Choices:</strong> NEP 2020 promotes multidisciplinary education, allowing students to combine subjects like biology and music or economics.
            <br /><br />
            <strong>Holistic Learning Approach:</strong> This aims to develop critical thinking and creativity, making students well-rounded with varied skills.
            <br /><br />
            <strong>Support for Research:</strong> A National Research Foundation will be established to boost high-quality research, encouraging innovation.
          </p>
        </div>

        <div className="carousel-item">
          <h2 className="carousel-title">Skill-Based Learning from a Young Age</h2>
          <p className="carousel-content">
            <strong>Vocational Training from Grade 6:</strong> NEP 2020 introduces vocational education starting from Grade 6, giving students hands-on experience.
            <br /><br />
            <strong>Internship Opportunities:</strong> Students will have chances to intern with local businesses, gaining practical skills for future careers.
            <br /><br />
            <strong>Goal of 50% Exposure:</strong> The policy aims for 50% of students to gain exposure to vocational training by 2025, making education more practical and job-oriented.
          </p>
        </div>

        <div className="carousel-item">
          <h2 className="carousel-title">Reformed Assessment System</h2>
          <p className="carousel-content">
            <strong>Focus on Understanding, Not Memorization:</strong> The policy changes the focus of exams to testing understanding and real-life application.
            <br /><br />
            <strong>Flexible Board Exams:</strong> Students in Grades 10 and 12 can take board exams twice a year, reducing pressure and allowing score improvement.
            <br /><br />
            <strong>PARAKH – A New Assessment Body:</strong> A National Assessment Centre called PARAKH will standardize assessments, ensuring fair and competency-based evaluation.
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
