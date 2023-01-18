const enemyPool = [
    {
        name: "Манекен",
        hp: 10,
        armor: 0,
        power: 0,
    },
]

const player = {
    hp: 100,
    armor: 0,
    power: 1,

}

const enemy = {
    hp: null,
    armor: null,
    power: null,
};

const fight = {
    player,
    enemy,
    turn: 1,
    
    init(){
        this.methodsInit();
    },

    methodsInit(){
        document.querySelector(".fight").addEventListener("click", event => {
            if(event.target.className !== "fight__start"){
                return;
            } else {
                this.clearFightDiv();
                this.fightInit();
            };
        });
        document.querySelector(".fight").addEventListener("click", event =>{
            if(event.target.className !== "fight__attack"){
                return;
            }
            this.attack(event);
        });
        document.querySelector(".fight").addEventListener("click", event =>{
            if(event.target.className !== "fight__endTurn"){
                return;
            }
            this.endTurn(event);
        });
    },

    fightInit(){
        this.turn = 1;
        this.enemyInit();
        this.createDamageInfo();
        this.updateTurnInfo();
        this.createAttackButton();
    },

    enemyInit(){
        this.enemy.hp = enemyPool[0].hp;
        this.enemy.armor = enemyPool[0].armor;
        this.enemy.power = enemyPool[0].power;
    },

    endTurn(){
        this.enemyAttack();
        this.changeTurn();
        this.updateTurnInfo();
        this.createAttackButton();
        this.deleteEndTurnButton();
    },

    attack(event){
        this.playerAttack();
        this.changeTurn();
        this.updateTurnInfo();
        this.deleteAttackButton();
        this.createEndTurnButton();
        if(this.enemy.hp === 0 || this.player.hp === 0){
            this.endFight();
        }
    },

    playerAttack(){
        let playerDamage = Math.floor(Math.random() * 3) + 1; //Переделать. Урон должен быть от силы игрока.
        this.enemy.hp = this.enemy.hp - playerDamage;
        if(this.enemy.hp < 0){
            this.enemy.hp = 0;
        }

        this.updateStatus();
        this.updateDamageCount(playerDamage);
    },

    enemyAttack(){
        let enemyDamage = 0;
        this.player.hp = this.player.hp - enemyDamage;
        if(this.player.hp < 0){
            this.player.hp = 0;
        }
        this.updateStatus();
        this.updateDamageCount(enemyDamage);
    },

    changeTurn(){
        if(this.turn === 1){
            this.turn = 2;
        } else if(this.turn === 2){
            this.turn = 1;
        };
    },

    updateStatus(){
        document.getElementById("player__hp").innerHTML = this.player.hp;
        document.getElementById("enemy__hp").innerHTML = this.enemy.hp;
    },

    updateDamageCount(damage){
        if (this.turn === 1){
            document.getElementById("damageCount").innerHTML = (`Вы нанесли: ${damage} урона.`);
        } else if(this.turn === 2){
            document.getElementById("damageCount").innerHTML = (`Противник нанёс: ${damage} урона`);
            };
        },

    updateTurnInfo(){
        if(this.turn == 1){
            document.getElementById("currentTurn").innerHTML = ("Ход игрока");
        } else if(this.turn == 2){
            document.getElementById("currentTurn").innerHTML = ("Ход противника");
        }
    },

    createDamageInfo(){
        let fightDiv = document.querySelector(".fight");
        let damageCount = document.createElement('p');
        damageCount.id = "damageCount";
        fightDiv.appendChild(damageCount);
        let turn = document.createElement('p');
        turn.id = "currentTurn";
        fightDiv.appendChild(turn);
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

    createAttackButton(){
        let fightDiv = document.querySelector(".fight");
        let attackBtn = document.createElement('button');
        attackBtn.textContent = "Атаковать";
        attackBtn.classList.add("fight__attack");
        fightDiv.appendChild(attackBtn);
        return fightDiv;
    },

    createEndTurnButton(){
        let fightDiv = document.querySelector(".fight");
        let endTurn = document.createElement('button');
        endTurn.textContent = "Закончить ход";
        endTurn.classList.add("fight__endTurn");
        fightDiv.appendChild(endTurn);
        return fightDiv;
    },

    deleteAttackButton(){
        let fightDiv = document.querySelector(".fight");
        let damageInfo = document.querySelector(".fight__attack");
        damageInfo.remove();
        return fightDiv;
    },

    deleteEndTurnButton(){
        let fightDiv = document.querySelector(".fight");
        let endTurn = document.querySelector(".fight__endTurn");
        endTurn.remove();
        return fightDiv;
    },

    clearFightDiv(){
        let fightDiv = document.querySelector(".fight");
        fightDiv.innerHTML = "";

        return fightDiv;
    },

    endFight(){
        this.clearFightDiv();
        this.createStartFightButton();
    },
};

fight.init();
console.log(enemyPool[0]);