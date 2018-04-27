let runSnake = function(){
  // initialise necessary global variables
  let myCanvas = document.getElementById('mc'); //please read through introduction of JS-canvas
  let ctx = myCanvas.getContext('2d');  //create cantext instance
  let size = 300; // size of the play-field in pixels
  let GRID_size = size / 30;
  let direction = newDirection = 1; // -2: up, 2: down, -1: left, 1: right
  let len = 5, candy = null, snake = [{ x: size / 2, y: size / 2}]; // Snake starts in the center

  function fillCandy(x, y) {
    ctx.fillStyle = 'yellow';  //single grid of cnady
    ctx.fillRect(x, y, GRID_size, GRID_size);
  }

  //position of candy --> must not repeat with snake
  function createCandy() {
    candy = {
      x: Math.floor(Math.random() * size / GRID_size) * GRID_size,
      y: Math.floor(Math.random() * size / GRID_size) * GRID_size
    }
    if (snake.includes(candy)) {
      return createCandy();
    } else {
      return candy;
    }
  }

  //main function
  function Game() {
    ctx.fillStyle = '#002b36';
    ctx.fillRect(0, 0, size, size); // initialize/reset space/area
    let newHead = {x: snake[0].x, y: snake[0].y};

    // Only change directon if the new direction is a different axis
    if (Math.abs(direction) !== Math.abs(newDirection)) {
      direction = newDirection;
    }
    let axis = Math.abs(direction) === 1 ? 'x' : 'y'; // 1, -1 are X; 2, -2 are Y
    if (direction < 0) {
      newHead[axis] -= GRID_size; // Move left or down
    } else {
      newHead[axis] += GRID_size; // Move right or up
    }

    // Did we eat a candy? Detect if our head is in the same cell as the candy
    if (candy && candy.x === newHead.x && candy.y === newHead.y) {
      candy = null;
      len+=10;
    }

    snake.unshift(newHead); // Add the new head to the front
    snake = snake.slice(0, len); // Enforce the snake's max length


    // Detect wall collisions
    if (newHead.x < 0) newHead.x = size - 1;
    if (newHead.x >= size) newHead.x = 0;
    if (newHead.y < 0) newHead.y = size - 1;
    if (newHead.y >= size) newHead.y = 0;

    //initialize snake, structure of snake
    ctx.fillStyle = '#268bd2';
    for (let i = 0; i < snake.length; i++) {
      ctx.fillRect(snake[i].x, snake[i].y, GRID_size, GRID_size); // Paint the snake
      if (snake[i].x == newHead.x && snake[i].y == newHead.y) {
        len = 5;
      }
    }
    while (snake.length > len){
      snake.shift();
    }

    // Place a candy (not on the snake) if needed
    while (!candy) {
      candy = createCandy();
    }
    fillCandy(candy.x, candy.y)
  }

  window.onload = function() {
    setInterval(Game, 100);
    window.onkeydown = function(e) {
      newDirection = { 37: -1, 38: -2, 39: 1, 40: 2 }[e.keyCode] || newDirection; 
    };
  };
}
