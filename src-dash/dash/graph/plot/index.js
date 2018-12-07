import React from 'react'
import ReactDOM from 'react-dom'

const boxStats = [
    {
        "Stat": "Minutes",
        "Identifier": "MIN",
        "Index": "9",
    },
    {
        "Stat": "Field Goals Made",
        "Identifier": "FGM",
        "Index": "10",
    },
    {
        "Stat": "Field Goals Attempted",
        "Identifier": "FGA",
        "Index": "11",
    },
    {
        "Stat": "Field Goal Percentage",
        "Identifier": "FG_PCT",
        "Index": "12",
    },
    {
        "Stat": "3 Pointers Made",
        "Identifier": "FG3M",
        "Index": "13",
    },
    {
        "Stat": "3 Pointers Attempted",
        "Identifier": "FG3A",
        "Index": "14",
    },
    {
        "Stat": "3 Point Percentage",
        "Identifier": "FG3_PCT",
        "Index": "15",
    },
    {
        "Stat": "Free Throws Made",
        "Identifier": "FTM",
        "Index": "16",
    },
    {
        "Stat": "Free Throws Attempted",
        "Identifier": "FTA",
        "Index": "17",
    },
    {
        "Stat": "Free Throw Percentage",
        "Identifier": "FT_PCT",
        "Index": "18",
    },
    {
        "Stat": "Offensive Rebounds",
        "Identifier": "OREB",
        "Index": "19",
    },
    {
        "Stat": "Defensive Rebounds",
        "Identifier": "DREB",
        "Index": "20",
    },
    {
        "Stat": "Rebounds",
        "Identifier": "REB",
        "Index": "21",
    },
    {
        "Stat": "Assists",
        "Identifier": "AST",
        "Index": "22",
    },
    {
        "Stat": "Steals",
        "Identifier": "STL",
        "Index": "23",
    },
    {
        "Stat": "Blocks",
        "Identifier": "BLK",
        "Index": "24",
    },
    {
        "Stat": "Turnovers",
        "Identifier": "TOV",
        "Index": "25",
    },
    {
        "Stat": "Fouls",
        "Identifier": "PF",
        "Index": "26",
    },
    {
        "Stat": "Points",
        "Identifier": "PTS",
        "Index": "27",
    },
    {
        "Stat": "Plus Minus",
        "Identifier": "Plus_Minus",
        "Index": "28",
    },
]


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
            number: '',
            src: '',
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
        // Make on half pixels for sharper render
        ctx.translate(0.5,0.5)
        // Clear current canvas
        ctx.clearRect(0,0, canvas.width, canvas.height)
        // Draw Background
        ctx.fillStyle = "#DCDCDC"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // Determine x and y coordinates on canvas
        var clientRect = canvas.getBoundingClientRect(), // abs. size of element
            scaleX = canvas.width / clientRect.width,    // relationship bitmap vs. element for X
            scaleY = canvas.height / clientRect.height;
        // Get Plot bounds
        var minX = 60, maxX = canvas.width-20, minY = canvas.height-70, maxY = 20
        // draw children “components”
        ctx.lineWidth=2;
        ctx.strokeStyle="rgba(192,192,192,0.7)";
        ctx.lineCap="round";
        const intervals = (canvas.width-40) / this.props.data.length
        console.log("INTERVALS: " + (canvas.width))
        var interval = 70
        ctx.fillStyle="blue"
        // Get max & min point value
        var maxPoints = 0
        var minPoints = 0
        for (var i = 0; i < this.props.data.length-1; i++) {
            console.log(this.props.data[i])
            // Get max value
            this.props.data[i][this.props.stat] > maxPoints && (maxPoints = this.props.data[i][this.props.stat])
            // If min value is less than 0, set to that value
            if (this.props.data[i][this.props.stat] < 0) {
                minPoints = this.props.data[i][this.props.stat]
            }
        }
        // Scale y axis maximum to be 20% more than max value
        maxPoints = (.2 * maxPoints) + maxPoints
        // Array of interval x positions
        var inters = []
        var avgs = []
        var prevY = minY
        var prevX = minX
        var total = 0
        var gameCount = 0
        for (var i = this.props.data.length-1; i >= 0; i--) {
            inters.push(interval)
            total += this.props.data[i][this.props.stat]
            gameCount++
            console.log("GAME COUNT: "+gameCount)
            line({ctx, startx: interval, starty: 20, endx: interval, endy: canvas.height-70});
            var pointY = plotY(canvas.height, maxPoints, minPoints, this.props.data[i][this.props.stat])
            console.log("Point: " + pointY + ", Points: " + this.props.data[i][this.props.stat] + ", X: " + interval)
            rect({ctx, x: interval-10, y: pointY-10, width: 20, height: 20})
            ctx.strokeStyle="black";
            line({ctx, startx: prevX, starty: prevY, endx: interval, endy: pointY});
            ctx.strokeStyle="rgba(192,192,192,0.7)";
            // Plot Average
            ctx.fillStyle="rgba(255,0,0,.4)"
            var curAvg = total / gameCount
            console.log("AVERAGE: " + curAvg)
            avgs.push(curAvg)
            var plotAvg = plotY(canvas.height, maxPoints, minPoints, curAvg)
            rect({ctx, x: interval-10, y: plotAvg-10, width: 20, height: 20})
            ctx.fillStyle="blue"
            // Update Pos
            prevY = pointY
            prevX = interval
            interval += intervals
        }
        // Draw plot axis
        ctx.lineWidth=4;
        ctx.strokeStyle="black";
        ctx.fillStyle="black"
        line({ctx, startx: minX, starty: minY, endx: maxX, endy: minY});
        line({ctx, startx: minX, starty: minY, endx: minX, endy: maxY});
        // line({ctx, startx: minX, starty: minY-50, endx: minX-10, endy: minY-50});
        ctx.font = '30px Inconsolata';
        ctx.fillText(this.props.player + ' - '+ this.props.team, 60, canvas.height-25)
        ctx.fillText('LucidBall', canvas.width-200, canvas.height-25)

        // Track mouse
        canvas.onmousemove = (e) => {
            this.updateCanvas()
            var xPos = (e.clientX - clientRect.left)*scaleX
            var yPos = (e.clientY - clientRect.top)*scaleY
            // console.log("X: " + xPos + "{xMax: "+maxX+",xMin: "+minX+ "}, Y: " + yPos)
            if ((xPos > minX && xPos < maxX) && (yPos > maxY && yPos < minY)) {
                // ctx.restore()
                // ctx.save()
                console.log("X: " + xPos + ", Y: " + yPos)
                var hover = false
                for (i in inters) {
                    if (xPos > inters[i] - 10 && xPos < inters[i] + 10) {
                        console.log("~~~~~~~AH~~~~~~~")
                        ctx.strokeStyle = "yellow"
                        line({ctx, startx: xPos, starty: 20, endx: xPos, endy: canvas.height-70})
                        ctx.strokeStyle = "black"
                        ctx.fillStyle = "white"
                        ctx.fillRect(minX, minY-100, 400, 100)                        
                        ctx.strokeRect(minX, minY-100, 400, 100)
                        ctx.fillStyle = "black"
                        ctx.font = '27px Inconsolata'
                        ctx.fillText('Game: ' + this.props.data[this.props.data.length-1-i][4], minX+60, minY-70)
                        ctx.fillText((boxStats.find(stat => stat.Index == this.props.stat)).Stat+ ': ' + this.props.data[this.props.data.length-1-i][this.props.stat], minX+80, minY-40)
                        ctx.fillText('Average: ' + Math.round(avgs[i] * 100) / 100, minX+70, minY-10)
                        hover = true
                    }
                }
                if (!hover) {
                    ctx.strokeStyle="red"
                    line({ctx, startx: xPos, starty: 20, endx: xPos, endy: canvas.height-70})
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
            <div style={{ height: "100%", width: "100%", position: "relative"}}>
                <div style={{ height: "95%", width: "95%", borderRadius: "10px", backgroundColor: "#DCDCDC", top: "52%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", fontFamily: "Allerta Stencil"}}>
                    <canvas ref="canvas" style={{height: "100%", width: "100%"}}/>
                    <img  src={this.state.src}  style={{ display: "none" }}/>
                </div>
            </div>
        );
    }
}