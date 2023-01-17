const player = {
    hp: 100,
    armor: 0,
    power: 1,
}

const enemy = {
    hp: 10,
    armor: 0,
    power: 0,
};

const fight = {
    player,
    enemy,
    
    init(){
        document.querySelector(".fight").addEventListener("click", event => {
            if(event.target.className !== "fight__attack"){
                return;
            } else {
                this.attack(event);
            };
        });
    },

    run(){
        this.init();
    },

    attack(event){
        let damage = this.player.power;
        if (this.enemy.hp <= 0){
            return;
        }
        this.enemy.hp = this.enemy.hp - damage;
        this.updateStatus();
        },

    updateStatus(){
        document.getElementById("player__hp").innerHTML = this.player.hp;
        document.getElementById("player__armor").innerHTML = this.player.armor;
        document.getElementById("player__power").innerHTML = this.player.power;
        document.getElementById("enemy__hp").innerHTML = this.enemy.hp;
        document.getElementById("enemy__armor").innerHTML = this.enemy.armor;
        document.getElementById("enemy__power").innerHTML = this.enemy.power;
    }
};

fight.run();