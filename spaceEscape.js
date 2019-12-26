const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//load Images

const bg = new Image();
const meteor = new Image();
const ship = new Image();

bg.src = "images/bg.png";
meteor.src = "images/meteor.png";
ship.src = "images/spaceship.png";

//Variables
let gravity = 2;
let shipX = 124;
let distance = 100;

let meteors = [];

meteors[0] = {
  x: 0,
  y: 0
};

//Draw

function draw() {
  context.drawImage(bg, 0, 0);
  for (let i = 0; i < meteors.length; i++) {
    context.drawImage(meteor, meteors[i].x, meteors[i].y);
    meteors[i].y += gravity;

    //New Meteor
    if (meteors[i].y == distance) {
      meteors.push({
        x: Math.floor(Math.random() * canvas.width),
        y: 0
      });
    }
  }
  context.drawImage(ship, shipX, 450, 40, 40);

  requestAnimationFrame(draw);
}

draw();
