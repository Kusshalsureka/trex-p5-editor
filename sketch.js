//Global Variable
var Monkey, Monkey_running;
var FoodGroup, bananaImage;
var obstacleGroup, obstacleImage;
var ground;
var score = 0;
var backImage, back;


function preload() {
  backImage = loadImage("jungle.jpg");
  groundImage = loadImage("ground.jpg");

  Monkey_running = loadImage("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");


}

function setup() {
  createCanvas(800, 400);
  back = createSprite(0, 0, 800, 400);
  back.addImage(backImage);
  back.scale = 1.5;
  back.x = back.width / 2;
  back.velocityX = -4;

  Monkey = createSprite(100, 340, 20, 50);
  Monkey.addAnimation("Monkey", Monkey_running);
  Monkey.scale = 0.2;

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -3;

  ground.visible = false;

  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(255);
  Monkey.collide(ground);
  obstacleGroup.collide(ground);




  if (keyDown("UP_ARROW")) {
    Monkey.velocityY = -10;
  }
  Monkey.velocityY = Monkey.velocityY + 0.11;

  if (keyDown("DOWN_ARROW")) {
    Monkey.velocityY = +10;
  }


  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (back.x < 0) {
    back.x = back.width / 2;
  }
  if (FoodGroup.isTouching(Monkey)) {
    score = score + 2;

    FoodGroup.destroyEach();

  }
  if (obstacleGroup.isTouching(Monkey)) {
    Monkey.scale = 0.1;
  }

  switch (score) {
    case 10:
      Monkey.scale = 0.12;
      break;
    case 20:
      Monkey.scale = 0.14;
      break;
    case 30:
      Monkey.scale = 0.16;
      break;
    case 40:
      Monkey.scale = 0.18;
      break;
    default:
      break;
  }





  spawnFood();
  spawnObstacles();

  drawSprites();

  stroke("white");
  textSize(25);
  fill("white")
  text("Score:" + score, 500, 50);
}

function spawnFood() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -5;


    banana.lifetime = 300;
    Monkey.depth = banana.depth + 1;


    banana.addImage("Banana", bananaImage);
    banana.scale = 0.09;


    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(800, 320, 10, 40);
    obstacle.velocityX = -6;


    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;


    obstacle.lifetime = 300;


    obstacleGroup.add(obstacle);
  }
}