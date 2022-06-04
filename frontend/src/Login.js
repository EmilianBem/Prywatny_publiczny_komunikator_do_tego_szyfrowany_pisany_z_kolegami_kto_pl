import React from 'react';
import './style.css';
import { Navigate } from "react-router-dom"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "email": "",
            "password": "",
            "redirect": false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        this.setState({[name]: event.target.value});
    }


    handleSubmit(e){
            let data = new URLSearchParams(new FormData(e.target));
            fetch("http://localhost:4000/login", {
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "accept": "application/json"
                },
                "credentials": 'include',
                "body": data,
                "mode": "cors"
            })
                .then(response => response.json()
                .then(response => {
                    if (response.error === undefined) {
                        this.setState({["redirect"]: true});
                    }
                    else {
                        console.log(response)
                    }
                }))
                .catch(err => {
                    console.log(err);
                });
        e.preventDefault();
    }

    render(){
        if (this.state.redirect)
            return <Navigate to="/Dashboard"/>
        return (
            <div className="container">
            <div className="vertical-center">
                <div className="jumbotron col-sm-8">
                    <h3>Please sign in below.</h3>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="email">Email</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="email" id="email" name="email" placeholder="Email"
                                       required="required" autoFocus="autofocus" value={this.state.email} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="password">Password</label>
                            <div className="col-sm-10">
                                <input className="form-control" type="password" id="password" name="password"
                                       placeholder="Password" required="required" value={this.state.password} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button className="btn btn-default" type="submit">Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
    }
}

export default Login