const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//load Images

const bg = new Image();
const meteor = new Image();
const monster = new Image();

bg.src = "images/bg.png";
meteor.src = "images/meteor.png";
monster.src = "images/pokemon.png";

//Variables

let gravity = 2;
let monsterX = 119;
let distance = 120;
let score = 0;
let life = 3;
let direction = 36;
let monsterWidth = 50;
let monsterHeight = 50;
let meteorWidth = 36;
let meteorHeight = 36;

let meteors = [];

meteors[0] = {
  x: 40,
  y: 0
};

// On key down

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowRight":
      if (monsterX + monsterWidth + 40 < canvas.width) {
        monsterX += direction;
      }
      break;
    case "ArrowLeft":
      if (monsterX > 40) {
        monsterX -= direction;
      }
      break;
    default:
      break;
  }
}

//Draw

function draw() {
  //Background
  context.drawImage(bg, 0, 0);
  //Losing
  for (let index = 0; index < meteors.length; index++) {
    if (life === 0) {
      location.reload();
    }
  }

  //Difficulty
  for (let j = 0; j < meteors.length; j++) {
    if (score === 25) {
      gravity = 3;
    } else if (score === 50) {
      gravity = 4;
    } else if (score === 100) {
      distance = 100;
    }
  }

  //Hitbox

  for (let i = 0; i < meteors.length; i++) {
    if (
      meteors[i].y + meteorHeight >= 430 &&
      ((meteors[i].x >= monsterX && meteors[i].x <= monsterX + monsterWidth) ||
        (meteors[i].x + meteorWidth >= monsterX &&
          meteors[i].x + meteorWidth <= monsterX + monsterWidth))
    ) {
      meteors.shift(i, 1);
      score++;
    } else if (meteors[i].y >= canvas.height) {
      meteors.shift(i, 1);
      life--;
    }
  }

  //Meteors

  for (let i = 0; i < meteors.length; i++) {
    context.drawImage(
      meteor,
      meteors[i].x,
      meteors[i].y,
      meteorWidth,
      meteorHeight
    );
    meteors[i].y += gravity;

    //New Meteor
    if (meteors[i].y == distance) {
      meteors.push({
        x: Math.floor(Math.random() * (canvas.width - 40 - 40) + 40),
        y: 0
      });
    }
  }
  window.addEventListener("keydown", onKeyDown);
  context.drawImage(monster, monsterX, 430, monsterWidth, monsterHeight);

  //score

  context.fillStyle = "#000";
  context.font = "50px Verdana";
  context.fillText(score, 110, 70);

  //lifes

  context.fillStyle = "#000";
  context.font = "20px Verdana";
  context.fillText("Life: " + life, 5, 500);

  requestAnimationFrame(draw);
}

draw();
