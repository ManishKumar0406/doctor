import { Link } from "react-router-dom";
import axios from "axios";
import { ReactSession } from 'react-client-session';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function EditDoctorProfile() {
  const styleHeader = {
    padding: "0.8rem 1.35rem",
    marginBottom: "0px",
    backgroundColor: "rgba(33, 40, 50, 0.03)",
    borderBottom: "1px solid rgba(33, 40, 50, 0.125)",
  };


  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [showData, setShowData] = useState({});

  const navigate = useNavigate();

  const runUpdate = () => {
    let data = {
      name, city, dob, address, gender, token_id: ReactSession.get("token_id"),
      user_id: ReactSession.get("user_id")
    };
    const requestOption = data;
    axios.post('http://react.virtupaper.co.in/api/v1/profile-update', requestOption)
      .then(response => {
        if (response.data.status) {
          navigate('/doctorprofile');
        } else {
          alert(response.data.message);
        }
      })
  }
  useEffect(() => {
    if (!ReactSession.get("token_id") || !ReactSession.get("user_id")) {
      ReactSession.set("user_id", "");
      ReactSession.set("token_id", "");
      navigate("/login");
    } else {
      const requestOption = {
        token_id: ReactSession.get("token_id"),
        user_id: ReactSession.get("user_id")
      };
      axios.post('http://react.virtupaper.co.in/api/v1/show', requestOption)
        .then(response => {
          if (ReactSession.get("usertype") == "Doctor") {
            if (response.data.status) {
              setShowData(response.data.data);
              setName(response.data.data.name);
              setCity(response.data.data.city);
              setGender(response.data.data.gender);
              setAddress(response.data.data.address);
              setDob(response.data.data.dob);
            } else {
              ReactSession.set("user_id", "");
              ReactSession.set("token_id", "");
              navigate("/login");
            }
          }
          else {
            alert("Invalid page page")
          }
        })
    }
  }, []);

  function handleChange(e) {
    if (e.target.id == "address") {
      setAddress(e.target.value);
    }
    else if (e.target.id == "doctorName") {
      setName(e.target.value);
    }

    else if (e.target.name == "gender") {
      if (e.target.id == "Male") {
        setGender(e.target.id);
      }
      else if (e.target.id == "Female") {
        setGender(e.target.id);
      }
      else if (e.target.id == "Other") {
        setGender(e.target.id);
      }
    }
    else if (e.target.id == "dob") {
      setDob(e.target.value);
    }
    else if (e.target.id == "city") {
      setCity(e.target.value);
    }

  }


  return (
    <div style={{ backgroundColor: "#f2f6fc", color: "#69707a" }}>
      <header>
        <nav className="navbar navbar-expand-lg bg-sucess">
          <div className="container-fluid">
            <div>
              <Link
                to=""
                className="navbar-brand"
                style={{ color: "#0d6efd" }}
              >
                <img
                  src="/virtubox2.jpg"
                  alt="Logo"
                  width="30"
                  height="24"
                  className="d-inline-block align-text-top"
                />
                Virtubox
              </Link>
            </div>

            <Link
              to="/"
              className="navbar-brand"
              style={{ color: "#0d6efd" }}
            >
              Home
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link
                  to="/doctorprofile"
                  className="nav-link active"
                  style={{ color: "#0d6efd" }}
                  aria-current="page"
                >
                  Doctor{" "}
                </Link>
                <Link
                  to="/patientprofile"
                  className="nav-link active"
                  style={{ color: "#0d6efd" }}
                >
                  Patient
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>{" "}
      <div className="container">
        <div
          className="conatiner mb-3"
          style={{ backgroundColor: "lightblue", fontSize: "14px" }}
        >
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">SignUp</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Login
              </li>
            </ol>
          </nav>
        </div>
        <div className="row">
          <div className="col-4 ">
            <div>
              <div className="card mb-4 mb-xl-0">
                <div className="card-header" style={styleHeader}>
                  <b>Profile Picture</b>
                </div>
                <div
                  className="card-body text-center"
                  style={{ fontSize: "16px" }}
                >
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    src="virtubox2.jpg"
                    alt="pic"
                    height="200px "
                    width=" 200px"
                  />
                  <div className="small font-italic text-muted mb-2">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <button className="btn btn-primary" type="button">
                    <b>Upload new image</b>
                  </button>
                  <div className="mt-2">
                    <div className="row mt-3">
                      <div className="col-6 text-end">
                        <b>Doctor Name :</b>
                      </div>
                      <div className="col-6">name</div>
                    </div>
                    <div className="row">
                      <div className="col-6 text-end">
                        <b>Gender:</b>
                      </div>
                      <div className="col-6">M/F/others</div>
                    </div>
                    <div className="row">
                      <div className="col-6 text-end">
                        <b>Qualification :</b>
                      </div>
                      <div className="col-6">MBBS,BAMS,etc</div>
                    </div>

                    <div className="row">
                      <div className="col-6 text-end">
                        <b>Experience:</b>
                      </div>
                      <div className="col-6">in years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card mb-4">
              <div className="card-header" style={styleHeader}><b>Edit Details of Doctor</b></div>
              <div className="card-body" style={{ fontSize: "16px" }}>
                <div className="mb-3 row  gx-3">
                  <div className="form-group">
                    <label className="small mb-1 form-label" htmlFor="doctorName">DoctorName</label>
                    <input className="form-control" id="doctorName" type="text" name="name"
                      placeholder="Enter your name" value={name} onChange={handleChange} />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-3"><h6>Gender</h6></div>
                  < div className="col-3">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={handleChange} name="gender" checked={gender === 'Male'} id="Male" value="Male" />
                      <label className="form-check-label" htmlFor="male">male</label >
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={handleChange} name="gender" checked={gender === 'Female'} id="Female" value="Female" />
                      <label className="form-check-label" htmlFor="female">female</label >
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" onChange={handleChange} name="gender" checked={gender === 'Other'} id="Other" value="Other" />
                      <label className="form-check-label" htmlFor="others">others</label>
                    </div>
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-6 form-group">
                    <label className="small mb-1 form-label" htmlFor="email">Email Address</label>
                    <input readOnly className="form-control" id="email" type="email" name="email"
                      placeholder="Enter your email" value={showData.email} />
                  </div>
                  <div className="col-6 form-group">
                    <label className="small mb-1 form-label" htmlFor="mobile">moble</label>
                    <input readOnly className="form-control" id="mobile" type="tel"
                      placeholder="Enter your phone number" value={showData.mobile} />
                  </div>

                </div>

                <div className="row gx-3 mb-3">
                  <div className="col-6 form-group">
                    <label className="small mb-1 form-label" htmlFor="dob">Date of birth</label>
                    <input className="form-control" id="dob" type="date" name="dob"
                      placeholder="Enter your birthday" value={dob} onChange={handleChange} />
                  </div>
                  <div className="col-6 form-group">
                    <label className="small mb-1 form-label" htmlFor="city">Location</label>
                    <input className="form-control" id="city" type="text" name="city"
                      placeholder="Enter your city" value={city} onChange={handleChange} />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="form-group col">
                    <label className="form-label small mb-1" htmlFor="address">address</label>
                    <input className="form-control" name="address" type="textarea" id="address" value={address} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="card-footer" style={styleHeader}>
                <div className="row">
                  <div className="col-5">
                    <div className="row">
                      <div className="col-6">
                        <button className="btn btn-primary" type="button" onClick={runUpdate}><b>SaveChanges</b></button>
                      </div>
                      < div className="col-6">
                        <Link to="/doctorprofile"><button className="btn btn-success" type="button"><b>Back</b>
                        </button></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditDoctorProfile;
