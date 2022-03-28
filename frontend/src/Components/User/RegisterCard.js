import React, { Component, useState } from "react";
import './Login.css'

const RegisterCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (event) => {
        alert(email + " " + password);
    }

    //Validates email field
    const validateEmail = (event) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regexp.test(email))
        {
            onSubmit();
        }
        else
        {
            alert("FALSE EMAIL");
        }
    }

    return (
        <div className="">
            <form>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={validateEmail}>Submit</button>
            </form>
        </div>
    )
}

export default RegisterCard;