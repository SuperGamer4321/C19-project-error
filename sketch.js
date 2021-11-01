var space,spaceImg;
var rocket ,rocketImg,rocketSnd;
var energy,energyImg,energyG,bomb,bombImg,bombsG,star,starG,starImg;
var energyCollection = 0;
var gameover,gameoverImg;
//GameStates
var END = 0;
var PLAY = 1;
var gameState = 1 ;

function preload(){
  spaceImg = loadImage("universe.jpg");
  rocketImg = loadImage("spaceship.png");
  gameoverImg = loadImage("gameover.png");
  energyImg = loadImage("energy.png");
  bombImg = loadImage("bomb.png");
  starImg = loadImage("star.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  console.log(windowHeight);
  console.log(windowWidth);
   
  //Moving background
  space = createSprite(750,0);
  space.addImage("space",spaceImg);
  space.scale = 0.59;
  space.rotation = 270;
  space.velocityY = 4;

  //Sprites
  rocket = createSprite(500,600);
  rocket.addImage("rocket",rocketImg);
  rocket.scale = 0.09;

  gameover = createSprite(750,350);
  gameover.addImage("gameOver",gameoverImg);
  gameover.visible = false;

  energyG = new Group();
  bombsG = new Group();
  starsG = new Group();
}

function draw(){
  if(gameState === PLAY){
   background(0);
   rocket.x = World.mouseX;

   edges= createEdgeSprites();
   rocket.collide(edges);
 
   // Reset background
   if(space.y > 1300){
     space.y = height/2
    }

   createEnergy();
   createBombs();
   createStars();

   if (energyG.isTouching(rocket)) {
     energyG.destroyEach();
     energyCollection=energyCollection+80;
   }
   else if(starsG.isTouching(rocket)) {
     starsG.destroyEach();
     energyCollection=energyCollection+50
    }
   else{
     if(bombsG.isTouching(rocket)) {
       gameState = END
       energyG.destroyEach();
       energyG.setVelocityEach(0);
       starsG.destroyEach();
       starsG.setVelocityEach(0);
       bombsG.destroyEach();
       bombsG.setVelocityEach(0);
      }
    
    }

 
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Energy: "+ energyCollection,150,30);

 if(gameState === END){
   space.velocityY = 0;
   rocket.destroy();
   gameover.visible = true;
   textSize(20);
   fill("white");
   text("Press Space To Restart The Game",580,500);
   
   if(keyDown("up")){
     reset();
   }
  }
}
function reset(){
  gameState = PLAY;
  gameover.visible = false;

  starsG.destroyEach();
  bombsG.destroyEach();
  energyG.destroyEach();

  energyCollection = 0;

}

function createEnergy() {
  if (World.frameCount % 50 == 0) {
  var energy = createSprite(Math.round(random(50, 1500),40, 10, 10));
  energy.addImage(energyImg);
  energy.scale = 0.1;
  energy.velocityY = 3;
  energy.lifetime = 200;
  energyG.add(energy);
  }
}
function createStars() {
  if (World.frameCount % 60 == 0) {
  var star = createSprite(Math.round(random(50, 1500),40, 10, 10));
  star.addImage(starImg);
  star.scale = 0.1;
  star.velocityY = 3;
  star.lifetime = 200;
  starsG.add(star);
  }
}

function createBombs() {
  if (World.frameCount % 30 == 0) {
  var bomb = createSprite(Math.round(random(50, 1500),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale = 0.03;
  bomb.velocityY = 3;
  bomb.lifetime = 200;
  bombsG.add(bomb);
  }
}



