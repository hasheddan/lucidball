import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Plot from './graph/plot'

const teams = ["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets","Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets","Detroit Pistons","Golden State Warriors","Houston Rockets","Indiana Pacers","Los Angeles Clippers","Los Angeles Lakers","Memphis Grizzlies","Miami Heat","Milwaukee Bucks","Minnesota Timberwolves","New Orleans Pelicans","New York Knicks","Oklahoma City Thunder","Orlando Magic","Philadelphia Sixers","Phoenix Suns","Portland Trail Blazers","Sacramento Kings","San Antonio Spurs","Toronto Raptors","Utah Jazz","Washington Wizards"]

export default class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: 'Select a team'
        }
    }

    changeTeam(i) {
        axios.get('', {headers: {'Access-Control-Allow-Origin': '*'}})
            .then((result) => console.log(result))
        this.setState({team: teams[i]})
    }

    render() {
        const team = "Utah Jazz"
        return(
            <div className="container-fluid" style={{ height: "100vh"}}>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "17%", zIndex: "9999", boxShadow: "1px 1px 1px 4px rgba(0, 0, 0, 0.8)", position: "relative"}}>
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: "60%", marginTop: "3vh", marginLeft: "5vw"}}>
                        {this.state.team}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{overflow: "scroll"}}>
                        {teams.map((team, i) => <a class="dropdown-item" onClick={() => this.changeTeam(i)} href="#" key={i}> {team}</a>)}
                    </div>
                </div>
                <div className="row" style={{ zIndex: "999", marginTop: "4px" }}>
                    <div className="col-2" style={{padding: "0 0 0 0", height: "80vh", overflow: "scroll", backgroundColor: "pink"}}>
                        <ul class="list-group">
                            <li class="list-group-item active">Team</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                            <li class="list-group-item">Dapibus ac facilisis in</li>
                            <li class="list-group-item">Morbi leo risus</li>
                            <li class="list-group-item">Porta ac consectetur ac</li>
                            <li class="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                    <div className="col-10" style={{height: "80vh", backgroundColor: "white"}}>
                        <Plot />
                    </div>
                </div>
            </div>
        );
    }
}