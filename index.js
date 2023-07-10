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

  // create a function for animation
  const animate = () => {
    setCanvas();
    drawGrid();
    setScore();
    setTimeout(animate, 1000 / frameRate);
  };

  // event listenners
  showGridEl.addEventListener("click", toggleGrid);
  resetEl.addEventListener("click", resetGame);

  // animate from here
  animate();
})();
