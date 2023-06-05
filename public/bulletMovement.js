import Bullet from "./bullet.js";
export default class bulletMovement{
    bullets = []
    reload = 0;

    constructor(canvas,bulletColor){
        this.canvas = canvas;
        this.bulletColor = bulletColor;
    }

    draw(ctx){
        this.bullets.forEach((bullet) => bullet.draw(ctx));

        if(this.reload > 0){
            this.reload--;
        }
    }

    collideWith(alien) {
        const bulletHitIdx = this.bullets.findIndex(bullet=>bullet.collideWith(alien));
        if (bulletHitIdx >= 0){
            this.bullets.splice(bulletHitIdx,1);
            return true;
        }
        return false;
    }

    shoot(x,y,velocity,reload = 0){
        if(this.reload <= 0){
            const bullet = new Bullet(this.canvas,x,y,velocity,this.bulletColor);
            this.bullets.push(bullet);
            this.reload = reload;
        }
    }
}