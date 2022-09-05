//instantiate canvas from html selection and use context
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
    
    constructor(
        x, 
        y, 
        radius, 
        centerPointRadiusSq, 
        flagFound, 
        originalRadius,
        newRadius, 
        newCenterX, 
        newCenterY, 
        newAngle, 
        foundFlagFound1, 
        foundFlagFound2, 
        foundFlagFound3, 
        foundFlagFound4, 
        foundFlagFound5
        ) {
        
        super(x, y, radius);
        this.centerPointRadiusSq = centerPointRadiusSq;
        this.flagFound = flagFound;
        this.originalRadius = originalRadius;
        this.newRadius = newRadius;
        this.newCenterX = newCenterX;
        this.newCenterY = newCenterY;
        this.newAngle = newAngle;
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
        if(!this.flagFound){
            this.x = x;
            this.y = y;
        }
    }
  
    checkRightNeighbor(rightNeighbor) {
        if(rightNeighbor.flagFound) {
            this.newCenterX = rightNeighbor.x;
            this.newCenterY = rightNeighbor.y;
            this.foundFlagFound1 = true;
        }
    }

    checkFoundFlagFound1(rightNeighbor) {
        if(rightNeighbor.foundFlagFound1) {
            console.log("foundfoundflag1")
            this.foundFlagFound2 = true;
        }
    }

    rotateTowardsFound() {
        if (this.newAngle > 360 && this.foundFlagFound1 || this.newAngle > 360 && this.foundFlagFound2) {
            this.newAngle = 1;
            this.newRadius = 5;
            this.newAngle = this.newAngle + 1;
            this.x = 10;
            this.y = 10;
            ctx.save();
            ctx.translate(this.newCenterX, this.newCenterY);
            ctx.rotate(this.newAngle * Math.PI / 180);
        } else if (this.foundFlagFound1 || this.foundFlagFound2) {
            console.log('executed')
               this.newAngle = this.newAngle + 1;
               this.newRadius = 5;
               this.x = 10;
               this.y = 10;
               ctx.save();
               ctx.translate(this.newCenterX, this.newCenterY);
               ctx.rotate(this.newAngle * Math.PI / 180);
            }
    }
}

class UserControls {
    constructor(start, stop, stepforward, stepbackwards) {
        this.start = start;
        this.stop =  stop;
        this.stepforward = stepforward;
        this.stepbackwards = stepbackwards;

        window.addEventListener('keydown', (e) => {
            switch(e.key) {
              case 's':
                this.start = true;
                break;
              case 'd':
                this.start = false;
                break;
              case 'f':
                this.stepforward = true;
                break;
              case 'b':
                this.stepbackwards = true;
                break;
            }
          });
      }
    }
    

//Globals
const salesmanPoints = 5;
const points = []; 
const searchPartyPoints = [];
const centerX = width/2;
const centerY = height/2;
const mainCircle = 150
const circle = new Circle(centerX, centerY, mainCircle);
const originalRadius = 50;
const searchPartyMultiplier = 20

//Instantiate UserControls
const userControls = new UserControls(
    false,
    false,
    false,
    false,
)


//Generate Traveling Salesman Points randomly
while (points.length < salesmanPoints) {
    let pointAngle = Math.random() * 2 * Math.PI;
    let centerPointRadiusSq = Math.random() * (circle.radius) * circle.radius;
    let pointX = Math.sqrt(centerPointRadiusSq) * Math.cos(pointAngle);
    let pointY = Math.sqrt(centerPointRadiusSq) * Math.sin(pointAngle);
    let locationX = pointX + centerX;
    let locationY = pointY + centerY;

    const point = new Circle(
        locationX,
        locationY,
        1
    )

    points.push(point);  
}



//Find the collective center of the Traveling Salesman Points
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
                3
            )   
        }

    }
}

//Generate Search Party Points and assemble in equidistant circle around collective center
let pointAngleCounter = 1;

while (searchPartyPoints.length < points.length * searchPartyMultiplier) {    
    let pointAngle = 1/points.length * 2 * Math.PI;
    let centerPointRadiusSq = circle.radius * circle.radius + 100;
    let pointX, pointY, pointAngleIncrement, locationX, locationY, originalRadius
    
    if (pointAngleCounter < points.length * searchPartyMultiplier) {
        pointAngleIncrement = pointAngle * pointAngleCounter
        pointX = Math.sqrt(centerPointRadiusSq) * Math.cos(pointAngleIncrement);
        pointY = Math.sqrt(centerPointRadiusSq) * Math.sin(pointAngleIncrement);
        locationX = pointX + centerPointX;
        locationY = pointY + centerPointY;
    } 

    const searchPartyPoint = new SearchPartyPoint (
        locationX,
        locationY,
        3,
        centerPointRadiusSq,
        flagFound = false,
        originalRadius = 50,
        newRadius = 0,
        newCenterX = 0,
        newCenterY = 0,
        newAngle = 0,
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
    //redraw background to give animation effect
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0,  width, height);

    if (userControls.start) {
        for (i = 0; i < searchPartyPoints.length; i++) {
            let pointAngle = 1/searchPartyPoints.length * 2 * Math.PI;
            let pointX, pointY, pointAngleIncrement, locationX, locationY
            let k = i + 1 
            let l = i - 1 

            //Check foundFlagFound1 to see if this is a newly affected Search Party Point and begin rotation
            if(searchPartyPoints[i].foundFlagFound1 && i < searchPartyPoints.length - 1) {
                console.log(searchPartyPoints[i], "Flagfound check")
                console.log(i, 'I')
                searchPartyPoints[i].newCenterX = searchPartyPoints[k].x;
                searchPartyPoints[i].newCenterY = searchPartyPoints[k].y;
                
                searchPartyPoints[i].rotateTowardsFound();
                searchPartyPoints[i].draw();
                ctx.restore();
                searchPartyPoints[i].checkRightNeighbor(searchPartyPoints[k]);
            } else if (searchPartyPoints[i].foundFlagFound2 && i > 0) {
                console.log(searchPartyPoints[l], "Flagfound check 2")
                console.log(l, 'L')
                searchPartyPoints[i].newCenterX = searchPartyPoints[l].x;
                searchPartyPoints[i].newCenterY = searchPartyPoints[l].y;
                
                searchPartyPoints[i].rotateTowardsFound();
                searchPartyPoints[i].draw();
                ctx.restore();
                searchPartyPoints[i].checkFoundFlagFound1(searchPartyPoints[l]);
            } else { //calcualate radius for Search Party Points
                if (searchPartyPoints[0].centerPointRadiusSq > 0) {
                    pointAngleIncrement = pointAngle * i;
                    pointX = Math.sqrt(searchPartyPoints[i].centerPointRadiusSq) * Math.cos(pointAngleIncrement);
                    pointY = Math.sqrt(searchPartyPoints[i].centerPointRadiusSq) * Math.sin(pointAngleIncrement);
                    locationX = pointX + centerPointX;
                    locationY = pointY + centerPointY;
                    
                    searchPartyPoints[i].centerPointRadiusSq = searchPartyPoints[i].centerPointRadiusSq - searchPartyPoints[i].originalRadius;
                    searchPartyPoints[i].moveToCenter(locationX, locationY);
                }
            }

            //Draw collective center point for Traveling Salesman Points
            centerPoint.drawCenterPoint(); 
            
            //Search Party Point detector
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

            //Check neighbor to see if Traveling Salesman Point has been found and raise flags
            
            
  
            

            //Draw resulting found Search Party Point
            searchPartyPoints[i].drawSearchPartyPoint();
        }
        
        //draw Traveling Salesman Points
        for (i = 0; i < points.length - 1; i++) {
            points[i].drawPoint(); 
        }
    } else {
        //draw Search Party Points
        for (i = 0; i < searchPartyPoints.length; i++) {
            searchPartyPoints[i].drawSearchPartyPoint();
            centerPoint.drawCenterPoint();
        }
        //draw Traveling Salesman Points
        for (i = 0; i < points.length; i++) {
            points[i].drawPoint();
        }
    }

    requestAnimationFrame(loop)
}

loop();
