// Canvas related variables
const canvasWidth = 505;			// Width of the canvas
const rowHeight = 83;				// Height of stone-blocks
const colWidth = 101;				// Width of stone-blocks

const enemiesNo = 4;				// Number of enemies
const allEnemies = [];				// Array to store all enemy objects
let player;							// Store the player object

class GetRandom {
	// Function to choose a value randomly from an array / interval of numbers
	getRandomValue(interval, min = 0) {
		if (Array.isArray(interval)) {
			// Return one of the array's elements
			return interval[Math.floor(Math.random() * interval.length)];
		} else if (typeof interval === "number") {
			// Returns a number between 'min' and 'interval' values (both included)
			return Math.floor(Math.random() * (interval - min + 1)) + min;
		}
	}
}

class EnemyParent extends GetRandom {
	constructor() {
		super();

		// Enemies related variables
		this.yForFirstRow = 63;				// Enemy's position on first row
		this.minSpeed = 100;				// Minimum speed for an enemy
		this.maxSpeed = 400;				// Maximum speed for an enemy
		this.enemyLength = 101;				// The length of an enemy
		this.enemyHeight = 70;				// The height of an enemy

		/*
		*	The 3 possible positions of the enemies on Y axis
		*	(corresponding to each stone-block row)
		*
		*	Positions of the enemies on y axis will be choose randomly
		*	with getRandomValue() function from the below values
		*/
		this.positionsOnYAxis = [
			this.yForFirstRow,
			this.yForFirstRow + rowHeight,
			this.yForFirstRow + 2 * rowHeight
		];
	}

	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};
}

// Enemies our player must avoid
class Enemy extends EnemyParent {
	constructor() {
		/*
		*	Each enemy has:
		*	@param x - Random position on x axis outside the canvas
		*	@param y - Random position on y axis - possible values
		*				taken from positionsOnYAxis array
		*	@param speed - Random speed
		*/
		super();
		this.x = - this.getRandomValue(colWidth);
		this.y = this.getRandomValue(this.positionsOnYAxis);
		this.speed = this.getRandomValue(this.maxSpeed, this.minSpeed);

		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		if (this.x < 505) {
			// Move the enemy to the right
			this.x += this.speed * dt;
		} else {
			// The enemy is out of canvas
			// Reinitialize the enemy's coordonates
			this.x = - this.getRandomValue(colWidth);
			this.y = this.getRandomValue(this.positionsOnYAxis);
			this.speed = this.getRandomValue(this.maxSpeed, this.minSpeed);
		}
	};
}

class PlayerParent extends GetRandom {
	constructor() {
		super();

		// Player related variables
		this.playerStartPositionY = 400; 	// The start position of the player on Y axis
		this.step = 25;						// The step of the player
	}
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.player), this.x, this.y);
	};

	handleInput(key) {
		// Move the player according to the pressed key but
		// keeping the player inside the canvas (see if clauses below)
		switch(key) {
			case 'left':
				if (this.x > 0) {
					this.x -= this.step;
				}
				break;
			case 'up':
				if (this.y > -15) {
					this.y -= this.step;
				}
				break;
			case 'right':
				if (this.x < 402) {
					this.x += this.step;
				}
				break;
			case 'down':
				if (this.y < this.playerStartPositionY) {
					this.y += this.step;
				}
				break;
		}
	}

	// Bring the player to the start position
	resetPlayerPosition() {
		this.x = this.getRandomValue(canvasWidth-100);
		this.y = this.playerStartPositionY;
	}

	checkCollisions() {
		/*
		*	Find the position of every enemy and compare
		*	the player's position with the enemy's position taking into
		*	consideration the enemy body size: enemyLength and enemyHeight
		*/
		allEnemies.forEach(function(thisEnemy) {
			if ((player.x >= thisEnemy.x - thisEnemy.enemyLength/2) && (player.x <= thisEnemy.x + thisEnemy.enemyLength/2) && (player.y >= thisEnemy.y - thisEnemy.enemyHeight/2) && (player.y <= thisEnemy.y + thisEnemy.enemyHeight/2)) {
					// Positions matche => bring the player to the start position
					player.resetPlayerPosition();
			}
		});
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends PlayerParent {
	constructor() {
		/*
		*	The player has:
		*	@param x - Random position on x axis along the canvas width
		*	@param y - Fix position on Y axis
		*/
		super();
		this.x = this.getRandomValue(canvasWidth-100);
		this.y = this.playerStartPositionY;

		// The image for our player, this uses
		// a helper we've provided to easily load images
		this.player = 'images/char-princess-girl.png';
	}
	
	// Update the player's position, required method for game
	update() {
		// The player wins - has arrived to the river
		// Bring the player to the start position
		if (this.y <= -15) {
			this.resetPlayerPosition();
		}

		// Check if there is a collision
		this.checkCollisions();
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
for (let i = 0; i < enemiesNo; i++) {
	allEnemies.push(new Enemy());
}

// Place the player object in a variable called player
player = new Player();

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