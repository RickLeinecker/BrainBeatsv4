import React from 'react'
import { Card } from 'react-bootstrap'

const Profile = () => {
    return (
        <div >
            <Card className='col-md-8' style={{ margin: "auto", width: '50%', marginTop: '50px' }}>
                <div className="Title">
                    <h2>Edit Profile</h2>
                </div>
                <div className="body">
                    <div className='row'>
                        <div className="px-1 col-md-3">
                            <div className="form-group">
                                <label>Username</label>
                                <input placeholder="Username" type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="px-1 col-md-3">
                            <div className="form-group">
                                <label>Password</label>
                                <input placeholder="Password" type="password" className="form-control" />
                            </div>
                        </div>
                        <div className="px-1 col-md-6">
                            <div className="form-group">
                                <label>Email address</label>
                                <input placeholder="Email address" type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="px-1 col-md-6">
                            <div className="form-group">
                                <label>First Name</label>
                                <input placeholder="First Name" type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="px-1 col-md-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input placeholder="Last Name" type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="">
                                <label>About Me</label>
                                <textarea cols="80" placeholder="Here can be your description" rows="5" className="form-control"></textarea>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn-fill pull-right btn btn-info">Update Profile</button>
                </div>
            </Card>
        </div>
    )
}

export default Profile