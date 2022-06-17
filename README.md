# Javascript Map API
## Overview
Create a web application displaying up-to-date earthquake data.
### Purpose
Download updated JSON data on earthquakes and call Mapbox API to get their coordinates. Then use Leaflet to create a map with 3 base map layers (dark, street, satellite), and 5 overlayers {techtonicPlates, earthquakes: legend2, majorEarthquakes: legend1}. Finally, we'll use event listeners and boolean statements to check if the overlayers are on or off- turning on or off the associated legend.
## Demo 
https://user-images.githubusercontent.com/79609464/173773012-6309d4ab-377d-4c82-bae8-e4b9393d0174.mov

### Switch
Set map defaults, in this case, we want to display all earthquake data and legend first. Then create boolean values to track if the earthquakes and majorEarthquakes layers are on or off. On the event clicked we'll first check if the layer is on and do the logical statement; after, set the boolean to not its current value.

![Screen Shot 2022-06-15 at 2 02 22 AM](https://user-images.githubusercontent.com/79609464/173775166-4d477857-58ba-41d8-a3b2-36a05ce0d8da.png)

## Summary
We've created a webapplication that gathers current earthquake data and plots using Leaflet; After we added legends and a switch to decide when they are on and off.

### Challenges and Difficulties
Leaflet documentation is less intuitive than js; originally I tried solving the switch problem with leaflet event handlers, but it was messier. There are many ways to solve one problem, though Dom's interactions with leaflets are limited.
