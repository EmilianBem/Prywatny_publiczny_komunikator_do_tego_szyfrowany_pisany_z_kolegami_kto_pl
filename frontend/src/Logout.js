import React from 'react';
import './style.css';
import {Navigate} from "react-router-dom";


class Logout extends React.Component {
    render(){
        fetch("http://localhost:4000/logout", {
            "method": "GET",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json"
            },
            "credentials": 'include',
            "mode": "cors"
        })
        return <Navigate to="/"/>
    }
}

export default Logout