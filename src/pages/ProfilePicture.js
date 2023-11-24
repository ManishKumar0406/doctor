import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ProfilePicture() {

    const styleHeader = {
        padding: "0.8rem 1.35rem",
        marginBottom: "0px",
        backgroundColor: "rgba(33, 40, 50, 0.03)",
        borderBottom: "1px solid rgba(33, 40, 50, 0.125)"
    }
    const [profileData, setProfileData] = useState("");
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
                    if (response.data.status) {
                        setProfileData(response.data.data)
                    } else {
                        ReactSession.set("user_id", "");
                        ReactSession.set("token_id", "");
                        navigate("/login");
                    }
                }
                );
        }
    }, [])



    return (

        <div>
            <div className="card mb-4 mb-xl-0">
                <div className="card-header" style={styleHeader}><b>Profile Picture </b></div>
                <div className="card-body text-center" style={{ fontSize: "16px" }}>
                    <img className="img-account-profile rounded-circle mb-2" src="/virtubox2.jpg" alt="pic" height="200px " width=" 200px" />
                    <div className="small font-italic text-muted mb-2">JPG or PNG no larger than 5 MB</div>
                    <button className="btn btn-primary" type="button"><b>Upload new image</b></button>
                    {profileData.usertype ? ((profileData.usertype == "Patient") ?
                        <>
                            < div className="mt-3">
                                <div className="row">
                                    <div className="col-4 text-end"></div>
                                    <div className="col-4">{profileData.name ? profileData.name : "---"}</div>
                                    <div className="col-4 text-end"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4 text-end"></div>
                                    <div className="col-4">{profileData.usertype ? profileData.usertype : "---"}</div>
                                    <div className="col-4 text-end"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4 text-end"></div>
                                    <div className="col-4">{profileData.mobile ? profileData.mobile : "---"}</div>
                                    <div className="col-4 text-end"></div>
                                </div>
                            </div>

                            <Link to="/profile/doctorlist" > <button className="btn btn-success mt-3"> DoctorList
                            </button>
                            </Link>
                        </> : ""
                    )
                        : " "}

                    {profileData.usertype ? ((profileData.usertype == "Doctor") ?
                        <>
                            < div className="mt-3">
                                <div className="row">
                                    <div className="col-4 text-end"></div>
                                    <div className="col-4">{profileData.name ? profileData.name : "---"}</div>
                                    <div className="col-4 text-end"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4 text-end"></div>
                                    <div className="col-4">{profileData.usertype ? profileData.usertype : "---"}</div>
                                    <div className="col-4 text-end"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4 text-end"></div>
                                    <div className="col-4">{profileData.mobile ? profileData.mobile : "---"}</div>
                                    <div className="col-4 text-end"></div>
                                </div>
                            </div>
                            <Link to="/profile/patientlist" >
                                <button className="btn btn-success mt-3"> PatientList
                                </button>
                            </Link>
                        </> : ""
                    )
                        : " "}
                    {profileData.usertype ? ((profileData.usertype == "Admin") ?
                        <>
                            <div className="row mt-5" style={{ backgroundColor: "rgba(33, 40, 50, 0.03)" }}>
                                <div className="col-2"></div>
                                <div className="col-4"> <Link to="/profile/patientlist"><button className="btn btn-primary" type="button">PatientList </button> </Link></div>
                                <div className="col-4"><Link to="/profile/doctorlist"><button className="btn btn-success" type="button">DoctorList </button></Link></div>
                                <div className="col-2"></div>
                            </div>
                        </>
                        : " ")
                        : ""}
                </div>
            </div>
        </div >
    );
}

export default ProfilePicture;
