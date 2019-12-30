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
let life = 3;
let direction = 36;

let meteors = [];

meteors[0] = {
  x: 0,
  y: 0
};

// On key down

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowRight":
      if (monsterX + 75 < canvas.width) {
        monsterX += direction;
      }
      break;
    case "ArrowLeft":
      if (monsterX > 0) {
        monsterX -= direction;
      }
      break;
    default:
      break;
  }
}

//Draw

function draw() {
  context.drawImage(bg, 0, 0);
  for (let i = 0; i < meteors.length; i++) {
    //New Meteor
    if (
      meteors[i].y + 36 >= 430 &&
      ((meteors[i].x >= monsterX && meteors[i].x <= monsterX + 75) ||
        (meteors[i].x + 36 >= monsterX && meteors[i].x + 36 <= monsterX + 75))
    ) {
      /* score++;
      console.log(score); */
    } else if (meteors[i].y >= canvas.height) {
      meteors.shift(i, 1);
      console.log(meteors.length);
    }
  }

  for (let i = 0; i < meteors.length; i++) {
    context.drawImage(meteor, meteors[i].x, meteors[i].y, 36, 36);
    meteors[i].y += gravity;

    //New Meteor
    if (meteors[i].y == distance) {
      meteors.push({
        x: Math.floor(Math.random() * canvas.width),
        y: 0
      });
    }
    //hitbox
  }
  window.addEventListener("keydown", onKeyDown);
  context.drawImage(monster, monsterX, 430, 75, 75);

  requestAnimationFrame(draw);
}

draw();
