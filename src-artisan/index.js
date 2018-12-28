import React from 'react'
import ReactDOM from 'react-dom'
// import Tabletop from 'tabletop'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: []
        }
    }

    componentWillMount() {
        Tabletop.init({
            key: 'https://docs.google.com/spreadsheets/d/1s9AxzSdZ7S8aO2EARIC30kVtKsyEYOBvS36GQGOnOGQ/edit?usp=sharing',
            callback: ((data, tabletop) => {console.log(tabletop.models.Sheet1.columnNames)}),
            simpleSheet: true
        })
    }

    render() {
        return(
            <div className="container-fluid" style={{ height: "100vh" }}>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "70%", zIndex: "99", position: "relative", borderBottom: "1px solid black"}}>
                    
                </div>
                <div className="row" style={{backgroundColor: "#FFFAFA", height: "30%", zIndex: "9999", position: "relative", borderTop: "1px solid black", boxShadow: "1px 1px 1px 4px rgba(0, 0, 0, 0.8)", overflow: "scroll"}}>
                    <table class="table table-striped table-dark" style={{margin: "0 0 0 0"}}>
                        <thead>
                            <tr>
                            <th scope="col">Player</th>
                            <th scope="col">Team</th>
                            <th scope="col">Date</th>
                            <th scope="col">Matchup</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
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