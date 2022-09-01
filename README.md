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


## Revised Search Party Search Method
1. The original search radius search method seems to be too broad and doesn't work. 
2. The new method is to aquire enough Search Party Points to have them standing, effectively, shoulder 
   to shoulder as they march towards the center. 
3. Should a Search Party Point discover a Traveling Salesman Point, then it will aquire that point as it's new
   location and hold, as before, but it will then also raise a flag affirming a discovery has been made. 
4. Search Party Points will regularly check in with their neighbor to see if the discovery flag has been raised.
5. If they get word back that a discovery flag has been raised, they will relay the message to their other neighbors
   in the chain, letting them know the flag has been raised, causing each of them to raise their own flags as well, but 
   with decreasing impact on the movement behavior of each subsequent point.

## Chaining the Search Party Points Together
1. There will be a looping check to see if a Search Party Point's neighbor has found a Traveling Salesman Point.
2. If true, then it will aquire the neighbor's coordinates as it's new center point of gravity/direction of movement
   which will compete with the original centerpoint's force. 
3. The newly chained point will then rotate at an angle that brings it between the original center and it's new found center point. 
4. It will also throw back a message to the other points behind it to notify that they should chain as well 
   with incrementally decreasing effect of the new found center point's gravity on them, until that effect reaches 0,
   at which point the message will not be thrown back anymore. 