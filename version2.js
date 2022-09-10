//instantiate canvas from html selection and use context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;



class Circle {

    constructor(
        x, 
        y, 
        radius,
        orderAngle,
        centerPointX,
        centerPointY
        ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.orderAngle = orderAngle;
        this.centerPointX = centerPointX;
        this.centerPointY = centerPointY;
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
        ctx.fillStyle = 'rgba(128, 128, 128, 1)';
        ctx.fill();
    }

    drawCenterPoint() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(15, 10, 222, 1)';
        ctx.fill();
    }

    calculateOrderAngle(travelingSalesmanOrdered) {
        let x = this.x - this.centerPointX;
        let y = this.y - this.centerPointY;
        let tanAngle = x / y;

        if (this.x > this.centerPointX && this.y > this.centerPointY) {
            this.orderAngle = 90 - Math.atan(tanAngle); 
        } else if (this.x > this.centerPointX && this.y < this.centerPointY) {
            this.orderAngle = 90 + Math.atan(tanAngle); 
        } else if (this.x < this.centerPointX && this.y < this.centerPointY) {
            this.orderAngle = 180 + Math.atan(tanAngle); 
        } else if (this.x < this.centerPointX && this.y > this.centerPointY) {
            this.orderAngle = 270 + Math.atan(tanAngle); 
        }

        travelingSalesmanOrdered.push(this.orderAngle);
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
const centerX = width/2;
const centerY = height/2;
const mainCircle = 150
const circle = new Circle(centerX, centerY, mainCircle);
const originalRadius = 50;

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

    const point = new Circle (
        locationX,
        locationY,
        1,
        orderAngle = 0
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

for (let i = 0; i < points.length; i++) {
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

        points[i].centerPointX = centerPointX;
        points[i].centerPointY = centerPointY;
        
        if (i === points.length - 1 && h === points.length - 1) {
            centerPoint = new Circle(
                centerPointX,
                centerPointY,
                3
            )   
        }

    }
}



//Loop to calculate Traveling Salesman Point Angles
let travelingSalesmanOrdered = [];

for (i = 0; i < points.length; i++) {
    points[i].calculateOrderAngle(travelingSalesmanOrdered);
}

console.log(travelingSalesmanOrdered, 'traveling salesman point ordered')



//Sort travelingSalesmanOrdered array from lowest to highest
let minFound = {
    minValue: 0,
    minIndex: 0
};
let sortedArray = [];
let m = 0
let whileCheck = 0





let testarray = [0, 5, 2, 3, 4, 7, 5]
minFound.minValue = travelingSalesmanOrdered[m];
minFound.minIndex = m;

while (travelingSalesmanOrdered.length > 0) {
        
    if (m < travelingSalesmanOrdered.length) {

       if (travelingSalesmanOrdered[m] < minFound.minValue) {
            minFound.minValue = travelingSalesmanOrdered[m];   
            minFound.minIndex = m;
       } 
       m++;
    }  else if (m >= travelingSalesmanOrdered.length || travelingSalesmanOrdered.length === 1) {
        travelingSalesmanOrdered.splice(minFound.minIndex, 1);
        m = 0;
        sortedArray.push(minFound.minValue);
        minFound.minValue = travelingSalesmanOrdered[m];
        minFound.minIndex = m;
    }  
    
    whileCheck++
}

console.log(sortedArray, "sortedArray")

//Loop the animation using requestAnimationFrame()
function loop() {
    //redraw background to give animation effect
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0,  width, height);

    if (userControls.start) {
        //draw Traveling Salesman Points
        for (i = 0; i < points.length - 1; i++) {
            points[i].drawPoint(); 
        }

        //Draw collective center point for Traveling Salesman Points
        centerPoint.drawCenterPoint(); 

    } else {
       //draw Traveling Salesman Points
        for (i = 0; i < points.length; i++) {
            points[i].drawPoint();
        }
    }

    requestAnimationFrame(loop)
}

loop();
