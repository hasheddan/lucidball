import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "38%", borderBottom: "2px solid black", zIndex: "999", position: "relative"}}>
                    <div className="col-5" style={{padding: "0 0 0 0", height: "100%", borderRight: "2px solid black", textAlign: "center"}}>
                        <h1>West</h1>
                        <div style={{fontSize: "20vh"}}>35</div>
                    </div>
                    <div className="col-2" style={{padding: "0 0 0 0", height: "100%", textAlign: "center"}}>
                        <h1>Date</h1>
                        <div style={{fontSize: "3vh"}}>October 13, 2018</div>
                    </div>
                    <div className="col-5" style={{padding: "0 0 0 0", height: "100%", borderLeft: "2px solid black", textAlign: "center"}}>
                        <h1>East</h1>
                        <div style={{fontSize: "20vh"}}>35</div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor: "white", height: "56%", zIndex: "9999", position: "relative"}}>
                </div>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "6%", borderTop: "2px solid black", zIndex: "999", position: "relative"}}>
                    <div style={{ fontSize: "4vh", paddingLeft: "1vw" }}>Thank you for supporting our work.</div>
                    <a className="btn" href="https://twitter.com/intent/tweet?text=" data-url="https://dev.twitter.com/web/tweet-button"><i className="fab fa-twitter"></i></a>
                    <a className="btn" href="https://www.paypal.me/lucidball" style={{color: "#003087"}}><i className="fab fa-paypal"></i></a>
                    <a className="btn" href="https://github.com/HashedDan/lucidball" style={{color: "black"}}><i className="fab fa-github"></i></a>
                    <h3 href="https://twitter.com/lucidball" style={{ position: "absolute", right: "10px", fontFamily: "Permanent Marker", color: "red", fontSize: "4vh"}}>LucidBall</h3>
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