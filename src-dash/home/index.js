import React from 'react';
import ReactDOM from 'react-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <h1 onClick={() => this.props.pageChange('dash')}>LucidBall</h1>
                        <h3 onClick={() => this.props.pageChange('dash')}>Dashboard</h3>
                        <h3 onClick={() => this.props.pageChange('marathon')}>Marathon</h3>
                    </div>
                </div>
            </div>
        );
    }
}