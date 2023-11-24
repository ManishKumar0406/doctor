import Navbar from "./Navbar";
import Breadcrumb1 from "./Breadcrumb1";
import ProfilePicture from "./ProfilePicture";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function PatientList() {

    const navigate = useNavigate();

    const styleHeader = {
        padding: "0.8rem 1.35rem",
        marginBottom: "0px",
        backgroundColor: "rgba(33, 40, 50, 0.03)",
        borderBottom: "1px solid rgba(33, 40, 50, 0.125)"
    }
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {

        if (!ReactSession.get("token_id") || !ReactSession.get("user_id")) {
            ReactSession.set("user_id", "");
            ReactSession.set("token_id", "");
            navigate("/login");
        }
        else if (ReactSession.get("usertype") == "Admin") {
            const requestOptions = { token_id: ReactSession.get("token_id"), user_id: ReactSession.get("user_id"), usertype: "Patient" };
            axios.post('http://react.virtupaper.co.in/api/v1/admin/user-list', requestOptions)
                .then(response => {
                    if (response.data.status) {
                        setProfileData(response.data.data);
                    }
                    console.log(response);
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
                        <div className="card-header" style={styleHeader}><b>Patient's List</b></div>
                        <div div className="card-body" style={{ fontSize: "16px" }}>
                            <table class="table mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">email</th>
                                        <th scope="col">phone</th>
                                        <th scope="col">location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profileData.map((item) =>
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.city}</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer" style={styleHeader}>
                            <Link to="/profile">  <button className="btn btn-primary" type="button"><b>Back to Profile</b></button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientList;