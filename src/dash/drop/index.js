import React from 'react'
import ReactDOM from 'react-dom'

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

export default class Drop extends React.Component {
    constructor(props) {
        super(props);
        this.showTeams = this.showTeams.bind(this)
        this.teamClick = this.teamClick.bind(this)
        this.state = {
            hidden: true,
            value: 'Select Team'
        }
    }

    showTeams() {
        console.log("here")
        this.setState({ hidden: !this.state.hidden })
    }

    teamClick(i) {
        this.setState({ value: teams[i].Team})
        this.props.callback(i)
    }

    render() {
        var list
        if (this.state.hidden) {
            list = <div style={{ position: "absolute", width: "100%", display: "none", zIndex: "1", backgroundColor: "white"}}></div>
        } else {
            list = <div style={{ position: "absolute", width: "100%", maxHeight: "30vh", overflow: "scroll", display: "block", zIndex: "1", backgroundColor: "white", border: "2px solid black"}}>
            <ul className="list-group-flush" style={{ padding: "0" }}>
                {teams.map((team, i) => <li className="list-group-item" onClick={()=>this.teamClick(i)} key={i}>{team.Team}</li>)}
            </ul>
        </div>

        }
        return(
            <div onMouseEnter={this.showTeams} onMouseLeave={this.showTeams} style={{ height: "80%", position: "relative", left: "5%", top: "60%", transform: "translateY(-50%)", display: "block", marginRight: "10px"}}>
                <h1 style={{ borderBottomStyle: "solid", marginBottom: "0", fontSize: "5vh", cursor: "pointer" }}>{this.state.value}</h1>
                {list}
            </div>
        );
    }
}