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
        this.state = {
            player: 'Jimmy Butler',
            number: ' '
        }
    }

    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 800, 400);
        // draw children “components”
        ctx.lineWidth=2;
        ctx.strokeStyle="rgba(192,192,192,0.7)";
        ctx.lineCap="round";
        const intervals = 760 / 12
        var interval = intervals + 40
        for (var i = 0; i < 11; i++) {
            line({ctx, startx: interval, starty: 20, endx: interval, endy: 350});
            interval += intervals
        }
        ctx.lineWidth=2;
        ctx.strokeStyle="black";
        line({ctx, startx: 40, starty: 350, endx: 780, endy: 350});
        line({ctx, startx: 40, starty: 350, endx: 40, endy: 20});
        ctx.font = '20px Allerta Stencil';
        ctx.fillText(this.state.player + ' - Minnesota Timberwolves - TS%', 40, 380)
    }

    render() {
        return(
            <div style={{ height: "100%", width: "100%", position: "relative"}}>
                <div style={{ height: "95%", width: "95%", borderRadius: "10px", backgroundColor: "#DCDCDC", top: "52%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", fontFamily: "Allerta Stencil"}}>
                    <canvas ref="canvas" width={800} height={400} style={{height: "100%", width: "100%"}}/>
                </div>
            </div>
        );
    }
}