var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage, stone, stoneImage;
var score;
var survivalTime;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  FoodGroup= new Group();
  stoneGroup= new Group();

}

function setup() {
  createCanvas(850,400);
  score=0
  survivalTime=0
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -14;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    ground.velocityX = -7
 ground.x = ground.width/2;
  
 if(World.frameCount%200===0){
    fruits()
 }
  
  if(World.frameCount%300===0){
    stones()
 }
  
  if(player.isTouching(FoodGroup)){
     FoodGroup.destroyEach()
    score=score+1
    player.scale += + 0.1
      }

      drawSprites()
  textSize(18);
    fill("yellow");
   stroke("blue");
   strokeWeight(1);
  text("Score: "+ score, 500,50);
  
  

  }

  function fruits(){
    banana=createSprite(670,Math.round(random(170,230)),10,10)
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX=-4
    FoodGroup.add(banana)
  }
  
  function stones(){
    stone=createSprite(670,300,10,10);
    stone.addImage(stoneImage);
    stone.velocityX=-4;
    stone.scale=0.2;
    stoneGroup.add(stone);
  }

  if(stoneGroup.isTouching(player)) {
    gameState = END;
  }
  else if(gameState === END) {
    backgr.velocityX=0;
    player.visible = false;

    FoodGroup.destroyEach();
    stoneGroup.destroyEach();

    textSize(30);
    fill(255);
    text("GAME OVER!",300, 220);

  }
}
