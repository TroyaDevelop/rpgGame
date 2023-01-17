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
            if(event.target.className !== "fight__start"){
                return;
            } else {
                this.deleteStartFightButton();
                this.fightInit();
            };
        });
    },

    fightInit(){
        document.querySelector(".fight").addEventListener("click", event =>{
            if(event.target.className !== "fight__attack"){
                return;
            }
            this.attack(event);
        });
        this.createAttackButton();
        this.createDamageInfo();
    },

    run(){
        this.init();
    },

    attack(event){
        let damage = Math.floor(Math.random() * 3) + 1;
        if (this.enemy.hp <= 0){
            return;
        }
        this.enemy.hp = this.enemy.hp - damage;
        if(this.enemy.hp < 0){
            this.enemy.hp = 0;
        }
        this.updateStatus(damage);
        if(this.enemy.hp === 0){
            this.endFight();
        }
    },

    updateStatus(damage){
        document.getElementById("player__hp").innerHTML = this.player.hp;
        document.getElementById("player__armor").innerHTML = this.player.armor;
        document.getElementById("player__power").innerHTML = this.player.power;
        document.getElementById("enemy__hp").innerHTML = this.enemy.hp;
        document.getElementById("damageCount").innerHTML = (`${damage} урона`);
    },

    createDamageInfo(){
        let fightDiv = document.querySelector(".fight");
        let damageInfo = document.createElement('p');
        damageInfo.textContent = "Вы нанесли: ";
        fightDiv.appendChild(damageInfo);
        let damageInfo2 = document.createElement('span');
        damageInfo2.id = "damageCount";
        damageInfo.appendChild(damageInfo2);
        return fightDiv;
    },

    deleteDamageInfo(){
        let fightDiv = document.querySelector(".fight");
        fightDiv.innerHTML = "";

        return fightDiv;
    },

    createStartFightButton(){
        let fightDiv = document.querySelector(".fight");
        let startBtn = document.createElement('button');
        startBtn.textContent = "Начать бой";
        startBtn.classList.add("fight__start");
        fightDiv.appendChild(startBtn);
        return fightDiv;
    },

    deleteStartFightButton(){
        let fightDiv = document.querySelector(".fight");
        let startBtn = document.querySelector(".fight__start");
        startBtn.remove();
        return fightDiv;
    },

    createAttackButton(){
        let fightDiv = document.querySelector(".fight");
        let damageInfo = document.createElement('button');
        damageInfo.textContent = "Атаковать";
        damageInfo.classList.add("fight__attack");
        fightDiv.appendChild(damageInfo);
        return fightDiv;
    },

    deleteAttackButton(){
        let fightDiv = document.querySelector(".fight");
        let attackBtn = document.querySelector(".fight__attack");
        attackBtn.remove();
        return fightDiv;
    },

    endFight(){
        this.deleteAttackButton();
        this.deleteDamageInfo();
        this.createStartFightButton();
    }
};

fight.run();