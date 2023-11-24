import Navbar from "./Navbar";
import Breadcrumb1 from "./Breadcrumb1";
import ProfilePicture from "./ProfilePicture";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
ReactSession.setStoreType("LocalStorage");

function ProfessionalProfile() {

    const styleHeader = {
        padding: "0.8rem 1.35rem",
        marginBottom: "0px",
        backgroundColor: "rgba(33, 40, 50, 0.03)",
        borderBottom: "1px solid rgba(33, 40, 50, 0.125)"
    }

    const [professionalData, setProfessionalData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!ReactSession.get("token_id") || !ReactSession.get("user_id")) {
            ReactSession.set("user_id", "");
            ReactSession.set("token_id", "");
            navigate("/login");
        }
        else {
            const requestOptions = { token_id: ReactSession.get("token_id"), user_id: ReactSession.get("user_id") };
            axios.post('http://react.virtupaper.co.in/api/v1/doctor/profile-view', requestOptions)
                .then(response => {
                    if (response.data.status) {
                        console.log(response);
                        setProfessionalData(response.data.data)
                    } else {
                        ReactSession.set("user_id", "");
                        ReactSession.set("token_id", "");
                        navigate("/login");
                    }
                }
                );
        }
    }, [])


    const logOutPage = () => {
        ReactSession.set("user_id", "");
        ReactSession.set("token_id", "");
        navigate("/login");
    }
    return (
        <div style={{ backgroundColor: "#f2f6fc", color: "#69707a" }}>
            <header>
                <Navbar />
            </header>
            <div className="container">
                <div className="row">
                    <Breadcrumb1 />
                </div>
                <div className="row">
                    <div className="col-4">
                        <ProfilePicture />
                    </div>

                    <div className="col-8">
                        <div>
                            <div className="card mb-3">
                                <div className="card-header" style={styleHeader}><b>ProfessionalProfile of </b></div>
                                <div className="card-body" style={{ fontSize: "16px" }}>
                                    <form>
                                        < div className="row gx-3 form-group">
                                            <h6>Education</h6>
                                            <p>{professionalData.education ? professionalData.education : "---"}</p>
                                        </div>
                                        <hr />
                                        <div className=" row form-group">
                                            <div className="col-6">
                                                <h6>Speciality</h6>
                                                <p>{professionalData.speciality ? professionalData.speciality : "---"}</p>
                                            </div>
                                            <div className="col-6">
                                                <h6>Work Experience</h6>
                                                <p>{professionalData.work_experience ? professionalData.work_experience : "---"}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row form-group">
                                            <div className="col-6">

                                                <h6>Appointment Fees</h6>
                                                <p>{professionalData.appointment_fees ? professionalData.appointment_fees/100 : "---"}</p>
                                            </div>
                                            <div className="col-6">
                                                <h6>Awards</h6>
                                                <p>{professionalData.awards ? professionalData.awards : "---"}</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row gx-3">
                                            <h6>Bio</h6>
                                            <p>{professionalData.bio ? professionalData.bio : "---"}</p>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer" style={styleHeader}>
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="row">
                                                <div className="col-6"><Link to="/profile/professionalprofile/editprofessionalprofile">  <button className="btn btn-primary" type="button"><b>edit profile</b></button></Link></div>
                                                <div className="col-6"><Link to="/profile"><button className="btn btn-success" type="button"><b>Back</b> </button></Link></div>
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
export default ProfessionalProfile;