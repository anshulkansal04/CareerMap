import React, { useEffect, useRef } from "react";
import { Markmap } from "markmap-view";
import { Transformer } from "markmap-lib";

const MindMap = ({ markdownContent }) => {
  const svgRef = useRef(null);
  const markmapRef = useRef(null);

  useEffect(() => {
    if (markdownContent) {
      const transformer = new Transformer();
      const { root } = transformer.transform(markdownContent);

      const collapseAll = (node) => {
        node.expanded = false;
        node.children?.forEach(collapseAll); 
      };
      collapseAll(root);
      if (markmapRef.current) {
        markmapRef.current.destroy();
        markmapRef.current = null;
      }
      markmapRef.current = Markmap.create(svgRef.current, {
        fit: true,
      });
      markmapRef.current.setData(root);
      markmapRef.current.fit();

      const svg = svgRef.current;
      svg.addEventListener("click", (event) => {
        const target = event.target.closest("g.node");
        if (target && markmapRef.current) {
          const nodeId = target.getAttribute("data-id");
          const toggleNode = (node) => {
            if (node.id === nodeId) {
              node.expanded = !node.expanded;
            }
            node.children?.forEach(toggleNode);
          };
          toggleNode(root);
          markmapRef.current.setData(root);
          markmapRef.current.fit();
        }
      });
    }

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy();
      }
    };
  }, [markdownContent]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

function Mmind() {
  const markdownContent = `
  # Career Counseling for 12th Grade Students

  ## 1. Science Stream
  
  ### a. Medical Specializations
  
  #### 1. **MBBS (Bachelor of Medicine and Bachelor of Surgery)**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Anatomy, Physiology, Pathology, Surgery, Medicine                                                         |
  | **Avg Salary**          | ₹6-20 LPA (varies based on specialization)                                                                |
  | **Placement %**         | 70-90%                                                                                                     |
  | **Exams**               | NEET UG (National Eligibility cum Entrance Test), AIIMS UG (for AIIMS colleges)                           |
  | **Preparation Guide**   | Focus on Biology, Physics, and Chemistry (NEET syllabus). Study concepts in detail with application-oriented questions. |
  | **Books**               | "Trueman's Biology" (Volume 1 and 2), "Physics for NEET" by DC Pandey, "Chemistry for NEET" by O.P. Tandon |
  
  #### 2. **BDS (Bachelor of Dental Surgery)**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Dental Anatomy, Pathology, Oral Surgery, Orthodontics                                                      |
  | **Avg Salary**          | ₹4-8 LPA                                                                                                   |
  | **Placement %**         | 60-80%                                                                                                     |
  | **Exams**               | NEET UG, AIIMS BDS (for AIIMS Dental courses)                                                             |
  | **Preparation Guide**   | Focus on Medical subjects like Biology, Physics, and Chemistry for NEET preparation.                      |
  | **Books**               | "Textbook of Dental Anatomy" by Shafers, "Essentials of Dental Radiography & Radiology" by W.J. McCauley, "NEET: The Complete Guide for Dental" by Dr. Arun Arora |
  
  #### 3. **Pharmacy (B.Pharm)**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Pharmaceutical Chemistry, Drug Development, Pharmacology, Pharmaceutical Biotechnology                      |
  | **Avg Salary**          | ₹3-8 LPA                                                                                                   |
  | **Placement %**         | 60-85%                                                                                                     |
  | **Exams**               | GPAT (for M.Pharm), State Pharmacy Entrance Exams                                                        |
  | **Preparation Guide**   | Focus on Chemistry, Biology, and Pharmaceutical concepts. Study medicinal chemistry and drug development.  |
  | **Books**               | "Pharmaceutics: The Science of Dosage Form Design" by Michael E. Aulton, "Basic & Clinical Pharmacology" by Bertram Katzung, "Organic Chemistry for Pharmacy" by Jagdish Singh |
  
  ### b. B.Tech Specializations
  
  #### 1. **Computer Science Engineering (CSE)**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Programming, AI/ML, Data Science, Cybersecurity, Blockchain                                               |
  | **Avg Salary**          | ₹8-15 LPA                                                                                                  |
  | **Placement %**         | 90-98%                                                                                                     |
  | **Relevant Skills**     | Python, Java, Cloud Computing, AI, Problem Solving                                                       |
  | **Top Colleges**        | IITs, NITs, IIITs, BITS Pilani, VIT                                                                      |
  | **Exams**               | JEE Main, JEE Advanced, State CETs, BITSAT                                                               |
  | **Preparation Guide**   | Focus on problem-solving, data structures, and algorithms                                                |
  | **Books**               | "Introduction to Algorithms" by Cormen, "Artificial Intelligence: A Modern Approach" by Stuart Russell & Peter Norvig, "Head First Java" by Kathy Sierra, "The Complete Reference C" by Herbert Schildt |
  
  #### 2. **Mechanical Engineering**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Thermodynamics, Robotics, Manufacturing Processes, Automotive Engineering                                  |
  | **Avg Salary**          | ₹6-12 LPA                                                                                                  |
  | **Placement %**         | 70-85%                                                                                                     |
  | **Relevant Skills**     | CAD, CAM, Fluid Mechanics, Thermodynamics                                                                 |
  | **Top Colleges**        | IITs, NITs, COEP, DTU                                                                                     |
  | **Exams**               | JEE Main, JEE Advanced, State CETs                                                                       |
  | **Preparation Guide**   | Focus on theory, practical knowledge, and problem-solving                                                |
  | **Books**               | "Engineering Mechanics" by R.K. Bansal, "Manufacturing Engineering and Technology" by Serope Kalpakjian, "Fluid Mechanics" by Frank M. White |
  
  #### 3. **Electronics & Communication Engineering (ECE)**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Embedded Systems, VLSI, Signal Processing, Communication Networks                                         |
  | **Avg Salary**          | ₹5-10 LPA                                                                                                  |
  | **Placement %**         | 75-90%                                                                                                     |
  | **Relevant Skills**     | Circuit Design, Signal Processing, Embedded Systems, IoT                                                 |
  | **Top Colleges**        | IITs, NITs, BITS Pilani, IIITs                                                                            |
  | **Exams**               | JEE Main, JEE Advanced, State CETs, GATE (for higher studies)                                            |
  | **Preparation Guide**   | Focus on electronics fundamentals and circuit design                                                     |
  | **Books**               | "Electronic Devices and Circuit Theory" by Robert L. Boylestad, "Microelectronic Circuits" by Sedra & Smith, "Signals and Systems" by Alan V. Oppenheim |
  
  #### 4. **Civil Engineering**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Structural Engineering, Construction Management, Hydraulics, Geotechnical Engineering                     |
  | **Avg Salary**          | ₹5-9 LPA                                                                                                   |
  | **Placement %**         | 65-80%                                                                                                     |
  | **Relevant Skills**     | AutoCAD, Surveying, Structural Design, Concrete & Steel                                                   |
  | **Top Colleges**        | IITs, NITs, SRM, BIT Mesra                                                                                |
  | **Exams**               | JEE Main, JEE Advanced, State CETs                                                                       |
  | **Preparation Guide**   | Focus on design principles, materials, and construction techniques                                        |
  | **Books**               | "Introduction to Civil Engineering" by K.K. Verma, "Strength of Materials" by R.K. Bansal, "Building Construction" by Sushil Kumar |
  
  #### 5. **Other Engineering Streams**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Varies by stream (Electrical, Power Systems, Aerospace, etc.)                                             |
  | **Avg Salary**          | ₹5-11 LPA                                                                                                  |
  | **Placement %**         | 65-85%                                                                                                     |
  | **Relevant Skills**     | Depends on stream (e.g., circuit design, thermodynamics)                                                  |
  | **Exams**               | JEE Main, JEE Advanced, State CETs, GATE (for higher studies)                                             |
  | **Preparation Guide**   | Refer to the respective engineering stream's curriculum                                                  |
  | **Books**               | **Electrical Engineering**: "Fundamentals of Electrical Engineering" by Giorgio Rizzoni, **Chemical Engineering**: "Transport Processes and Unit Operations" by Christie J. Geankoplis |
  
  ## 2. Commerce Stream
  
  ### a. Finance & Accounting Specializations
  
  #### 1. **Chartered Accountancy (CA)**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Taxation, Auditing, Financial Management                                                                   |
  | **Avg Salary**          | ₹8-20 LPA                                                                                                  |
  | **Placement %**         | 70-90%                                                                                                     |
  | **Relevant Skills**     | Financial Planning, Taxation, Auditing, Accounting                                                        |
  | **Exams**               | CA Foundation, CA Intermediate, CA Final                                                                  |
  | **Preparation Guide**   | Focus on core accounting principles, auditing standards, and taxation laws                                 |
  | **Books**               | "Financial Accounting" by T.S. Grewal, "Direct Taxes" by Dr. V.K. Singhania, "Advanced Accounting" by S.K. Agarwal |
  
  #### 2. **Cost Management Accounting (CMA)**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Avg Salary**          | ₹7-15 LPA                                                                                                  |
  | **Placement %**         | 60-85%                                                                                                     |
  | **Skills**              | Cost Analysis, Financial Control, Performance Management                                                 |
  | **Exams**               | CMA Foundation, CMA Intermediate, CMA Final                                                              |
  
  ## 3. Arts/Humanities Stream
  
  ### a. Language & Literature Specializations
  
  #### 1. **English/Foreign Languages**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Literature, Linguistics, Translation                                                                       |
  | **Avg Salary**          | ₹4-8 LPA                                                                                                   |
  | **Placement %**         | 50-75%                                                                                                     |
  | **Exams**               | None specific; can pursue higher studies (MA, M.Phil)                                                     |
  | **Books**               | "English Literature: A Critical Guide" by John Peck, "A History of English Literature" by Michael Alexander |
  
  ### b. Social Sciences Specializations
  
  #### 1. **Psychology**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Clinical Psychology, Counseling, Industrial Psychology                                                  |
  | **Avg Salary**          | ₹4-10 LPA                                                                                                  |
  | **Placement %**         | 40-70%                                                                                                     |
  | **Exams**               | Entrance exams for Master's (e.g., DU, Jamia Millia Islamia)                                             |
  | **Books**               | "Psychology: Themes and Variations" by Wayne Weiten, "Introduction to Psychology" by James W. Kalat        |
  
  #### 2. **Political Science / Sociology**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Core Areas**          | Governance, Public Policy, Social Research                                                                 |
  | **Avg Salary**          | ₹4-8 LPA                                                                                                   |
  | **Placement %**         | 40-70%                                                                                                     |
  
  ## 4. Media & Communication Stream
  
  ### a. Journalism Specializations
  
  #### 1. **Print/Digital Journalism**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Avg Salary**          | ₹4-10 LPA                                                                                                  |
  | **Placement %**         | 50-80%                                                                                                     |
  | **Exams**               | Journalism entrance exams, various college-specific exams                                                |
  | **Books**               | "Journalism Ethics at the Crossroads of Life and Law" by RonNell Andersen Jones, "The Elements of Journalism" by Bill Kovach & Tom Rosenstiel |
  
  ### b. Mass Communication Specializations
  
  #### 1. **Public Relations / Advertising**
  
  | **Attribute**           | **Description**                                                                                           |
  |-------------------------|-----------------------------------------------------------------------------------------------------------|
  | **Avg Salary**          | ₹6-15 LPA                                                                                                  |
  | **Placement %**         | 60-90%                                                                                                     |
  | **Exams**               | Entrance exams for Mass Communication colleges                                                           |
  | **Books**               | "Advertising and Promotion" by George E. Belch, "Public Relations: Strategies and Tactics" by Dennis L |
`;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MindMap markdownContent={markdownContent} />
    </div>
  );
}

export default Mmind;