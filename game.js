const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let shipX = canvas.width / 2 - 20;
const shipWidth = 40, shipHeight = 20;
let bullets = [];
let enemies = [];
const bulletSpeed = 5;
const enemyRows = 3, enemyCols = 6;
const enemySize = 40;
let rightPressed = false, leftPressed = false;

const enemyImage = new Image();
enemyImage.src = "pikachu_like.png"; // 敵キャラ画像

function initEnemies() {
  enemies = [];
  for (let r = 0; r < enemyRows; r++) {
    for (let c = 0; c < enemyCols; c++) {
      enemies.push({ x: 50 + c * 60, y: 50 + r * 60, alive: true });
    }
  }
}
initEnemies();

function drawShip() {
  ctx.fillStyle = "lime";
  ctx.fillRect(shipX, canvas.height - shipHeight - 10, shipWidth, shipHeight);
}

function drawBullets() {
  ctx.fillStyle = "red";
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 10));
}

function drawEnemies() {
  enemies.forEach(e => {
    if (e.alive) {
      ctx.drawImage(enemyImage, e.x, e.y, enemySize, enemySize);
    }
  });
}

function moveBullets() {
  bullets.forEach(b => b.y -= bulletSpeed);
  bullets = bullets.filter(b => b.y > 0);
}

function collisionDetection() {
  bullets.forEach(b => {
    enemies.forEach(e => {
      if (e.alive && b.x < e.x + enemySize && b.x + 4 > e.x && b.y < e.y + enemySize && b.y + 10 > e.y) {
        e.alive = false;
        b.y = -100;
      }
    });
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawBullets();
  drawEnemies();
  moveBullets();
  collisionDetection();
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") leftPressed = true;
  if (e.key === "ArrowRight") rightPressed = true;
  if (e.key === " ") bullets.push({ x: shipX + shipWidth / 2, y: canvas.height - shipHeight - 10 });
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") leftPressed = false;
  if (e.key === "ArrowRight") rightPressed = false;
});

function moveLeft() { shipX -= 20; }
function moveRight() { shipX += 20; }
function shoot() { bullets.push({ x: shipX + shipWidth / 2, y: canvas.height - shipHeight - 10 }); }

function moveShip() {
  if (leftPressed) shipX -= 3;
  if (rightPressed) shipX += 3;
  shipX = Math.max(0, Math.min(canvas.width - shipWidth, shipX));
  requestAnimationFrame(moveShip);
}

draw();
moveShip();
