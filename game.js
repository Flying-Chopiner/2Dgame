// 初始化变量
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let paddleHeight = 10;
let paddleWidth = 150;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
const winScore = 100; // 赢得游戏所需的分数
let speedIncreaseCount = 1;
const maxSpeedIncreases = 20;
const speedIncreaseFactor = 1.05;

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
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

// 绘制挡板
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#0095DD';
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

// 绘制分数
function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

// 绘制球速
function drawSpeed() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Speed: ' + Math.sqrt(dx*dx + dy*dy).toFixed(2), canvas.width - 120, 20);
}

// 画图函数
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawSpeed();
    
    // 碰到挡板的逻辑
    if(y + dy > canvas.height - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy * speedIncreaseFactor; // 反向并增加速度
            score++; // 增加分数
            if(score >= winScore) { // 检查是否赢得游戏
                alert('You win! Congratulations!');
                document.location.reload();
                return; // 结束draw函数执行
            }

            // 只有在增加次数小于最大增加次数时才增加速度
            if(speedIncreaseCount < maxSpeedIncreases) {
                dx *= speedIncreaseFactor;
                speedIncreaseCount++;
            }
        }
    }
    
    // 碰到左右边界的逻辑
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // 碰到顶部的逻辑
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    
    // 按键移动挡板的逻辑
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

// 开始画图
draw();
