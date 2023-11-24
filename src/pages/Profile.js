import Navbar from "./Navbar";
import Breadcrumb1 from "./Breadcrumb1";
import ProfilePicture from "./ProfilePicture";
import ProfileDatas from "./ProfileDatas";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';

ReactSession.setStoreType("LocalStorage");

function Profile() {

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
                        <ProfileDatas profileData={profileData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;