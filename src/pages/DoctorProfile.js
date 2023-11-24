
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
ReactSession.setStoreType("LocalStorage");

function DoctorProfile() {

    const styleHeader = {
        padding: "0.8rem 1.35rem",
        marginBottom: "0px",
        backgroundColor: "rgba(33, 40, 50, 0.03)",
        borderBottom: "1px solid rgba(33, 40, 50, 0.125)"
    }

    const [profileData, setProfileData] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        if (!ReactSession.get("token_id") || !ReactSession.get("user_id")) {
            ReactSession.set("user_id", "");
            ReactSession.set("token_id", "");
            navigate("/login");
        }
        else {
            const requestOptions = { token_id: ReactSession.get("token_id"), user_id: ReactSession.get("user_id") };
            axios.post('http://react.virtupaper.co.in/api/v1/show', requestOptions)
                .then(response => {
                    if (ReactSession.get("usertype") == "Doctor") {
                        if (response.data.status) {
                            setProfileData(response.data.data)
                        }
                        else {
                            ReactSession.set("user_id", "");
                            ReactSession.set("token_id", "");
                            navigate("/login");
                        }
                    }
                    else {
                        alert("Invalid page");
                    }
                });
        }
      }
 , [])

    const logOutPage = () => {
        ReactSession.set("user_id", "");
        ReactSession.set("token_id", "");
        navigate("/login");
    }

    return (
        <div style={{ backgroundColor: "#f2f6fc", color: "#69707a" }}>
            <header>
                <nav className="navbar navbar-expand-lg bg-sucess">
                    <div className="container-fluid">
                        <div>
                            <Link to="" className="navbar-brand" style={{ color: "#0d6efd" }}>
                                <img src="virtubox2.jpg" alt="Logo" width="30" height="24"
                                    className="d-inline-block align-text-top" />
                                Virtubox
                            </Link>
                        </div>

                        <Link to="/" className="navbar-brand" style={{ color: "#0d6efd" }}>Home</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link to="/doctorprofile" className="nav-link active" style={{ color: "#0d6efd" }} aria-current="page">Profile </Link>
                            

                            </div>
                        </div>
                        <div style={{ color: "black", float: "right" }}><b className="btn" onClick={logOutPage}>Logout</b></div>
                    </div>
                </nav>
            </header>
            <div className="container">
                <div className="conatiner mb-3" style={{ backgroundColor: "lightblue", fontSize: "14px" }}>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">SignUp</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Login</li>
                        </ol>
                    </nav>
                </div>

                <div className="row">
                    <div className="col-8">
                        <div className="card mb-3">
                            <div className="card-header" style={styleHeader}><b>Profile of Doctor</b></div>
                            <div className="card-body" style={{ fontSize: "16px" }}>
                                <form>
                                    <div className="row form-group">

                                        <h6>DoctorName</h6>
                                        <p>{profileData.name ? profileData.name : "---"}</p>

                                    </div>
                                    <hr />
                                    < div className="row gx-3">

                                        <h6>Gender</h6>
                                        <p>{profileData.gender ? profileData.gender : "---"}</p>
                                    </div>
                                    <hr />
                                    <div className=" row form-group">
                                        <div className="col-6">
                                            <h6>Email address</h6>
                                            <p>{profileData.email ? profileData.email : "---"}</p>
                                        </div>
                                        <div className="col-6">
                                            <h6>Phone number</h6>
                                            <p>{profileData.mobile ? profileData.mobile : "---"}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row form-group">
                                        <div className="col-6">

                                            <h6>Date of birth</h6>
                                            <p>{profileData.dob ? profileData.dob : "---"}</p>
                                        </div>
                                        <div className="col-6">
                                            <h6>Location</h6>
                                            <p>{profileData.city ? profileData.city : "---"}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row gx-3">

                                        <h6>address</h6>
                                        <p>{profileData.address ? profileData.address : "---"}</p>

                                    </div>
                                </form>
                            </div>
                            <div className="card-footer" style={{ backgroundColor: "rgba(33, 40, 50, 0.03)", }}>
                                <Link to="/editdoctorprofile">  <button className="btn btn-primary" type="button"><b>edit profile</b></button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DoctorProfile;