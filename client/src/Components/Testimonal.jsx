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
    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="10" xl="8" className="text-center">
        <h2 className="nep-carousel-title">Testimonials</h2>
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
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
              className="rounded-circle img-fluid"
              alt="Maria Smantha"
            />
          </div>
          <MDBCardBody className="custom-card-body">
            <h4 className="mb-4">Maria Smantha</h4>
            <hr />
            <p className="dark-grey-text mt-4">
              <MDBIcon fas icon="quote-left" className="pe-2 custom-quote-icon" />
              Lorem ipsum dolor sit amet eos adipisci, consectetur adipisicing
              elit.
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
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
              className="rounded-circle img-fluid"
              alt="Lisa Cudrow"
            />
          </div>
          <MDBCardBody className="custom-card-body">
            <h4 className="mb-4">Lisa Cudrow</h4>
            <hr />
            <p className="dark-grey-text mt-4">
              <MDBIcon fas icon="quote-left" className="pe-2 custom-quote-icon" />
              Neque cupiditate assumenda in maiores repudi mollitia
              architecto.
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
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
              className="rounded-circle img-fluid"
              alt="John Smith"
            />
          </div>
          <MDBCardBody className="custom-card-body">
            <h4 className="mb-4">John Smith</h4>
            <hr />
            <p className="dark-grey-text mt-4">
              <MDBIcon fas icon="quote-left" className="pe-2 custom-quote-icon" />
              Delectus impedit saepe officiis ab aliquam repellat rem unde
              ducimus.
            </p>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  );
}
