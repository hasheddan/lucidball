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

function scaleY(max, min, val) {
    var height = 330
    var per = val / (max-min)
    var spot = 330 * per
    return spot + 20
}

export default class Plot extends React.Component {
    constructor(props) {
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this)
        this.state = {
            player: '',
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
        const intervals = 760 / this.props.data.length
        var interval = intervals + 40
        ctx.fillStyle="blue"
        var pointY = scaleY(100, 0, 50)
        for (var i = 0; i < this.props.data.length-1; i++) {
            line({ctx, startx: interval, starty: 20, endx: interval, endy: 350});
            rect({ctx, x: interval-5, y: pointY-5, width: 10, height: 10})
            ctx.strokeStyle="rgba(192,192,192,0.7)";
            interval += intervals
        }
        ctx.lineWidth=2;
        ctx.strokeStyle="black";
        ctx.fillStyle="black"
        line({ctx, startx: 40, starty: 350, endx: 780, endy: 350});
        line({ctx, startx: 40, starty: 350, endx: 40, endy: 20});
        ctx.font = '20px Allerta Stencil';
        ctx.fillText(this.props.player + ' - '+ this.props.team, 40, 380)
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