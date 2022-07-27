var PLAY = 1
var END = 0;
var gameState = PLAY;

var sonic, sonic_running, sonic_collided;
var background, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2;

var score=0;

var gameOver, restart;

function preload(){
sonic_running = loadImage("runningSonic.png");
sonic_collided = loadImage("sonicOver.png");

groundImage = loadImage("background.png");

obstacle1 = loadImage("rockObstacle1.png");
obstacle2 = loadImage("rockObstacle2.png");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png")
}

function setup() {
 createCanvas(600,200);

 sonic = createSprite(50,180,20,50);

 sonic.addImage("running", sonic_running)
 sonic.addImage("collided", sonic_collided)
 sonic.scale = 0.5;
 
 background = createSprite(200, 180,400,20);
 background.addImage("group", groundImage);
 background.x = ground.width /2;
 background.velocityX = -(6 + 3*score/100);

 gameOver = createSprite(300,100);
 gameOver.addImage(gameOver);

 gameOver.scale = 0.5;

 invisibleGround = createSprite(200,190,400,10);
 invisibleGround.visible = false;

 obstaclesGroup = new Group();

  score = 0
}

function draw() {
 //sonic.debug = true;
 background(255);
 text("Score: "+ score, 500,50);

 if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    background.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && sonic.y >= 159) {
      sonic.velocityY = -12;
    }
  
    sonic.velocityY = sonic.velocityY + 0.8
  
    if (background.x < 0){
      background.x = background.width/2;
    }
  
    sonic.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(sonic)){
        gameState = END;
    }
  }

    drawSprites()
}

function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,165,10,40);
      //obstacle.debug = true;
      obstacle.velocityX = -(6 + 3*score/100);
      
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle2.addImage(obstacle2);
                break;
        default: break;
      }
             
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
    }
  }

  function gameOver(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
    trex.changeAnimation("running",trex_running);
    
   
    
    score = 0;
    
  }