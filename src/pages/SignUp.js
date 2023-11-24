import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SignUp() {
  const [usertype, setUserType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phErr, setPhErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const [conPassErr, setConPassErr] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    let data = { usertype, name, email, mobile, password };
    const requestOptions = data;
    axios.post('http://react.virtupaper.co.in/api/v1/create', requestOptions)
      .then((response) => {
        console.log(response.data.data);
        alert(response.data.message);

      })
  }

  function handleChange(e) {
    let item = e.target.value;
    const regexMobile = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const regexUserName = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;

    if (e.target.id == "name") {
      if (item.length == 0 || item.length > 20) {
        setNameErr(true);
      } else {
        setNameErr(false);
      }
      setName(item);
    } else if (e.target.id == "email") {
      if (/\S+@\S+\.\S+/.test(e.target.value)) {
        setEmailErr(false);
      } else {
        setEmailErr(true);
      }
      setEmail(item);
    } else if (e.target.id == "mobile") {
      if (regexMobile.test(e.target.value)) {
        setPhErr(false);
      } else {
        setPhErr(true);
      }
      setMobile(item);
    } else if (e.target.id == "password") {
      if (item.length < 6) {
        setPassErr(true);
      } else {
        setPassErr(false);
      }
      setPassword(item);
    } else if (e.target.id == "password1") {
      if (password == item) {
        setConPassErr(false);
      } else {

        setConPassErr(true);
      }
      setConPassword(item);
    }
  }
  return (
    <div style={{ fontSize: "14px" }}>
      <div className="container mt-2">
        <header className="text-center">
          <h1 style={{ fontSize: "35px" }}> Sign Up</h1>
          <p>
            if you have already Account ?<Link to="/login"> Login</Link>
          </p>
        </header>
        <div className="row mt-2">
          <div className="col-6 style-form">
            <div className="row mt-2 mb-2">
              <div className="col-4">
                <div className="row">
                  <div className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      name="userTypes"
                      id="dc"
                      value="Doctor"
                      onClick={() => { setUserType("Doctor") }}

                    />
                    <label
                      className="btn btn-outline-success"
                      htmlFor="dc"
                    >
                      <b>Doctor</b>
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="radio"
                      className="btn-check"
                      name="userTypes"
                      id="pt"
                      value="Patient"
                      onClick={() => { setUserType("Patient") }}

                    />
                    <label
                      className="btn btn-outline-danger"
                      htmlFor="pt"
                    >
                      <b>Patient</b>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-8"></div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 form-group">
                  <label htmlFor="name" className="form-label mb-0">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                  />
                  {nameErr ? (
                    <span style={{ color: "red" }}>*user name is invalid</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="mb-3 form-group">
                  <label htmlFor="email" className="form-label mb-0">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter your Email"
                    onChange={handleChange}
                    required
                  />
                  {emailErr ? (
                    <span style={{ color: "red" }}>*email is invalid</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="mobile" className="form-label mb-0">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    aria-describedby="phoneHelp"
                    placeholder="Enter your mobile Number"
                    onChange={handleChange}
                    required
                  />
                  {phErr ? (
                    <span style={{ color: "red" }}>*phone is invalid</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="password" className="form-label mb-0">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="passwordHelp"
                    placeholder="Enter your Password"
                    onChange={handleChange}
                    required
                  />
                  {passErr ? (
                    <span style={{ color: "red" }}>*password is invalid</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="password1" className="form-label mb-0">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password1"
                    aria-describedby="passwordHelp"
                    placeholder="Enter your Password"
                    onChange={handleChange}
                    required
                  />
                  {conPassErr ? (
                    <span style={{ color: "red" }}>
                      *confirm password is not matched
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <button type="submit" className="btn btn-primary mt-2 mb-2">
                  Create Account
                </button>
              </form>
            </div>
          </div>
          <div className="col-6 ">
            <div className="text-center ">
              <img
                src="virtubox2.jpg"
                alt="virtubox logo"
                height="200px "
                width=" 200px"
              />
              <div className="d-grid gap-2">
                <p>
                  VirtuBox is Customer Engagement solution which enables
                  business to come live on a touch screen kiosk or mobile app
                  and enables to showcase inventory/details conveniently.
                  Customers/Users can easily browse inventory/details on touch
                  screen or mobile app and shortlist their likes by few finger
                  clicks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
