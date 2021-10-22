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
  tower.velocityY = 2;

  ghost = createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);

  if(gameState == "play"){
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
  
    if(keyDown("RIGHT_ARROW")){
      ghost.x += 3;
    }
  
    if(keyDown("LEFT_ARROW")){
      ghost.x -= 3;
    }
  
    ghost.velocityY = ghost.velocityY + 0.5;
    
    if(tower.y > 400){
        tower.y = 300
    }
  
    spawnDoors();

    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }

    if(ghost.y > 600 || ghost.isTouching(invisibleBlockGroup)){
        gameState = "end";
    }


  }
  else if(gameState == "end"){
    ghost.destroy();
    tower.destroy();
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    invisibleBlockGroup.destroyEach();

    fill("yellow");
    textSize(30);
    text("GAME OVER!!!", 200, 300);

  }

  
  drawSprites();
}


function spawnDoors(){
  if(frameCount % 200 == 0){
    door = createSprite(100, -50, 30, 40);
    door.addImage(doorImg);

    door.velocityY = 2;
    door.x = Math.round(random(130, 470));
    door.lifetime = 350;

    ghost.depth = door.depth +1;

    doorsGroup.add(door);

    climber=createSprite(100,10,30,10);
    climber.addImage(climberImg);

    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 350;

    ghost.depth = climber.depth +1;

    climbersGroup.add(climber);

    invisibleBlock = createSprite(100, 15, 30, 2);
    invisibleBlock.velocityY = 2;
    invisibleBlock.x = climber.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.lifetime = 350;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);




    

  }
 
}
