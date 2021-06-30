var gameState = "PLAY";


var tower, towerimage;
var climber, climberimage, climbergroup;
var door, doorimage, doorgroup;
var ghost, ghostimage;
var iblock, iblockgroup;

function preload()
{
  towerimage = loadImage ("tower.png");
  climberimage = loadImage ("climber.png"); 
  doorimage = loadImage ("door.png");
  ghostimage = loadImage ("ghost-standing.png");
  
  gameover = loadSound("gameover.mp3");
  
}


function setup()
{
  createCanvas(windowWidth, windowHeight);
  
  tower = createSprite(width/2,height-10,width,125)
  tower.addImage("tower",towerimage);
  tower.velocityY = 1;
  
  ghost = createSprite (width/2,height-10,width,125)
  ghost.addImage("ghost",ghostimage);
  ghost.scale = 0.5;
  
 doorgroup = new Group();
 climbergroup = new Group(); 
 iblockgroup = new Group();
  
  
}


function draw()
{
  background(0);
  
  if(gameState === "PLAY")
 {
       
     if(tower.y>400)
     {
     tower.y = 300;
     }
       
     if (keyDown("space"))  
       {
         ghost.velocityY = -10;
       }
   
   ghost.velocityY += 0.8;
   
   if(keyDown("left_arrow"))
     {
       ghost.x  -= 3
     }
   
   if(keyDown("right_arrow"))
     {
       ghost.x  += 3
     }
  
   if(climbergroup.isTouching (ghost))
     {
       ghost.velocityY = 0;
     }
   
   if(iblockgroup.isTouching (ghost)||ghost.y>600)
     {
       ghost.destroy();
       gameState = "END";
       gameover.play();
       
     }
   
    spwandoors();
  
    drawSprites();
   
 }
  
  if(gameState === "END")
  {
    fill("red")
    textSize(30)
    text("GAME OVER",230,250)
  }
 
}

function spwandoors()
{
  if(frameCount%240===0)
  {
    door = createSprite (width/2,height-10,width,125)
    door.addImage(doorimage);
    
    climber = createSprite (width/2,height-10,width,125)
    climber.addImage(climberimage);
    
    
    iblock = createSprite(width/2,height-10,width,125)
    iblock.width = climber.width; 
    iblock.height = 2;
    
 
    climber.velocityY = 1;
    climber.lifetime = 800;
   
    
    door.x = Math.round (width/2,height-10,width,125)
    climber.x = door.x
    door.velocityY = 1;
    
    door.lifetime = 800;
    
    iblock.velocityY = 1; 
    iblock.lifetime = 800; 
    iblockgroup.add(iblock); 
    iblock.debug = true;
    iblock.x = door.x;
    
    climbergroup.add(climber);
    
    doorgroup.add(door);
  }
}


