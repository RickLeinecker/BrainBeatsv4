import React, { Component, useState } from "react";
import sendAPI from "../sendAPI.js";
import "./Login.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    if (email === "") {
      setErrMsg("");
      setShowErr(false);
    } else {
      const dataBody = {
        email: email,
      };
      sendAPI("post", "/users/forgotPassword", dataBody)
        .then((res) => {
          if (res.data === "recovery email send") {
            console.log("recovery sent");
            setShowErr(false);
            setServerMsg(res.data);
          }
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          if (err.response.data.msg === "Email does not exist") {
            setShowErr(true);
            setErrMsg(err.response.data.msg);
          }
        });
    }
  };

  return (
    <div className="box">
      <div className="form-box">
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
            {showErr && (
              <div>
                <p>{errMsg}</p>
              </div>
            )}
            {serverMsg === "recovery email sent" && (
              <div>
                <h3>Password reset successfully sent</h3>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={sendEmail}
            >
              Submit
            </button>
          </form>
        </div>

        {/* {stage == 2 && (
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

                )} */}
      </div>
    </div>
  );
};

export default Forgot;
