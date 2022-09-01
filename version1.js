const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



class Circle {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.lineWidth = 4;
    }

    drawPoint() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fill();
    }

    drawCenterPoint() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(15, 10, 222, 1)';
        ctx.fill();
    }
}

class SearchPartyPoint extends Circle {
    
    constructor(x, y, radius, pointRadiusSq, flagFound, radiusChainer, newCenterX, newCenterY, foundFlagFound1, foundFlagFound2, foundFlagFound3, foundFlagFound4, foundFlagFound5){
        super(x, y, radius);
        this.pointRadiusSq = pointRadiusSq;
        this.flagFound = flagFound;
        this.radiusChainer = radiusChainer;
        this.newCenterX = newCenterX;
        this.newCenterY = newCenterY;
        this.foundFlagFound1 = foundFlagFound1;
        this.foundFlagFound2 = foundFlagFound2;
        this.foundFlagFound3 = foundFlagFound3;
        this.foundFlagFound4 = foundFlagFound4;
        this.foundFlagFound5 = foundFlagFound5;
    }

    drawSearchPartyPoint() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(0, 128, 0, 1)';
        ctx.fill();
    }

    drawSearchPartyPointRadius(searchPartyPointRadius) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, searchPartyPointRadius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    moveToCenter(x, y) {
        if(this.flagFound === false){
            this.x = x;
            this.y = y;
        }
    }
  
    checkRightNeighbor(rightNeighbor) {
        console.log(rightNeighbor, 'rightneighbor')
        if(rightNeighbor.flagFound === true) {
            this.newCenterX = rightNeighbor.x;
            this.newCenterY = rightNeighbor.y;
        }
    }
}

const salesmanPoints = 5;

const points = []; 
const searchPartyPoints = [];
const centerX = width/2;
const centerY = height/2;
const mainCircle = 50
const circle = new Circle(centerX, centerY, mainCircle);
const radiusChainer = 50;
let searchPartyMultiplier = 20


//Generate Traveling Salesman Points randomly
while (points.length < salesmanPoints) {

    let pointAngle = Math.random() * 2 * Math.PI;
    let pointRadiusSq = Math.random() * (circle.radius) * circle.radius;
    let pointX = Math.sqrt(pointRadiusSq) * Math.cos(pointAngle);
    let pointY = Math.sqrt(pointRadiusSq) * Math.sin(pointAngle);
    let locationX = pointX + centerX;
    let locationY = pointY + centerY;

    const point = new Circle(
        locationX,
        locationY,
        1
    )

    points.push(point);  
}



let maxPointX = 0;
let minPointX = width;
let maxPointY = 0;
let minPointY = height;
let centerPointX = 0;
let centerPointY = 0;
let centerPoint;

for (let i = 0; i < points.length; i++){
    for (let h = 1; h < points.length; h++) {
        
        //max checker X
        if (points[i].x > points[h].x && points[i].x > maxPointX) {
            maxPointX = points[i].x;
        } 
    
        //min checker X
        if (points[i].x < points[h].x && points[i].x < minPointX) {
            minPointX = points[i].x;
        } 
    
        //max checker Y
        if (points[i].y > points[h].y && points[i].y > maxPointY) {
            maxPointY = points[i].y;
        } 
    
        //min checker Y
        if (points[i].y < points[h].y && points[i].y < minPointY) {
            minPointY = points[i].y;
        } 

        centerPointX = ((maxPointX - minPointX) / 2) + minPointX;
        centerPointY = ((maxPointY - minPointY) / 2) + minPointY;
        
        if (i === points.length - 1 && h === points.length - 1) {
            centerPoint = new Circle(
                centerPointX,
                centerPointY,
                5
            )   
        }

    }
}

//Generate Search Party Points and assemble in equidistant circle around collective center
let pointAngleCounter = 1;


while (searchPartyPoints.length < points.length * searchPartyMultiplier) {    
    let pointAngle = 1/points.length * 2 * Math.PI;
    let pointRadiusSq = circle.radius * circle.radius + 100;
    let pointX, pointY, pointAngleIncrement, locationX, locationY, radiusChainer
    
    if (pointAngleCounter < points.length * searchPartyMultiplier) {
        pointAngleIncrement = pointAngle * pointAngleCounter
        pointX = Math.sqrt(pointRadiusSq) * Math.cos(pointAngleIncrement);
        pointY = Math.sqrt(pointRadiusSq) * Math.sin(pointAngleIncrement);
        locationX = pointX + centerPointX;
        locationY = pointY + centerPointY;
    } 

    const searchPartyPoint = new SearchPartyPoint (
        locationX,
        locationY,
        1,
        pointRadiusSq,
        flagFound = false,
        radiusChainer = 50,
        newCenterX = 0,
        newCenterY = 0,
        foundFlagFound1 = false,
        foundFlagFound2 = false,
        foundFlagFound3 = false,
        foundFlagFound4 = false,
        foundFlagFound5 = false
    )

    searchPartyPoints.push(searchPartyPoint);
    pointAngleCounter++
}


//Loop the animation using requestAnimationFrame()
function loop() {
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0,  width, height);

    if (searchPartyPoints[0].pointRadiusSq > 0) {
        for (i = 0; i < searchPartyPoints.length; i++) {
            let pointAngle = 1/searchPartyPoints.length * 2 * Math.PI;
            let pointX, pointY, pointAngleIncrement, locationX, locationY, rightneighbor
            
            pointAngleIncrement = pointAngle * i;
            pointX = Math.sqrt(searchPartyPoints[i].pointRadiusSq) * Math.cos(pointAngleIncrement);
            pointY = Math.sqrt(searchPartyPoints[i].pointRadiusSq) * Math.sin(pointAngleIncrement);
            locationX = pointX + centerPointX;
            locationY = pointY + centerPointY;
            
            searchPartyPoints[i].pointRadiusSq = searchPartyPoints[i].pointRadiusSq - searchPartyPoints[i].radiusChainer;
            searchPartyPoints[i].moveToCenter(locationX, locationY);
            centerPoint.drawCenterPoint(); 
            
            let k = i + 1 
            if(searchPartyPoints[k] !== undefined) {
                searchPartyPoints[i].checkRightNeighbor(searchPartyPoints[k]);
                console.log(searchPartyPoints)
            }

            for(j = 0; j < points.length; j++) {
                let dx = points[j].x - searchPartyPoints[i].x;
                let dy = points[j].y - searchPartyPoints[i].y;
                let radii = points[j].radius + searchPartyPoints[i].radius;

                if ((dx * dx) + (dy * dy) < (radii * radii)) {
                    searchPartyPoints[i].x = points[j].x;
                    searchPartyPoints[i].y = points[j].y;
                    searchPartyPoints[i].flagFound = true;
                }
            }
            
            searchPartyPoints[i].drawSearchPartyPoint();
        }

        for (i = 0; i < points.length - 1; i++) {
            points[i].drawPoint(); 
        }
    } else {
        for (i = 0; i < searchPartyPoints.length; i++) {
            searchPartyPoints[i].drawSearchPartyPoint();
            centerPoint.drawCenterPoint();
        }

        for (i = 0; i < points.length; i++) {
            points[i].drawPoint();
        }
    }

    requestAnimationFrame(loop)
}

loop();

//connect Search Party Points to each other with lines
// for (i = 0; i <= searchPartyPoints.length; i++) {
//     if(i === 0) {
//         console.log('first')
//         ctx.beginPath()
//         ctx.moveTo(searchPartyPoints[i].x, searchPartyPoints[i].y);
//     } else if(i > 0 && i < searchPartyPoints.length) {
//         console.log('second')
//         ctx.lineTo(searchPartyPoints[i].x, searchPartyPoints[i].y);
//     } else {
//         console.log('third')
//         ctx.closePath();
//     }
//     ctx.stroke()
// }

// //Draw Search Party Point's radius
// const searchPartyPointRadius = (Math.sqrt(((searchPartyPoints[1].x-searchPartyPoints[0].x) * ((searchPartyPoints[1].x-searchPartyPoints[0].x))) + ((searchPartyPoints[1].y-searchPartyPoints[0].y) * ((searchPartyPoints[1].y-searchPartyPoints[0].y))))) / 2;
// console.log(searchPartyPointRadius, 'searchPartyPointRadius')

// for (i = 0; i < searchPartyPoints.length; i++) {
//     searchPartyPoints[i].drawSearchPartyPointRadius(searchPartyPointRadius);
// }