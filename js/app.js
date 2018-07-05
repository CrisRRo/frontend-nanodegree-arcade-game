const rowHeight = 83;				// Height of stone-blocks
const colWidth = 101;				// Width of stone-blocks

const yForFirstRow = 63;			// Enemy's position on first row
const enemiesNo = 4;				// Number of enemies
const allEnemies = [];				// Array to store all enemy objects

const maxSpeed = 450;				// Maximum speed for an enemy

/*	
*	The 3 possible positions of the enemies on Y axis
*	(corresponding to each stone-block row)
*	
*	Positions of the enemies on y axis will be choose randomly
*	with getRandomValue() function from the below values
*/
const positionsOnYAxis = [
	yForFirstRow,
	yForFirstRow + rowHeight,
	yForFirstRow + 2 * rowHeight
];

// Enemies our player must avoid
var Enemy = function() {
	/*
	*	Each enemy has:
	*	@param x - Random position on x axis outside the canvas
	*	@param y - Random position on y axis - possible values 
	*				taken from positionsOnYAxis array
	*	@param speed - Random speed 
	*/
	this.x = - getRandomValue(colWidth);
	this.y = getRandomValue(positionsOnYAxis);
	this.speed = getRandomValue(maxSpeed);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.myPlayer = 'images/char-princess-girl.png';
};

// TODO: Cred ca dt nu are ce cauta aici. Voi vedea.
// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// TODO:
Player.prototype.handleInput = function() {
	
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
for (let i = 0; i < enemiesNo; i++) {
	allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Function to choose a value randomly from an array / interval of numbers
function getRandomValue(interval) {
	if (Array.isArray(interval)) {
		return interval[Math.floor(Math.random() * interval.length)];
	} else if (typeof interval === "number") {
		return Math.floor(Math.random() * interval);
	}
}