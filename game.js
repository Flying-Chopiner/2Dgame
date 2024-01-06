// 初始化变量
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -4.5;
const ballRadius = 12.5;
let paddleHeight = 8;
let paddleWidth = 200;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
const winScore = 66; // 赢得游戏所需的分数
let speedIncreaseCount = 0.25;
const maxSpeedIncreases = 0.25*winScore;
let speedIncreases = 0;
let speedIncreaseFactor = 1.01;

// 监听键盘事件
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    }
    else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    }
    else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

// 绘制球
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#008000';
    ctx.fill();
    ctx.closePath();
}

// 绘制挡板
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#A52A2A';
    ctx.fill();
    ctx.closePath();
}

// 调整canvas大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    paddleX = (canvas.width - paddleWidth) / 2; // 重置挡板位置
}

// 监听窗口大小变化事件
window.addEventListener('resize', resizeCanvas, false);

// 初始调整画布大小
resizeCanvas();

// Draw the score on the canvas
// Draw the score on the canvas
function drawScore() {
    ctx.font = '40px Arial'; // Font size set to 40px
    ctx.fillStyle = '#FF0000'; // Font color is red
    // Set the y position to 40px + some padding, let's use 10px as padding
    ctx.fillText('Score: ' + score, 8, 50); // Adjust text position if needed
}

// Draw the speed on the canvas
function drawSpeed() {
    ctx.font = '40px Arial'; // Font size set to 40px
    ctx.fillStyle = '#0095DD'; // Font color is blue
    // Set the y position to 40px + some padding, let's use 10px as padding
    // Adjust the x position to account for the text width
    ctx.fillText('Speed: ' + Math.sqrt(dx*dx + dy*dy).toFixed(2), canvas.width - 300, 50); // Adjust text position if needed
}

// Main drawing function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawSpeed();

// Ball collision logic with the paddle
if(y + dy > canvas.height - ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy * speedIncreaseFactor; // Reverse direction and increase speed

        // Increase dx speed if we haven't increased it maxSpeedIncreases times yet
        if (speedIncreases < maxSpeedIncreases) {
            dx = dx < 0 ? dx - speedIncreaseCount : dx + speedIncreaseCount;
            speedIncreases++; // Increment the speed increases counter
        }

        score++; // Increase the score

        if (score >= 0.25*winScore){
            speedIncreaseFactor = speedIncreaseFactor + 0.005;
        }

        // Check if the player has won the game
        if (score >= winScore) {
            alert('Congratulations! You won!');
            document.location.reload(); // Reload the page to restart the game
            clearInterval(interval); // Needed for Chrome to end game
            return; // Exit the function to stop the game
        }
    } else {
        // If the ball hits the bottom and it's not within the paddle's range
        alert('Game Over');
        document.location.reload(); // Reload the page to restart the game
        clearInterval(interval); // Needed for Chrome to end game
        return; // Exit the function to stop the game
    }
}

    // Ball collision logic with the walls
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Ball collision logic with the top
    if(y + dy < ballRadius) {
        dy = -dy;
    }

    // Paddle movement logic
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw); // Request to do this again ASAP
}

draw(); // Call the draw function to start the game
