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

function plotY(height, max, min, zero, val) {
    console.log("MAX: " + max)
    console.log("MIN: " + min)
    console.log("MAXMINUSMIN: " + (max - min))
    var per = val / (max-min)
    console.log("val: " + val)
    console.log("PER: " + per)
    var spot = height * per
    if (val > 0) {
        return height - spot - 20 - zero
    } else if (val < 0) {
        return height - spot - 20 - zero
    } else { return zero }
}

export default class Plot extends React.Component {
    constructor(props) {
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this)
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
        // Make on half pixels for sharper render
        ctx.translate(0.5,0.5)
        // Clear current canvas
        ctx.clearRect(0,0, canvas.width, canvas.height)
        // Draw Background
        ctx.fillStyle = "#FFFAFA"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // Determine x and y coordinates on canvas
        var clientRect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / clientRect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / clientRect.height;
        // Get Plot bounds
        var minX = 60, maxX = canvas.width-20, minY = canvas.height-20, maxY = 20
        var zero = .5*minY
        // draw children “components”
        ctx.lineWidth=2;
        ctx.strokeStyle="rgba(192,192,192,0.7)";
        ctx.lineCap="round";
        const intervals = (canvas.width-60) / this.props.data.length
        console.log("INTERVALS: " + (canvas.width))
        var interval = 70
        ctx.fillStyle="#d3d3d3"
        ctx.font = '200px Inconsolata';
        ctx.fillText('WEST', (maxX-minX)/2 - 230, 200)
        ctx.fillText('East', (maxX-minX)/2 - 230, 500)
        // Get max & min point value
        var maxPoints = 0
        var minPoints = 0
        for (var i = 0; i < this.props.data.length-1; i++) {
            var diff = parseInt(this.props.data[i].Western) - parseInt(this.props.data[i].Eastern)
            // Get absolute max value
            Math.abs(diff) > maxPoints && (maxPoints = diff)
        }
        // Set max and min to be same except sign
        minPoints = -1 * maxPoints
        // Scale y axis maximum to be 20% more than max diff and 20% less than min diff
        maxPoints = (.2 * maxPoints) + maxPoints
        minPoints = (.2 * minPoints) + minPoints
        // Array of interval x positions
        var inters = []
        var prevY = zero
        var prevX = minX
        ctx.fillStyle="blue"
        for (var i = 0; i < this.props.data.length; i++) {
            inters.push(interval)
            line({ctx, startx: interval, starty: maxY, endx: interval, endy: minY});
            var diff = this.props.data[i].Western - this.props.data[i].Eastern
            var pointY = plotY(canvas.height, maxPoints, minPoints, zero, diff)
            console.log("Point: " + pointY + ", Points: " + this.props.data[i] + ", X: " + interval)
            rect({ctx, x: interval-10, y: pointY-10, width: 20, height: 20})
            ctx.strokeStyle="black";
            line({ctx, startx: prevX, starty: prevY, endx: interval, endy: pointY});
            ctx.strokeStyle="rgba(192,192,192,0.7)";
        //     // Plot Average
        //     ctx.fillStyle="rgba(255,0,0,.4)"
        //     var curAvg = total / gameCount
        //     console.log("AVERAGE: " + curAvg)
        //     avgs.push(curAvg)
        //     var plotAvg = plotY(canvas.height, maxPoints, minPoints, curAvg)
        //     rect({ctx, x: interval-10, y: plotAvg-10, width: 20, height: 20})
        //     ctx.fillStyle="blue"
        //     // Update Pos
            prevY = pointY
            prevX = interval
            interval += intervals
        }
        // Draw plot axis
        ctx.lineWidth=6;
        ctx.strokeStyle="black";
        ctx.fillStyle="black"
        line({ctx, startx: minX, starty: zero, endx: maxX, endy: zero});
        line({ctx, startx: minX, starty: minY, endx: minX, endy: maxY});
        // line({ctx, startx: minX, starty: minY-50, endx: minX-10, endy: minY-50});
        // ctx.font = '200px Inconsolata';
        // ctx.fillText('WEST', (maxX-minX)/2 - 100, 200)
        // ctx.fillText(this.props.player + ' - '+ this.props.team, 60, canvas.height-25)
        // ctx.fillText('LucidBall', canvas.width-200, canvas.height-25)

        // Track mouse
        canvas.onmousemove = (e) => {
            this.updateCanvas()
            var xPos = (e.clientX - clientRect.left)*scaleX
            var yPos = (e.clientY - clientRect.top)*scaleY
            // console.log("X: " + xPos + "{xMax: "+maxX+",xMin: "+minX+ "}, Y: " + yPos)
            if ((xPos > minX && xPos < maxX) && (yPos > maxY && yPos < minY)) {
                // ctx.restore()
                // ctx.save()
                // console.log("X: " + xPos + ", Y: " + yPos)
                var hover = false
                for (i in inters) {
                    if (xPos > inters[i] - 10 && xPos < inters[i] + 10) {
                        this.props.plotMouse(this.props.data[i].Game_Date, this.props.data[i].Eastern, this.props.data[i].Western)
                        ctx.strokeStyle = "red"
                        line({ctx, startx: xPos, starty: maxY, endx: xPos, endy: minY})
                        // ctx.strokeStyle = "black"
                        // ctx.fillStyle = "white"
                        // ctx.fillRect(minX, minY-100, 400, 100)                        
                        // ctx.strokeRect(minX, minY-100, 400, 100)
                        // ctx.fillStyle = "black"
                        // ctx.font = '27px Inconsolata'
                        // ctx.fillText('Game: ' + this.props.data[this.props.data.length-1-i][4], minX+60, minY-70)
                        // ctx.fillText((boxStats.find(stat => stat.Index == this.props.stat)).Stat+ ': ' + this.props.data[this.props.data.length-1-i][this.props.stat], minX+80, minY-40)
                        // ctx.fillText('Average: ' + Math.round(avgs[i] * 100) / 100, minX+70, minY-10)
                        hover = true
                    }
                }
                if (!hover) {
                    ctx.strokeStyle="red"
                    line({ctx, startx: xPos, starty: 20, endx: xPos, endy: canvas.height-20})
                }
            }
        }

        // Save Canvas as Image
        canvas.onclick = () => {
            // console.log("CLICK")
            // var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
            // console.log(img)
            // window.location.href = img
            var w=window.open('about:blank','LucidBall Graph');
            w.document.write("<img src='"+canvas.toDataURL("image/png")+"' alt='LucidBallGraph'/>");
            // this.setState({ src: img })
        }
    }

    render() {
        return(
            <div style={{ height: "100%", width: "100%", position: "relative", backgroundColor: "#FFFAFA"}}>
                <div style={{ height: "90%", width: "95%", borderRadius: "10px", backgroundColor: "#FFFAFA", top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", fontFamily: "Allerta Stencil"}}>
                    <canvas ref="canvas" style={{height: "100%", width: "100%"}}/>
                </div>
            </div>
        );
    }
}