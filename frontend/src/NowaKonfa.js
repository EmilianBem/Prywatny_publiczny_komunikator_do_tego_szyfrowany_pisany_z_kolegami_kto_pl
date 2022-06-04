import React from 'react';
import './style.css';

class NowaKonfa extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let scriptTag = document.createElement("script");
        scriptTag.src = "/js/nowaKonfa.js";
        scriptTag.async = true;
        document.body.appendChild(scriptTag);
    }

    render(){
        return (<div className="container">
            <div className="vertical-center">
                <div className="jumbotron col-sm-8">
                    <div className="lewo"><a href="/dashboard">&lt; Powrót</a></div>
                    <div className="jumbotron col-sm-12">
                        <h3>Utwórz nową konwersacje:</h3>
                    </div>
                    <form id="send-form" onSubmit={this.handleSubmit}>
                        <div className="field has-addons">
                            <p className="control is-expanded">
                                <input className="input" type="text" placeholder="Nazwa konwersacji"
                                       id="nazwa"/><br/><br/>
                                <input className="input" type="text" placeholder="Odbiorcy(id)..." id="odbiorcy"/>
                                <input className="button is-success" type="submit" value="&gt;&gt;"/>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
    }
}

export default NowaKonfa