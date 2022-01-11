var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Estados del juego
var PLAY=1;
var END=0;
var gameState=1;

function preload()
{
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  // Fondo con Movimiento
  path = createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //crear al niño que corre
  boy = createSprite(width-70,height-100,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale = 0.1;
  //boy.scale = (width-930,height-800)-0.8;
  //boy.scale = 0.08-(width-930,height-800)+1;
  
  //establece el colisionador para el niño
  boy.setCollider("circle",0,0,550);
  boy.debug = false;
  
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw()
{
  if(gameState === PLAY)
  {
    background(0);
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    //codigo para reiniciar el fondo
    if(path.y > 600 )
    {
      path.y = height/2;
    }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) 
    {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy))
    {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 100;
    }
    else if(jwelleryG.isTouching(boy))
    {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 150;
    }
    else
    {
      if(swordGroup.isTouching(boy))
      {
        gameState = END;

        boy.addAnimation("SahilRunning", endImg);
        boy.x = width/2;
        boy.y = height/2;
        boy.scale = 0.6;

        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
      }
    }
  
    drawSprites();
    textSize(20);
    fill("pink");
    text("Tesoro: "+ treasureCollection,width-200,40);
  }
}

function createCash()
{
  if (World.frameCount % 150 == 0)
  {
    var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 9;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds()
{
  if (World.frameCount % 260 == 0)
  {
    var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 9;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery()
{
  if (World.frameCount % 370 == 0)
  {
    var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 9;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword()
{
  if (World.frameCount % 400 == 0)
  {
    var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 9;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}