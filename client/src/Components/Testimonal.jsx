import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import './Testimonal.css'; // Make sure to import the CSS file

export default function Testimonial() {
  return (
    <MDBContainer className="py-5" id="testimonials">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
        <h2 className="nep-carousel-title">Success Stories</h2>
        </MDBCol>
      </MDBRow>
      <div className="custom-testimonial-container">
        <MDBCard className="custom-testimonial-card">
          <div
            className="custom-card-top"
            style={{ backgroundColor: "#9d789b" }}
          ></div>
          <div className="custom-avatar mx-auto bg-white">
            <img
              src="https://t4.ftcdn.net/jpg/06/52/30/35/360_F_652303514_fy3u0VIB5xrA6Py6i3vpRW5VWZz8NBP9.jpg"
              className="rounded-circle img-fluid"
              alt="Vidhi Malhotra"
            />
          </div>
          <MDBCardBody className="custom-card-body">
            <h4 className="mb-4">Vidhi Malhotra</h4>
            <hr />
            <p className="dark-grey-text mt-4">
              <MDBIcon fas icon="quote-left" className="pe-2 custom-quote-icon" />
              I was overwhelmed by the choices for my future until I used Future Fit. Its clear roadmap and interactive career guidance tools helped me explore options I didn’t even know existed. Now, I’m pursuing my dream with a solid plan!
            </p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="custom-testimonial-card">
          <div
            className="custom-card-top"
            style={{ backgroundColor: "#7a81a8" }}
          ></div>
          <div className="custom-avatar mx-auto bg-white">
            <img
              src="https://media.istockphoto.com/id/1360403989/photo/young-student-with-plane-and-book-study-abroad-concept.jpg?s=612x612&w=0&k=20&c=yh4qqhHBIkaA_QP2spr8ITT5xGeJ8Ldb9OwCIafm-iA="
              className="rounded-circle img-fluid"
              alt="Kunal Joshi"
            />
          </div>
          <MDBCardBody className="custom-card-body">
            <h4 className="mb-4">Kunal Joshi</h4>
            <hr />
            <p className="dark-grey-text mt-4">
              <MDBIcon fas icon="quote-left" className="pe-2 custom-quote-icon" />
              I’ve never seen such a personalized learning experience! Future Fit understands my strengths and weaknesses and offers exactly what I need to succeed. Truly revolutionary!
            </p>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="custom-testimonial-card">
          <div
            className="custom-card-top"
            style={{ backgroundColor: "#6d5b98" }}
          ></div>
          <div className="custom-avatar mx-auto bg-white">
            <img
              src="https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q="
              className="rounded-circle img-fluid"
              alt="Meera Nair"
            />
          </div>
          <MDBCardBody className="custom-card-body">
            <h4 className="mb-4">Meera Nair</h4>
            <hr />
            <p className="dark-grey-text mt-4">
              <MDBIcon fas icon="quote-left" className="pe-2 custom-quote-icon" />
              The use of modern tools like AI-driven recommendations and gamified learning sets Future Fit apart. It’s exciting to see education meet innovation like this!
            </p>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  );
}
