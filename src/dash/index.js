import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Plot from './graph/plot'
import Drop from './drop'

const teams = [
    {
      "Team": "Atlanta Hawks",
      "Code": 1610612737
    },
    {
      "Team": "Boston Celtics",
      "Code": 1610612738
    },
    {
      "Team": "Brooklyn Nets",
      "Code": 1610612751
    },
    {
      "Team": "Charlotte Hornets",
      "Code": 1610612766
    },
    {
      "Team": "Chicago Bulls",
      "Code": 1610612741
    },
    {
      "Team": "Cleveland Cavaliers",
      "Code": 1610612739
    },
    {
      "Team": "Dallas Mavericks",
      "Code": 1610612742
    },
    {
      "Team": "Denver Nuggets",
      "Code": 1610612743
    },
    {
      "Team": "Detroit Pistons",
      "Code": 1610612765
    },
    {
      "Team": "Golden State Warriors",
      "Code": 1610612744
    },
    {
      "Team": "Houston Rockets",
      "Code": 1610612745
    },
    {
      "Team": "Indiana Pacers",
      "Code": 1610612754
    },
    {
      "Team": "Los Angeles Clippers",
      "Code": 1610612746
    },
    {
      "Team": "Los Angeles Lakers",
      "Code": 1610612747
    },
    {
      "Team": "Memphis Grizzlies",
      "Code": 1610612763
    },
    {
      "Team": "Miami Heat",
      "Code": 1610612748
    },
    {
      "Team": "Milwaukee Bucks",
      "Code": 1610612749
    },
    {
      "Team": "Minnesota Timberwolves",
      "Code": 1610612750
    },
    {
      "Team": "New Orleans Pelicans",
      "Code": 1610612740
    },
    {
      "Team": "New York Knicks",
      "Code": 1610612752
    },
    {
      "Team": "Oklahoma City Thunder",
      "Code": 1610612760
    },
    {
      "Team": "Orlando Magic",
      "Code": 1610612753
    },
    {
      "Team": "Philadelphia 76ers",
      "Code": 1610612755
    },
    {
      "Team": "Phoenix Suns",
      "Code": 1610612756
    },
    {
      "Team": "Portland Trail Blazers",
      "Code": 1610612757
    },
    {
      "Team": "Sacramento Kings",
      "Code": 1610612758
    },
    {
      "Team": "San Antonio Spurs",
      "Code": 1610612759
    },
    {
      "Team": "Toronto Raptors",
      "Code": 1610612761
    },
    {
      "Team": "Utah Jazz",
      "Code": 1610612762
    },
    {
      "Team": "Washington Wizards",
      "Code": 1610612764
    }
]

export default class Dash extends React.Component {
    constructor(props) {
        super(props);
        this.changeTeam = this.changeTeam.bind(this)
        this.getPlayerStats = this.getPlayerStats.bind(this)
        this.state = {
            team: '',
            players: [],
            selectedPlayer: '',
            stats: []
        }
    }

    changeTeam(i) {
        console.log("HEY")
        axios.get('http://localhost:5000/'+teams[i].Code+'/roster')
            .then((result) =>{
                console.log(result.data)
                this.setState({ team: teams[i].Team, players: result.data })
            })
            .catch(error => console.log(error))
        // this.setState({team: teams[i]})
        console.log("NOW HEY")
    }

    getPlayerStats(playername, playerid) {
        console.log("WAZZUP")
        axios.get('http://localhost:5000/'+playerid+'/gamebygamestats')
            .then((result) =>{
                console.log(result.data)
                this.setState({ selectedPlayer: playername, stats: result.data })
            })
            .catch(error => console.log(error))
    }    

    render() {
        const team = "Utah Jazz"
        return(
            <div className="container-fluid" style={{ height: "100vh"}}>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "17%", zIndex: "9999", boxShadow: "1px 1px 1px 4px rgba(0, 0, 0, 0.8)", position: "relative"}}>
                    {/* <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ height: "60%", marginTop: "3vh", marginLeft: "5vw"}}>
                        {this.state.team}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{overflow: "scroll"}}>
                        {teams.map((team, i) => <a className="dropdown-item" onClick={() => this.changeTeam(i)} href="#" key={i}> {team}</a>)}
                    </div> */}
                    <Drop callback={this.changeTeam} />
                    <h1 style={{ position: "absolute", right: "10px", fontFamily: "Permanent Marker", color: "red"}}>LucidBall</h1>
                </div>
                <div className="row" style={{ zIndex: "999", height: "83%" }}>
                    <div className="col-2" style={{padding: "0 0 0 0", height: "100%", overflow: "scroll", backgroundColor: "black"}}>
                        <ul className="list-group">
                            <li className="list-group-item active" onClick={()=> this.changeTeam(1)}>Team</li>
                            {this.state.players.map((player, i) => <li className="list-group-item" onClick={()=>this.getPlayerStats(player[3], player[12])} key={i}>{player[3]}</li>)}
                        </ul>
                    </div>
                    <div className="col-10" style={{height: "80vh", backgroundColor: "white"}}>
                        <Plot data={this.state.stats} player={this.state.selectedPlayer} team={this.state.team}/>
                    </div>
                </div>
            </div>
        );
    }
}