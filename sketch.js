var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,10,10)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.3
  doorsGroup = new Group()
  climbersGroup = new Group()

}

function draw() {
  background(200);
  drawSprites()
  if(gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("left_arrow")&& ghost.x>100){
      ghost.x = ghost.x-3
    }
    if(keyDown("right_arrow")&& ghost.x<500){
      ghost.x = ghost.x+3
    }
    if(keyDown("space")){
      ghost.velocityY = -6
    }
    ghost.velocityY = ghost.velocityY+0.5
    if(climbersGroup.isTouching(ghost)||ghost.y>600){
      gameState = "end"
      ghost.destroy()
    }
    spawnDoors()
  }
  if (gameState=="end"){
    textSize(30)
    text("game over", 250, 250)
  }

}
function spawnDoors() {
  if(frameCount%300==0){
    var door = createSprite(300,0)
    door.addImage(doorImg)
    door.velocityY = 1
    door.x=Math.round(random(150,400))
    var climber = createSprite(300,50)
    climber.addImage(climberImg)
    climber.x = door.x
    climber.velocityY = 1
    doorsGroup.add(door)
    climbersGroup.add(climber)
  }
 
}