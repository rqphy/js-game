const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//load Images

const bg = new Image();
const meteor = new Image();
const monster = new Image();

bg.src = "images/bg.png";
meteor.src = "images/meteor.png";
monster.src = "images/monster.png";

//Variables
let gravity = 2;
let monsterX = 106;
let distance = 120;
let score = 0;
let direction = 25;

let meteors = [];

meteors[0] = {
  x: 0,
  y: 0
};

// On key down

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowRight":
      monsterX += direction;
      break;
    case "ArrowLeft":
      monsterX -= direction;

      break;
    case "65":
      monsterX -= direction;

      break;
    case "68":
      monsterX += direction;

      break;
    default:
      break;
  }
}

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
  window.addEventListener("keydown", onKeyDown);
  context.drawImage(monster, monsterX, 430, 75, 75);

  requestAnimationFrame(draw);
}

draw();
