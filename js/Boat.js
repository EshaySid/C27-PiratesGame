class Boat {
    constructor(x, y, width, height,boatPos,boatAnimation) {
      var options = {
        isStatic: false
      };
      this.boatImage = loadImage("assets/boat.png");
      this.width = width;
      this.height = height;
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
      this.boatPos=boatPos;
      this.boatAnimation=boatAnimation;
      this.speed=0.05;
      World.add(world, this.body);
    }
    display() {
      var pos = this.body.position;
      var angle = this.body.angle;
      var ap=floor(this.speed%this.boatAnimation.length);
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.boatAnimation[ap], 0, this.boatPos, this.width, this.height);
      pop();
    }

    destroy(position){
      this.boatAnimation=bbAnimation;
      this.speed=0.05;
      this.width=250
      this.height=250; 
      setTimeout(()=>{
        World.remove(world,boats[position].body);
        boats.splice(position,1);
      },2000)

    }

  increaseSpeed(){
    this.speed=this.speed+0.05;
  }

  }
  