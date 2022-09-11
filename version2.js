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
        // console.log(this.x, "this.x")
        // console.log(this.y, "this.y")
        // console.log(this.centerPointX, "this.centerPointX")
        // console.log(this.centerPointY, "this.centerPointY")

        if (this.x > this.centerPointX && this.y < this.centerPointY) {
            let x = this.x - this.centerPointX;
            let y = this.centerPointY - this.y;
            let tanAngle = y / x;
            this.orderAngle = 90 - ((Math.atan(tanAngle) * (180/Math.PI))); 
        } else if (this.x > this.centerPointX && this.y > this.centerPointY) {
            let x = this.x - this.centerPointX;
            let y = this.y - this.centerPointY;
            let tanAngle = y / x;
            this.orderAngle = 90 + ((Math.atan(tanAngle) * (180/Math.PI))); 
        } else if (this.x < this.centerPointX && this.y > this.centerPointY) {
            let x = this.centerPointX - this.x;
            let y = this.y - this.centerPointY;
            let tanAngle = y / x;
            this.orderAngle = 180 + ((Math.atan(tanAngle) * (180/Math.PI)));
        } else if (this.x < this.centerPointX && this.y < this.centerPointY) {
            let x = this.centerPointX - this.x;
            let y = this.centerPointY - this.y;
            let tanAngle = y / x;
            this.orderAngle = 270 + ((Math.atan(tanAngle) * (180/Math.PI)));
        }

        travelingSalesmanOrdered.push(this);
    }

    drawConnectSortedArray() {

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
let maxMinFound = {
    maxValueX: 0,
    minValueX: 0,
    maxValueY: 0,
    minValueY: 0,
};

let q = 0
maxMinFound.maxValueX = points[q].x

while (q < points.length) {
       if (points[q].x > maxMinFound.maxValueX) {
        maxMinFound.maxValueX = points[q].x;
       } 
       q++; 
}

q = 0;
maxMinFound.maxValueY = points[q].y

while (q < points.length) {
       if (points[q].y > maxMinFound.maxValueY) {
        maxMinFound.maxValueY = points[q].y;
       } 
       q++; 
}

q = 0;
maxMinFound.minValueX = points[q].x

while (q < points.length) {
       if (points[q].x < maxMinFound.minValueX) {
        maxMinFound.minValueX = points[q].x;
       } 
       q++; 
}

q = 0;
maxMinFound.minValueY = points[q].y

while (q < points.length) {
       if (points[q].y < maxMinFound.minValueY) {
        maxMinFound.minValueY = points[q].y;
       } 
       q++; 
}

console.log(maxMinFound.minValueY, "maxMinFound.minValueY")
console.log(points, "points AFTER WHILE LOOP")

let centerPointX = (maxMinFound.maxValueX - maxMinFound.minValueX)/2 + maxMinFound.minValueX;
let centerPointY = (maxMinFound.maxValueY - maxMinFound.minValueY)/2 + maxMinFound.minValueY; 

let centerPoint = new Circle(
    x = centerPointX,
    y = centerPointY,
    3
)

//assign Centerpoint to each Traveling Salesman Point
for(i = 0; i < points.length; i++) {
    points[i].centerPointX = centerPointX;
    points[i].centerPointY = centerPointY;
}

//Loop to calculate Traveling Salesman Point Angles
let travelingSalesmanOrdered = [];

for (i = 0; i < points.length; i++) {
    points[i].calculateOrderAngle(travelingSalesmanOrdered);
}

console.log(travelingSalesmanOrdered, 'traveling salesman point ordered')



//Sort travelingSalesmanOrdered array from lowest to highest
// let minFound = {
//     minValue: 0,
//     minIndex: 0
// };
// let sortedArray = [];
// let m = 0

// minFound.minValue = travelingSalesmanOrdered[m];
// minFound.minIndex = m;

// while (travelingSalesmanOrdered.length > 0) {
        
//     if (m < travelingSalesmanOrdered.length) {

//        if (travelingSalesmanOrdered[m] < minFound.minValue) {
//             minFound.minValue = travelingSalesmanOrdered[m];   
//             minFound.minIndex = m;
//        } 
//        m++;
//     }  else if (m >= travelingSalesmanOrdered.length || travelingSalesmanOrdered.length === 1) {
//         travelingSalesmanOrdered.splice(minFound.minIndex, 1);
//         m = 0;
//         sortedArray.push(minFound.minValue);
//         minFound.minValue = travelingSalesmanOrdered[m];
//         minFound.minIndex = m;
//     }  
// }

let minFound = {
    minValue: 0,
    minIndex: 0
};
let sortedArray = [];
let orderedObject;
let m = 0

minFound.minValue = travelingSalesmanOrdered[m].orderAngle;
minFound.minIndex = m;

while (travelingSalesmanOrdered.length > 0) {
        
    if (m < travelingSalesmanOrdered.length) {

       if (travelingSalesmanOrdered[m].orderAngle < minFound.minValue) {
            minFound.minValue = travelingSalesmanOrdered[m].orderAngle;   
            minFound.minIndex = m;
            orderedObject = travelingSalesmanOrdered[m];
       } 
       m++;
    } else if (travelingSalesmanOrdered.length === 1) {
        sortedArray.push(travelingSalesmanOrdered[0]);
        travelingSalesmanOrdered.splice(0, 1);
    } else if (m >= travelingSalesmanOrdered.length && travelingSalesmanOrdered.length > 1) {
        console.log(travelingSalesmanOrdered, "travelingSalesmanOrdered next to last")
        travelingSalesmanOrdered.splice(minFound.minIndex, 1);
        m = 0;
        sortedArray.push(orderedObject);
        minFound.minValue = travelingSalesmanOrdered[m].orderAngle;
        minFound.minIndex = m;
        orderedObject = travelingSalesmanOrdered[m]
    }  
}

console.log(sortedArray, "sortedArray")
console.log(points, "CHECKING POINTS")

for(i = 0; i < sortedArray.length; i++) {
    console.log(i, "sortedArray orderangle i")
    console.log(sortedArray[i].orderAngle, "sortedArray orderangle")
}
//Loop the animation using requestAnimationFrame()
function loop() {
    //redraw background to give animation effect
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0,  width, height);
    
    if (userControls.start) {
        //draw Traveling Salesman Points
        for (i = 0; i < points.length; i++) {
            points[i].drawPoint(); 
        }
        // console.log("started")
        //Draw collective center point for Points
        centerPoint.drawCenterPoint(); 
        
        ctx.beginPath();
        for (i = 0; i < sortedArray.length; i++) {
            if (i === 0) {
                ctx.moveTo(sortedArray[i].x, sortedArray[i].y);
            } else if (i > 0 && i < sortedArray.length) {
                ctx.lineTo(sortedArray[i].x, sortedArray[i].y);
            } 
        }
        ctx.closePath()
        ctx.lineWidth = 1;
        ctx.stroke();

    } 

    requestAnimationFrame(loop)
}

loop();
