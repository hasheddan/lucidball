import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home'
import Dash from './dash'
import Marathon from './marathon'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curPage: 'dash'
        };
        this.pageChange = this.pageChange.bind(this)
        // console.log(window.location.hash)
    }

    pageChange(page) {
        this.setState({
            curPage: page
        })
    }

    render() {
        
        return(
            <div>
                {this.state.curPage == 'home' ? <Home pageChange={this.pageChange}/> : this.state.curPage == 'dash' ? <Dash pageChange={this.pageChange}/> : <Marathon pageChange={this.pageChange}/>}
            </div>
        );
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();