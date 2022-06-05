import React from 'react';
import './style.css';

class KonwersacjaList extends React.Component {
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
                            <a href={"/messaging?id=" + value._id}>{value.nazwa}</a>
                            <br/></pre>)
                    )
                }
            </div>
        );
    }
}



class Dasboard extends React.Component {
    constructor(props) {
        super(props);
        this.userStringRef = React.createRef();
        this.konwersacjeRef = React.createRef();
    }

    componentDidMount() {
        fetch("http://localhost:4000/user", {
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        })
            .then(response => response.json()
                .then(response => {
                    this.userStringRef.current.innerHTML = response.userString;
                    console.log(response.konwersacjeArr);
                    this.konwersacjeRef.current.setState({["konwersacje"]: response.konwersacjeArr})
                }))
            .catch(err => {
                console.log(err);
            });
    }

    render(){
        return (<div className="container">
            <div className="vertical-center">
                <div className="jumbotron col-sm-8">
                    <h3>User Data</h3>
                    <pre ref={node => this.userStringRef.current = node}></pre>
                    <pre><a href="/nowaKonfa">Utwórz</a></pre>
                    <pre>
                        <KonwersacjaList ref={node => this.konwersacjeRef.current = node}/>
                    </pre>
                </div>
            </div>
        </div>)
    }
}

export default Dasboard