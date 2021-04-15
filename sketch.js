var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage,stoneImage;
var foodGroup,stoneGroup;
var score=0;


var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  stoneImage=loadImage("stone.png");
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;


  foodGroup=createGroup();
  stoneGroup=createGroup();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  

  bananas();
  Stones();


  if(player.isTouching(stoneGroup)) {
    gameState=END;
  } 
 } else if(gameState==END){
 background(0);
 backgr.velocityX= 0;
 player.visible= false;

 foodGroup.destroyEach();
 stoneGroup.destroyEach();

 

}{
     
   if(player.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score=score+2
    player.scale+=+0.1
   }
}


  drawSprites();

  stroke("black");
  textSize(20);
  fill("white");
  text("Score :"+score,550,50); 

  if(gameState==END){
    
    textSize(30);
    fill(255);
    text("Game Over!",300,220);

  }

}

function bananas(){
  if (frameCount % 100 === 0){
  var banana = createSprite(600,100,40,10);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -3;
  banana.scale=0.1;
    
  banana.lifetime = 210; 
  foodGroup.add(banana);
}
}  

function Stones(){
  if (frameCount % 300 === 0){
 var obstacle = createSprite(800,310,10,40);
 obstacle.velocityX = -6;
 obstacle.scale = 0.2;
    
 obstacle.addImage(stoneImage);
    
 obstacle.lifetime = 210;
 stoneGroup.add(obstacle);
  }
 }