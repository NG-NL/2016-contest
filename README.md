# Nonogram 
This game is created with AngularJS 2.0 in combination with TypeScript for the ng-nl contest:
[ng-nl contest](https://github.com/NG-NL/2016-contest)

#####Building instructions  
1. `npm install`
2. `gulp dev`  

*Browser opens automatically after the build is complete.*

Or just see it here live: [Live game](http://nonogram.amberjs.nl/)

## The game  
The default game is created with the data given by ng-nl.  

**Playing the default game:**  
* Click on a field to switch it to a filled, crossed, or blank space.  
* Clicking on a number sets or removes a cross on the number.  
* Drag over the field to draw a line.   
* 'Reset' to clear the game.  
* When the game is correct, the colors switch to green. 
* This game cannot be deleted.
* Click 'save state', to save the state of the game.

####Create a new game:  

**Random:**  
* Clicking 'Generate random' creates a new game with random data (solvable).  
* The default height and width is 15 fields. When values are entered between 5-100, this becomes the new height and or width.  
* A difficulty can be set for generating random games of *easy, normal or hard.*   

    
**Custom:**  
* Clicking 'Create custom' creates a blank game of 15 by 15 field, if no height or width is given.  
* Draw a game and click 'Save custom' to save the game.  

**Generated games (random and custom) have extra options:**  
* Control+click on a field, sets the correct state of that field (filled or blank).  
* Click 'Solve Nonogram' to solve the game automatically.  
    
    
    


