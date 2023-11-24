import React from 'react'
import { Link } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();
    const logOutPage = () => {
        ReactSession.set("user_id", "");
        ReactSession.set("token_id", "");
        navigate("/login");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-sucess">
                <div className="container-fluid">
                    <div>
                        <Link to="" className="navbar-brand" style={{ color: "#0d6efd" }}>
                            <img src="/virtubox2.jpg" alt="Logo" width="30" height="24"
                                className="d-inline-block align-text-top" />
                            Virtubox
                        </Link>
                    </div>
                    <div>
                        <Link to="/" className="navbar-brand" style={{ color: "#0d6efd" }}>Home</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/profile" className="nav-link active" style={{ color: "#0d6efd" }}>Profile</Link>
                        </div>
                    </div>
                    <div style={{ color: "black", float: "right" }}><b className="btn" onClick={logOutPage}>Logout</b></div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;