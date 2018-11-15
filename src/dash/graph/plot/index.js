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

function plotY(height, max, min, val) {
    var per = val / (max-min)
    var spot = height * per
    return height - spot - 70
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
        window.addEventListener("resize", this.updateCanvas)
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
        var clientRect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / clientRect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / clientRect.height; 
        canvas.onmousemove = (e) => {
            console.log("X: " + (e.clientX - clientRect.left)*scaleX+ ", Y: " + (e.clientY - clientRect.top)*scaleY)
        }
        // draw children “components”
        ctx.lineWidth=2;
        ctx.strokeStyle="rgba(192,192,192,0.7)";
        ctx.lineCap="round";
        const intervals = (canvas.width-40) / this.props.data.length
        console.log("INTERVALS: " + (canvas.width))
        var interval = intervals + 40
        ctx.fillStyle="blue"
        for (var i = 0; i < this.props.data.length-1; i++) {
            line({ctx, startx: interval, starty: 20, endx: interval, endy: canvas.height-70});
            var pointY = plotY(canvas.height, 30, 0, this.props.data[i][24])
            console.log("Point: " + pointY + ", Points: " + this.props.data[i][24])
            rect({ctx, x: interval-10, y: pointY-10, width: 20, height: 20})
            ctx.strokeStyle="rgba(192,192,192,0.7)";
            interval += intervals
        }
        ctx.lineWidth=4;
        ctx.strokeStyle="black";
        ctx.fillStyle="black"
        line({ctx, startx: 40, starty: canvas.height-70, endx: canvas.width-20, endy: canvas.height-70});
        line({ctx, startx: 40, starty: canvas.height-70, endx: 40, endy: 20});
        ctx.font = '30px Allerta Stencil';
        ctx.fillText(this.props.player + ' - '+ this.props.team, 40, canvas.height-15)
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