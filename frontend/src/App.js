import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

class App extends React.Component {
    render(){
        return (
            <div className="container home">
                <div className="vertical-center">
                    <div className="jumbotron">
                        <p>Please <Link to="/Register">Register</Link> or <Link to="/Login"> Login </Link>
                            to continue!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
