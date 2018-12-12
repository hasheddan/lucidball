import React from 'react'
import ReactDOM from 'react-dom'
// import Tabletop from 'tabletop'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eastWin: '...',
            westWin: '...',
            date: '...',
            loading: true,
            stats: []
        }
    }

    componentWillMount() {
        Tabletop.init({
            key: 'https://docs.google.com/spreadsheets/d/1s9AxzSdZ7S8aO2EARIC30kVtKsyEYOBvS36GQGOnOGQ/edit?usp=sharing',
            callback: ((data, tabletop) => {console.log(data)}),
            simpleSheet: true
        })
    }

    render() {
        return(
            <div>Hey!</div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();