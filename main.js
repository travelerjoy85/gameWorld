/*
1. Create the canvas and draw on it.
2. Draw the ball.
3. Make it move.
4. Clear the canvas before each frame.
5. Moving the ball drawing code to a separate function.
6. Bounce off the top and bottom walls.
7. Bounce off the left and right walls.
8. Paddle and keyboard controls.
9. Implementing game over.
10. Build the brick field.
11. Collision Detection.
12. Track the score and win.
*/

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var ballRadius = 10;

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);

var bricks = [];
for(c = 0; c < brickColumnCount; c++){
  bricks[c] = [];
  for(r = 0; r < brickRowCount; r++){
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function keyDownHandler(e){
  if(e.keyCode === 39){
    rightPressed = true;
  } else if(e.keyCode === 37){
    leftPressed = true;
  }
}
function KeyUpHandler(e){
  if(e.keyCode === 39){
    rightPressed = false;
  } else if(e.keyCode === 37){
    leftPressed = false;
  }
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2*Math.PI);
  ctx.fillStyle = "#0095DD";
  ctx.fillStroke = "#0095DD";
  ctx.Stroke = "10";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for(c = 0; c < brickColumnCount; c++){
    for(r = 0; r < brickRowCount; r++){
      if(bricks[c][r].status == 1){
        var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function collisionDetection(){
  for(c=0; c < brickColumnCount; c++){
    for(r = 0; r < brickRowCount; r++){
      var b = bricks[c][r];
      if(b.status == 1){
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickColumnCount*brickRowCount){
            alert("YOU WIN, TIME TO EAT MEAT~~~");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore(){
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function draw(){
  // drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  // x += dx;
  // y += dy;
  // if(y + dy < 0){
  //   dy = -dy;
  // }
  // if(y + dy > canvas.height){
  //   dy = -dy;
  // }
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
    dx = -dx;
  }
  if(y + dy < ballRadius){
    dy = -dy;
  } else if(y + dy > canvas.height-ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      if(y = y - paddleHeight){
        dy = -dy;
      }
    } else {
      alert("GAME OVER");
      document.location.reload();
    }
  }
  if(rightPressed && paddleX < canvas.width-paddleWidth){
    paddleX += 7;
  } else if(leftPressed && paddleX > 0){
    paddleX -= 7;
  }

  x += dx;
  y += dy;

}

setInterval(draw, 10);
