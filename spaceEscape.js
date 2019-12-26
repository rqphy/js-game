const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//load Images

const bg = new Image();
const meteor = new Image();
const ship = new Image();

bg.src = "images/bg.png";
meteor.src = "images/meteor.png";
ship.src = "images/spaceship.png";

function draw() {
  context.drawImage(bg, 0, 0);
  context.drawImage(ship, 124, 450, 40, 40);

  requestAnimationFrame(draw);
}

draw();
