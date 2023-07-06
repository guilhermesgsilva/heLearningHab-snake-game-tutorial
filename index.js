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
})();
