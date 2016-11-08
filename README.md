# FCC - Simon Game
## Install
1. To start project you should either clone or download it as a zip file.
2. Install nodejs from [https://nodejs.org/en/](https://nodejs.org/en/)
3. Install bower and gulp globally using `npm install -g gulp bower`
4. Install the node_modules dependencies using `npm install`
5. Install the bower dependencies using `bower install`

## How to Use

Commands:

`gulp build` will move and minify files from the src folder and bower dependencies into a build folder

`gulp serve` will host the files on localhost:3000 and auto-reload the page if a file in project's directory is changed or added.

`gulp` will both build and host the application

## Project Description
Free Code Camp project from Advanced Front End Development projects

### Requirements
1.I am presented with a random series of button presses.

2.Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

3.I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

4.If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.

5.I can see how many steps are in the current series of button presses.

6.If I want to restart, I can hit a button to do so, and the game will return to a single step.

7.I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

8.I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

### Technologies Used:
+ HTML5/CSS3/JS
+ Gulp.js
+ Sass
+ MVC Pattern

### Live Demo
http://codepen.io/evgG/pen/ORemjW
