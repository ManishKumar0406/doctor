import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import axios from "axios";
ReactSession.setStoreType("LocalStorage");
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { email, password };
        const requestOptions = data;
        console.log(requestOptions)
        axios.post('http://react.virtupaper.co.in/api/v1/login', requestOptions)
            .then((response) => {
                console.log(response.data);
                if (response.data.status) {
                    ReactSession.set("token_id", response.data.token_id);
                    ReactSession.set("user_id", response.data.data.id);
                    ReactSession.set("usertype", response.data.data.usertype);
                    console.log(ReactSession.get("usertype"));
                    if (ReactSession.get("usertype") == "Patient") {
                        navigate("/profile");
                        alert("welcome to patient profile page");
                    }

                    else if (ReactSession.get("usertype") == "Doctor") {
                        navigate("/profile");
                        alert("welcome to doctor profile page");
                    }
                    else if (ReactSession.get("usertype") == "Admin") {
                        navigate("/profile");
                        alert("welcome to Admin profile page");
                    }

                }
                else {
                    console.log("wrong user");
                }
            });
    }
    function handleChange(e) {
        const regexPhone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        let item = e.target.value;
        if (e.target.id === "email") {
            if (/\S+@\S+\.\S+/.test(e.target.value)) {
                setEmailErr(false);
            }
            else {
                setEmailErr(true);
            }
            setEmail(item);
        }
        else if (e.target.id === "password") {
            if (item.length < 6) {
                setPassErr(true);
            }
            else {
                setPassErr(false);
            }
            setPassword(item);
        }
    }

    useEffect(() => {
        if (ReactSession.get("token_id") && ReactSession.get("user_id")) {
            navigate("/profile");
        }
    }, [])
    return (
        <div style={{ fontSize: "14px" }}>
            <div className="container">

                <header className="text-center">
                    <h1> Login</h1>
                    <p>if you have not created Account ?<Link to="/">SignUp</Link></p>
                </header>
                <div className="row">
                    <div className="col-6 style-form mt-4">
                        <div className="row " style={{ backgroundColor: "#dee5f3", padding: "5px" }}> <h5> Login here</h5></div>
                        <form className="mt-5 " onSubmit={handleSubmit}>
                            <div className="mb-3 form-group">
                                <label htmlFor="email" className="form-label ">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email}
                                    placeholder="Enter your Email" name="email" onChange={handleChange} required />
                                {emailErr ? <span style={{ color: "red" }}>*email is invalid</span> : ""}
                            </div>
                            <div className="mb-3 form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Enter your Password" value={password}
                                    name="password" onChange={handleChange} required />
                                {passErr ? <span style={{ color: "red" }}>*password is invalid</span> : ""}
                            </div>
                            <button type="submit" className="btn btn-primary mt-2 mb-2"><b>Login</b></button>
                        </form>
                    </div>
                    <div className="col-6 " >
                        <div className="text-center ">
                            <img src="virtubox2.jpg" style={{ marginTop: "0px" }} alt="virtubox logo" height="200px " width=" 200px" />
                            <div className="d-grid gap-2">

                                VirtuBox is Customer Engagement solution which enables business to come live on a touch screen kiosk
                                or mobile app and enables to showcase inventory/details conveniently. Customers/Users can easily browse
                                inventory/details on touch screen or mobile app and shortlist their likes by few finger clicks
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;