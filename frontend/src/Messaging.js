import React from 'react';
import './style.css';


class MessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "konwersacje": []
        }
    }
    render(){
        let rows = [];
        this.state.konwersacje.forEach((el) => {
            rows.push(el)
        })
        return (
            <div>
                {
                    React.Children.toArray(
                        rows.map((value, index) => <pre>
                            <img src={value.userPhoto}/>
                            <a href={"/messaging?" + value._id}>{value.nazwa}</a>
                            <br/></pre>)
                    )
                }
            </div>
        );
    }
}



class Messaging extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const scriptTag = document.createElement("script");
        scriptTag.src = "/js/messaging.js";
        scriptTag.async = true;
        document.body.appendChild(scriptTag);
    }

    render(){
        return (<div className="container">
            <div className="vertical-center">
                <div className="jumbotron col-sm-8">
                    <div className="lewo"><a href="/dashboard">&lt; Powrót</a></div>
                    <div className="jumbotron col-sm-12">
                        <h3> User Data</h3>
                    </div>
                    <form id="send-form">
                        <div className="field has-addons">
                            <p className="control is-expanded">
                                <input className="input" type="text" placeholder="Masz cos moze ten???" id="message"/>
                                <input className="button is-success" type="submit" value="&gt;&gt;"/>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
    }
}

export default Messaging