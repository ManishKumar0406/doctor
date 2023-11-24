import React from 'react'
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
function ProfileDatas(props) {

    const styleHeader = {
        padding: "0.8rem 1.35rem",
        marginBottom: "0px",
        backgroundColor: "rgba(33, 40, 50, 0.03)",
        borderBottom: "1px solid rgba(33, 40, 50, 0.125)"
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="card-header" style={styleHeader}><b>Profile Data of {props.profileData.usertype ? props.profileData.usertype : ""}</b></div>
                <div className="card-body" style={{ fontSize: "16px" }}>
                    <form>
                        <div className="row form-group">
                            <h6>Name</h6>
                            <p>{props.profileData.name ? props.profileData.name : "---"}</p>
                        </div>
                        <hr />
                        < div className="row gx-3">
                            <h6>Gender</h6>
                            <p>{props.profileData.gender ? props.profileData.gender : "---"}</p>
                        </div>
                        <hr />
                        <div className=" row form-group">
                            <div className="col-6">
                                <h6>Email address</h6>
                                <p>{props.profileData.email ? props.profileData.email : "---"}</p>
                            </div>
                            <div className="col-6">
                                <h6>Phone number</h6>
                                <p>{props.profileData.mobile ? props.profileData.mobile : "---"}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row form-group">
                            <div className="col-6">

                                <h6>Date of Birth</h6>
                                <p>{props.profileData.dob ? props.profileData.dob : "---"}</p>
                            </div>
                            <div className="col-6">
                                <h6>Location</h6>
                                <p>{props.profileData.city ? props.profileData.city : "---"}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="row gx-3">
                            <h6>Address</h6>
                            <p>{props.profileData.address ? props.profileData.address : "---"}</p>
                        </div>
                    </form>
                </div>
                <div className="card-footer" style={styleHeader}>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">  <Link to="/editprofile">  <button className="btn btn-primary" type="button"><b>edit profile</b></button></Link></div>
                               {ReactSession.get("usertype")=="Doctor" ? <div className="col-6"><Link to="/profile/professionalprofile"><button className="btn btn-success" type="button"><b>ProfessionalProfile</b>
                               </button></Link></div>:"" }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileDatas;


