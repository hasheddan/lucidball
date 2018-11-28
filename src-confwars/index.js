import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Plot from './plot'

let dateOptions = {  
    year: 'numeric',
    month: 'short',
    day: 'numeric',
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.plotMouse= this.plotMouse.bind(this)
        this.state = {
            eastWin: 43,
            westWin: 64,
            date: '',
            stats: []
        }
    }

    componentDidMount() {
        axios.get('https://9h0e0ghn8c.execute-api.us-east-1.amazonaws.com/prod/conferencewars')
            .then((result) =>{
                var games = result.data.games
                games.sort(function(a,b){
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(a.Game_Date) - new Date(b.Game_Date);
                })
                console.log(games)
                var recentGame = games[games.length-1]
                this.setState({ stats: games, date: new Date(recentGame.Game_Date).toLocaleString('en-us', dateOptions), eastWin: recentGame.Eastern, westWin: recentGame.Western})
            })
            .catch(error => console.log(error))
    }

    plotMouse(date, east, west) {
        console.log("HERE")
        this.setState({ date: new Date(date).toLocaleString('en-us', dateOptions), eastWin: east, westWin: west})
    }

    render() {
        
        return(
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "38%", borderBottom: "2px solid black", zIndex: "999", position: "relative"}}>
                    <div className="col-5" style={{padding: "0 0 0 0", height: "100%", borderRight: "2px solid black", textAlign: "center"}}>
                        <h1 style={{textDecoration: "underline"}}>West</h1>
                        <div style={{fontSize: "20vh"}}>{this.state.westWin}</div>
                    </div>
                    <div className="col-2" style={{padding: "0 0 0 0", height: "100%", textAlign: "center"}}>
                        <h1 style={{textDecoration: "underline"}}>Date</h1>
                        <div style={{fontSize: "3vh", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>{this.state.date}</div>
                    </div>
                    <div className="col-5" style={{padding: "0 0 0 0", height: "100%", borderLeft: "2px solid black", textAlign: "center"}}>
                        <h1 style={{textDecoration: "underline"}}>East</h1>
                        <div style={{fontSize: "20vh"}}>{this.state.eastWin}</div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor: "white", height: "56%", zIndex: "9999", position: "relative"}}>
                    <Plot plotMouse={this.plotMouse} data={this.state.stats}/>
                </div>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "6%", borderTop: "2px solid black", zIndex: "999", position: "relative"}}>
                    <div style={{ fontSize: "4vh", paddingLeft: "1vw", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>Thank you for supporting our work.</div>
                    <a className="btn" href="https://twitter.com/intent/tweet?text=" data-url="https://dev.twitter.com/web/tweet-button"><i className="fab fa-twitter"></i></a>
                    <a className="btn" href="https://www.paypal.me/lucidball" style={{color: "#003087"}}><i className="fab fa-paypal"></i></a>
                    <a className="btn" href="https://github.com/HashedDan/lucidball" style={{color: "black"}}><i className="fab fa-github"></i></a>
                    <h3 style={{ position: "absolute", right: "10px", fontFamily: "Permanent Marker", color: "red", fontSize: "4vh", cursor: "pointer"}}><a href="https://lucidball.com" style={{textDecoration: "none", color: "red"}} >LucidBall</a></h3>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();