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
        var dpi = window.devicePixelRatio;
        const canvas = this.refs.canvas
        const ctx = this.refs.canvas.getContext('2d');
        let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
        //get CSS width
        let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
        //scale the canvas
        canvas.setAttribute('height', style_height * dpi);
        canvas.setAttribute('width', style_width * dpi);
        console.log("Height: " + canvas.height)
        console.log("Width: " + canvas.width)
        ctx.translate(0.5,0.5)
        ctx.clearRect(0,0, canvas.width, canvas.height);
        // draw children “components”
        ctx.lineWidth=2;
        ctx.strokeStyle="rgba(192,192,192,0.7)";
        ctx.lineCap="round";
        const intervals = (canvas.width-40) / this.props.data.length
        console.log("INTERVALS: " + (canvas.width))
        var interval = intervals + 40
        ctx.fillStyle="blue"
        var pointY = scaleY(100, 0, 50)
        for (var i = 0; i < this.props.data.length-1; i++) {
            line({ctx, startx: interval, starty: 20, endx: interval, endy: canvas.height-50});
            // rect({ctx, x: interval-5, y: pointY-5, width: 50, height: 50})
            ctx.strokeStyle="rgba(192,192,192,0.7)";
            interval += intervals
        }
        ctx.lineWidth=2;
        ctx.strokeStyle="black";
        ctx.fillStyle="black"
        line({ctx, startx: 40, starty: canvas.height-50, endx: canvas.width-20, endy: canvas.height-50});
        line({ctx, startx: 40, starty: canvas.height-50, endx: 40, endy: 20});
        ctx.font = '20px Allerta Stencil';
        ctx.fillText(this.props.player + ' - '+ this.props.team, 40, canvas.height-20)
    }

    render() {
        return(
            <div style={{ height: "100%", width: "100%", position: "relative"}}>
                <div style={{ height: "95%", width: "95%", borderRadius: "10px", backgroundColor: "#DCDCDC", top: "52%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", fontFamily: "Allerta Stencil"}}>
                    <canvas ref="canvas" style={{height: "100%", width: "100%"}}/>
                </div>
            </div>
        );
    }
}