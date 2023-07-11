/* https://www.youtube.com/watch?v=VlAACb6aOvw&ab_channel=theLearningHab */

(function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // canvas size
  const canvasSize = 680;
  const w = (canvas.width = canvasSize);
  const h = (canvas.height = canvasSize);
  const canvasFillColor = "#000d36";
  const canvasStrokeColor = "rgba(211, 211, 211, 0.19)";

  // getting elements
  const scoreEl = document.getElementById("score");
  const resetEl = document.getElementById("reset");
  const showGridEl = document.getElementById("show-grid");
  const highScoreEl = document.getElementById("high-score");
  const pauseEl = document.getElementById("pause");
  const playEl = document.getElementById("play");

  // set score variable
  let score = 0;

  // create score function for setting score and saving high score to local Storage
  const setScore = () => {
    scoreEl.innerHTML = `Score 👉 ${score}`;
    if (score >= localStorage.getItem("highScore"))
      localStorage.setItem("highScore", score);
    highScoreEl.innerHTML = `HI SCORE 🚀 ${localStorage.getItem("highScore")}`;
  };

  // set frame rate
  const frameRate = 9.5;
  // set grid padding
  const pGrid = 4;
  // set grid width
  const grid_line_len = canvasSize - 2 * pGrid;
  // set cell count
  const cellCount = 44;
  // set cell size
  const cellSize = grid_line_len / cellCount;

  // it will maintain game active status
  let gameActive;

  // this will generate random color for head
  const randomColor = () => {
    let color;
    let colorArr = ["#426ff5", "#42f5e3"];
    color = colorArr[Math.floor(Math.random() * 2)];
    return color;
  };

  // lets first set canvas
  const setCanvas = () => {
    // canvas fill
    ctx.fillStyle = canvasFillColor;
    ctx.fillRect(0, 0, w, h);

    // canvas stroke
    ctx.strokeStyle = canvasStrokeColor;
    ctx.strokeRect(0, 0, w, h);
  };

  // create a function to draw the grid
  const drawGrid = () => {
    ctx.beginPath();

    // let's create vertical lines
    for (let i = 0; i <= grid_line_len; i += cellSize) {
      // move to (x,y)
      ctx.moveTo(i + pGrid, pGrid);
      // draw line from (x,y)
      ctx.lineTo(i + pGrid, grid_line_len + pGrid);
    }

    // horizontal lines
    for (let i = 0; i <= grid_line_len; i += cellSize) {
      ctx.moveTo(pGrid, i + pGrid);
      ctx.lineTo(grid_line_len + pGrid, i + pGrid);
    }

    ctx.closePath();
    ctx.strokeStyle = canvasStrokeColor;
    ctx.stroke();
  };

  // create snake head
  const head = {
    x: 2,
    y: 1,
    color: randomColor(),
    vX: 0,
    vY: 0,
    draw: () => {
      ctx.fillStyle = head.color;
      ctx.shadowColor = head.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        head.x * cellSize + pGrid,
        head.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  // create tail
  let tailLength = 4;
  let snakeParts = [];

  class Tail {
    color = "#42f57e";
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        this.x * cellSize + pGrid,
        this.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    }
  }

  // create food
  const food = {
    x: 5,
    y: 5,
    color: "#FF3131",
    draw: () => {
      ctx.fillStyle = food.color;
      ctx.shadowColor = food.color;
      ctx.shadowBlur = 5;
      ctx.fillRect(
        food.x * cellSize + pGrid,
        food.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const drawSnake = () => {
    //loop through our snakeParts array and draw each part of tail
    snakeParts.forEach((part) => {
      part.draw();
    });

    snakeParts.push(new Tail(head.x, head.y)); // each time it will push new tail following the head

    if (snakeParts.length > tailLength) {
      snakeParts.shift(); // remove furthest item from snake part if we have more than our tail size
    }

    // draw head
    head.color = randomColor();
    head.draw();
  };

  const updateSnakePosition = () => {
    head.x += head.vX;
    head.y += head.vY;
  };

  let showGrid = false;

  const toggleGrid = () => {
    if (!showGrid) {
      showGrid = true;
      showGridEl.innerHTML = `Hide Grid`;
      return;
    }
    showGrid = false;
    showGridEl.innerHTML = `Show Grid`;
  };

  const resetGame = () => {
    location.reload();
  };

  // check food collision and update game

  const foodCollision = () => {
    let foodCollision = false;
    snakeParts.forEach((part) => {
      if (part.x == food.x && part.y == food.y) {
        foodCollision = true;
      }
    });
    if (foodCollision) {
      food.x = Math.floor(Math.random() * cellCount);
      food.y = Math.floor(Math.random() * cellCount);
      score++;
      tailLength++;
    }
  };

  // create a function for animation
  const animate = () => {
    setCanvas();
    drawGrid();
    drawSnake();
    updateSnakePosition();
    foodCollision();
    food.draw();
    setScore();
    setTimeout(animate, 1000 / frameRate);
  };

  const changeDir = (e) => {
    let key = e.keyCode;

    if (key == 68 || key == 39) {
      if (head.vX === -1) return;
      head.vX = 1;
      head.vY = 0;
      return;
    }
    if (key == 65 || key == 37) {
      if (head.vX === 1) return;
      head.vX = -1;
      head.vY = 0;
      return;
    }
    if (key == 87 || key == 38) {
      if (head.vY === 1) return;
      head.vX = 0;
      head.vY = -1;
      return;
    }
    if (key == 83 || key == 40) {
      if (head.vY === -1) return;
      head.vX = 0;
      head.vY = 1;
      return;
    }
  };

  // event listenners
  showGridEl.addEventListener("click", toggleGrid);
  resetEl.addEventListener("click", resetGame);
  addEventListener("keydown", changeDir); // window event it will change our snake direction by changing head current direction/*  */

  // animate from here
  animate();
})();
