import React from 'react'

 function Breadcrumb1() {
    return (
        <div className="conatiner mb-3 " style={{ backgroundColor: "lightblue", fontSize: "14px" }}>
            <nav aria-label="breadcrumb ">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">SignUp</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Login</li>
                </ol>
            </nav>
        </div>
    );
}

export default Breadcrumb1;
