import Navbar from "./Navbar";
import Breadcrumb1 from "./Breadcrumb1";
import ProfilePicture from "./ProfilePicture";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function EditProfessionalProfile() {

    const styleHeader = {
        padding: "0.8rem 1.35rem",
        marginBottom: "0px",
        backgroundColor: "rgba(33, 40, 50, 0.03)",
        borderBottom: "1px solid rgba(33, 40, 50, 0.125)"
    }

    const [education, setEducation] = useState("");
    const [work_experience, setWork_Experience] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [appointment_fees, setAppointment_Fees] = useState();
    const [awards, setAwards] = useState("");
    const [bio, setBio] = useState("");

    const [profileData, setProfileData] = useState({});

    const navigate = useNavigate();

    const runUpdate = () => {
        let data = {
            education,
            work_experience,
            speciality,
            appointment_fees,
            awards,
            bio,
            token_id: ReactSession.get("token_id"),
            user_id: ReactSession.get("user_id")
        };

        const requestOption = data;
        axios.post('http://react.virtupaper.co.in/api/v1/doctor/profile-update', requestOption)
            .then(response => {
                if (response.data.status) {
                    navigate('/profile/professionalprofile');
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
            }

            axios.post('http://react.virtupaper.co.in/api/v1/doctor/profile-view', requestOption)
                .then(response => {

                    if (response.data.status) {
                        // setUserId(response.data.data.user_id);
                        setProfileData(response.data.data);
                        setEducation(response.data.data.education);
                        setWork_Experience(response.data.data.work_experience);
                        setSpeciality(response.data.data.speciality);
                        setBio(response.data.data.bio);
                        setAwards(response.data.data.awards);
                        setAppointment_Fees(response.data.data.appointment_fees/100);
                    }

                    else {
                        ReactSession.set("user_id", "");
                        ReactSession.set("token_id", "");
                        navigate("/login");
                    }
                })
        }
    }, []);

    function handleChange(e) {

        if (e.target.id == "speciality") {
            setSpeciality(e.target.value);
        }

        else if (e.target.id == "education") {
            setEducation(e.target.value);
        }
        else if (e.target.id == "work_experience") {
            setWork_Experience(e.target.value);
        }
        else if (e.target.id == "appointment_fees") {
            setAppointment_Fees(e.target.value);
        }
        else if (e.target.id == "awards") {
            setAwards(e.target.value);
        }
        else if (e.target.id == "bio") {
            setBio(e.target.value);
        }

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
                    <div className="col-4 ">
                        <ProfilePicture />
                    </div>

                    <div className="col-8">
                        <div className="card mb-4">
                            <div className="card-header" style={styleHeader}><b>Edit ProfessionalProfile of </b></div>
                            <div className="card-body" style={{ fontSize: "16px" }}>
                                <div className="row gx-3 mb-3">
                                <div className="form-group">
                                        <label className="small mb-1 form-label" htmlFor="education">Education</label>
                                        <input className="form-control" id="education" type="text" name="education"
                                            placeholder="MBBS, BAMS, BHMS, BUMS, MS, MD, BPT etc. " value={education} onChange={handleChange} />
                                    </div>  
                                </div>
                                <div className="row gx-3 mb-3">
                                <div className="form-group col-6">
                                        <label className="small mb-1 form-label" htmlFor="speciality">Speciality</label>
                                        <input className="form-control" id="speciality" type="text" name="speciality"
                                            placeholder="Orthopedics, General Surgery, Gynecology, Dermatology, etc." value={speciality} onChange={handleChange} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label className="small mb-1 form-label" htmlFor="work_experience">Work Experience</label>
                                        <input className="form-control" id="work_experience" type="number"
                                            placeholder="Enter your work_experience in Years ." value={work_experience} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="col-6 form-group">
                                        <label className="small mb-1 form-label" htmlFor="appointment_fees">Appointments Fees</label>
                                        <input className="form-control" id="appointment_fees" type="number" name="appointment_fees"
                                            placeholder="Enter in Rupees ." value={appointment_fees} onChange={handleChange} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label className="small mb-1 form-label" htmlFor="awards">Awards</label>
                                        <input className="form-control" id="awards" type="text" name="awards"
                                            placeholder="Mention your awards " value={awards} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row gx-3 mb-3">
                                    <div className="form-group col">
                                        <label className="form-label small mb-1" htmlFor="bio">Bio</label>
                                        <input className="form-control" placeholder="tell about yourself" name="bio" type="textarea" id="bio" value={bio} onChange={handleChange} />
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
                                                <Link to="/profile/professionalprofile"><button className="btn btn-success" type="button"><b>Back</b>
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

    )
}
export default EditProfessionalProfile;