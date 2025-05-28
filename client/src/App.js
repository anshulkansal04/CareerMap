import Hero from "./Components/Hero";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import Carousel from "./Components/Carousel";
import CardContainer from "./Components/CardContainer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Testimonal from "./Components/Testimonal";
import Navbar from "./Components/Navbar";
import "./Components/styles.css";
import PersonalInfoForm from "./pages/PersonalInfoForm";
import EducationDetailsForm from "./pages/EducationDetailsForm";
import ExtraDetailsForm from "./pages/ExtraDetailsForm";
import CollegePred from "./pages/CollegePred"; // Ensure this component exists
// import Mmind from "./pages/MindMap"; // Ensure this component exists
// import GraphPage from "./pages/Graph_Page";
import Scholarpage from "./pages/ScholarShip"; // Ensure this component exists
import Footer from "./Components/Footer";
import Dash from "./pages/Dashboard";
import Whoweare from "./pages/Whoweare";
import Sample1 from "./pages/Sample1";
import Sample2 from "./pages/Sample2";
import Sample3 from "./pages/Sample3";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Carousel />
                {/* <CardContainer /> */}
                <Testimonal />
                <Footer />
              </>
            }
          ></Route>
          <Route path="/personalInfo" element={<PersonalInfoForm />} />
          <Route path="/educationalInfo" element={<EducationDetailsForm />} />
          <Route path="/extraInfo" element={<ExtraDetailsForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/collegeprediction" element={<CollegePred />} />
          {/* <Route path="/careermap" element={<GraphPage />} /> */}
          <Route path="/scholarship" element={<Scholarpage />} />
          <Route path="/dashboard" element={<Dash />} />
          <Route path="/who-we-are" element={<Whoweare />} />
          <Route path="/sample1" element={<Sample1/>} />
          <Route path="/sample2" element={<Sample2/>} />
          <Route path="/sample3" element={<Sample3/>} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
