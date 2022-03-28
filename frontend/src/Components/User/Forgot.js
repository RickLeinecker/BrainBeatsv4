import React, { Component, useState } from "react";
import './Login.css'

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stage, setStage] = useState(1);
    const [confirmPassword, setconfirmPassword] = useState("");

    const onSubmit = (event) => {
        alert(email);
        setStage(2);
    }
    const onSubmit2 = (event) =>{
        alert(password + " " + confirmPassword) 
        setStage(1);
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
        <div class="box">
            <div class="form-box">
                {stage == 1 && (
                    <div className="">
                        <form>
                            <h3>Forgot Account</h3>
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
                            <button type="submit" className="btn btn-primary btn-block" onClick={validateEmail}>Submit</button>
                        </form>
                    </div>
                )}

                {stage == 2 && (
                    <div className="">
                        <form>
                            <h3>New Password</h3>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Code"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <h3>Confirm password</h3>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Code"
                                    value={confirmPassword}
                                    onChange={(event) => setconfirmPassword(event.target.value)}
                                />
                            </div>


                            <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit2}>Submit</button>
                        </form>
                    </div>

                )}
            </div>
        </div>
    )
}

export default Forgot;