class World {
    char = new character();
    enemies = [
        new villain(),
        new villain(),
        new villain(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/background/game_background_2/layers/battleground.png', 0, 0),
        new BackgroundObject('img/background/game_background_2/layers/back_land.png', 0, 0),
        new BackgroundObject('img/background/game_background_2/layers/ground_decor.png', 0, 0),
        new BackgroundObject('img/background/game_background_2/layers/back_decor.png', 0, 0),
        new BackgroundObject('img/background/game_background_2/layers/front_decor.png', 0, -240),
    ]
    ctx;
    canvas
    keyboard;

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.char.world = this;
    };

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.char);
        this.addObjectsToMap(this.enemies);
        

        let self = this; //draw() wird immer wieder ausgeführt.
        requestAnimationFrame(function(){self.draw();});
    }

    addObjectsToMap(objects){
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    addToMap(mObj){
        if (mObj.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mObj.width,0);
            this.ctx.scale(-1, 1)
            mObj.x = mObj.x * -1
        }
        this.ctx.drawImage(mObj.img, mObj.x, mObj.y, mObj.width, mObj.height);
        if (mObj.otherDirection) {
            mObj.x = mObj.x * -1
            this.ctx.restore();
        }
    }
}