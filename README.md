# Principle Solution for the Traveling Salesman Problem

It is my understanding of the traveling salesman problem that the goal is to take a 
given number of points and derive the shortest distance to visit all the points and 
to only visit each point once.  Heuristically, I believe this can be solved using 
what I am calling the shrink wrapping and search party method. 

If you think of any object's surface as a 2d polygon, when viewed from the objects side, 
if you were to shrink wrap that object with some plastic, the plastic would suck down on 
to the surface of that object trying effectively to get to the center of the suction point. 
Once shrunk wrapped, the plastic's location would then represent the shortest distance around 
the circumference of that object. Thought of in 2d, you can extrapolate that to a circle and a 
set of points, wherein you shrink wrap the points with the circle, and the resulting circumference 
of that shape is the solution to the traveling salesman problem. 

The search party portion of the solution comes in because I do not know of any way to collision detect the 
circumference of the circle with the points in a software based setting. So instead, the following algorithm 
takes the place of the real world shrink wrap application by resulting in the same shape, using effectively 
the same principle as the shrink wrap portion, albeit with a less fluid or calculus based approach.

## Search Party Algorithm for the Traveling Salesman Problem (screw acronyms)
1. Sort the coordinates to find max and min correspondingly for each set of x and y. 
2. Find the halfway points between the max and mins for each set of x and y, resulting in a set of coordinates, 
   which gives you your collective center for your traveling salesman points. 
3. Assemble a search party of points, the number of which should match the number of traveling salesman points, 
   and assemble them in a circle, equidistant from each other, with the center point of that circle being our 
   derived collective center from the previous step, and each search party point holding a line in each 
   hand, each of which is connected to their adjacent neighbors who are also correspondingly also holding
   a line in each hand, forming a circle. 
4. Assign each search point a search distance equal to a radius the length of which is halfway to their 
   adjacent neighbor.
5. All search points move incrementally, stepwise towards the collective center, searching for a traveling salesman point
   within each of their respective radii.
6. If a search point discovers a traveling salesman point entering its search radius, then that search point 
   should reassign its coordinates to the coordinates of the found point and hold its position and maintain the 
   line connection to its neighbors.
7. All search points should proceed towards the collective center until all have found a traveling salesman
   point to hold to. The resulting shape, formed by their connecting lines, is the solution to the 
   traveling salesman problem.