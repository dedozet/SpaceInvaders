export default class Alien {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40;
        this.image = new Image();
        this.image.src = "./alien.png";
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x, this.y, this.height, this.width);
    }

    move(xVelocity,yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
    }

    collideWith(player){
        if(this.x + this.width > player.x && this.x < player.x + player.width &&
            this.y + this.height > player.y && this.y < player.y + player.height
            ){
                return true;
            }
        return false;
    }
    collideBottom(){
        if(this.y > 525 - this.height){ 
            return true
        }
        else return false;
    }
}