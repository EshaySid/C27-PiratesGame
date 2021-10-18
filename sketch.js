const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var boats=[];

var boatSpriteData;
var boatSpriteSheet;
var boatAnimation=[];

//bb=broken boat
var bbSpriteData;
var bbSpriteSheeet;
var bbAnimation=[];

var score=0;

//pL=pirate laugh
var pL;

//bgMusic=background music ce= cannon explosion
var bgMusic, ce

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpriteData=loadJSON("./assets/boat/boat.json");
  boatSpriteSheet=loadImage("./assets/boat/boat.png");

  bbSpriteData=loadJSON("./assets/boat/broken_boat.json");
  bbSpriteSheet=loadImage("./assets/boat/broken_boat.png");

  bgMusic=loadSound("./assets/background_music.mp3");
  ce=loadSound("./assets/cannon_explosion.mp3"); 
  pL=loadSound("./assets/pirate_laugh.mp3");
  
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  
  var boatFrames=boatSpriteData.frames;
  for(var i=0; i<boatFrames.length; i++){
    var p=boatFrames[i].position;
    var img= boatSpriteSheet.get(p.x,p.y,p.w,p.h);
    boatAnimation.push(img);
  }

  var bbFrames=bbSpriteData.frames;
  for(var i=0; i<bbFrames.length; i++){
    var s=bbFrames[i].position;
    var img= bbSpriteSheet.get(s.x,s.y,s.w,s.h);
    bbAnimation.push(img);
  }
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

 bgMusic.play();
  bgMusic.setVolume(0.008);
  

  Engine.update(engine);
  ground.display();
  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    for(var j=0; j<boats.length; j++){
      if(balls[i]!==undefined&& boats[j]!==undefined){
        var collision=Matter.SAT.collides(balls[i].body,boats[j].body);
        if(collision.collided){
          boats[j].destroy(j);
          World.remove(world,balls[i].body);
          balls.splice(i,1);
          i=i-1;
          score=score+1;
          ce.play();
          ce.setVolume(0.1);
          //if thre is a loop inside a loop it is called a nested loop
          //if thre is an if inside an if is it called nested if
          
          //json full form is javascript object notation

          //!== is how to write not true
        }
      }
    }
  }

  cannon.display();
  tower.display();
  stroke ("black");
  textSize(75);
  text("score:"+score,850,100);

 // boat.display();
 // Matter.Body.setVelocity(boat.body,{x:-0.9,y:0});
  //showBoats();
  //Matter.Body.setVelocity(boat.body,{x:-5,y:0});
  
}

// function to create ball and store in ball array when key pressed

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//function to show the ball if it has not touched the ground.
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}


// function to shoot ball  when key releaed
function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}

function showBoats(){
  if(boats.length>0){

 if(boats.length<4 &&boats[boats.length-1].body.position.x<width-300){
  var positions=[-100,-120,-130,-90];
  var p=random(positions);
  var boat= new Boat(1150,500,150,150,p,boatAnimation);
  boats.push(boat);
 }
 for(var i=0; i<boats.length; i++){
  boats[i].increaseSpeed();
  boats[i].display();
  Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0});
  var collision=Matter.SAT.collides(boats[i].body, tower.body);
  if(collision.collided){
   // pL.play();
    gameOver();
  }
 }
  }

  else{
    var positions=[-100,-120,-130,-90];
    var p=random(positions);
    var boat1= new Boat(1150,500,150,150,p,boatAnimation);
    boats.push(boat1);
  }
    }

  function gameOver(){
    swal({
      title:"GAMEOVER!!!",
      text:"THANKS FOR PLAYING",
      imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize:"150x150",
      confirmButtonText:"RETRY"
    },
    function(isConfirm){
      if(isConfirm===true){
        location.reload();
        score=0;
      }
    })
  }
