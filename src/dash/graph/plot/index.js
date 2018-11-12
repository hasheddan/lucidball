import React from 'react'
import ReactDOM from 'react-dom'

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}

function line(props) {
    const {ctx, startx, starty, endx, endy} = props;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.lineTo(endx, endy);
    ctx.stroke();
}

export default class Plot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 300, 300);
        // draw children “components”
        rect({ctx, x: 10, y: 10, width: 50, height: 50});
        rect({ctx, x: 110, y: 110, width: 50, height: 50});
        line({ctx, startx: 0, starty: 150, endx: 150, endy: 0});
        const intervals = 800 / 12
        var interval = intervals
        for (var i = 0; i < 11; i++) {
            line({ctx, startx: interval, starty: 0, endx: interval, endy: 400});
            interval += intervals
        }
    }

    render() {
        return(
            <div style={{ height: "100%", width: "100%", position: "relative"}}>
                <div style={{ height: "90%", width: "90%", backgroundColor: "#DCDCDC", top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute"}}>
                    <canvas ref="canvas" width={800} height={400} style={{height: "100%", width: "100%"}}/>
                </div>
            </div>
        );
    }
}