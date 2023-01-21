const enemyPool = [
    {
        name: "Манекен",
        hp: 10,
        armor: 0,
        power: 0,
    },

    {
        name: "Ислам",
        hp: 20,
        armor: 0,
        power: 3,
    },

    {
        name: "Лерочка",
        hp: 1000,
        armor: 0,
        power: 10,
    },
]

const player = {
    hp: 100,
    armor: 0,
    power: 1,

}

const enemy = {
    name: null,
    hp: null,
    armor: null,
    power: null,
};

const inv = {
    player,
    inventory: ['Зелье здоровья'],
    invElement: null,

    init(){
        this.invElement = document.querySelector(".inv");
        this.player.hp = localStorage.getItem("playerHp");
        this.player.hp = parseInt(this.player.hp);
        this.methodsInit();
        fight.updatePlayerStatus();
        this.initInvList();
    },

    methodsInit(){
        document.querySelector(".inv").addEventListener("click", event => {
            if(event.target.id !== "item"){
                return;
            } else {
                this.healthPotion();
            };
        });
    },

    initInvList(){
        let invDiv = this.invElement;
        for(let i = 0; i < this.inventory.length; i++){
            let item  = document.createElement('a');
            item.id = "item";
            item.href = "#";
            item.textContent = this.inventory[i];
            invDiv.appendChild(item);
        }
    },
    healthPotion(){
        this.player.hp += 30;
        localStorage.setItem('playerHp', this.player.hp);
        fight.updatePlayerStatus();
        },
};

const fight = {
    player,
    enemy,
    turn: 1,
    fightElement: null,
    
    //Инициализация страницы
    init(){
        this.fightElement = document.querySelector(".fight");
        this.methodsInit();
        this.player.hp = localStorage.getItem('playerHp');
        this.player.hp = parseInt(this.player.hp);
        this.updateStatus();
    },

    //Инициализирует события
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

    //Инициализирует экран боя
    fightInit(){
        this.turn = 1;
        this.enemyInit();
        this.createDamageInfo();
        this.createAttackButton();
        this.updateStatus();
        this.updateTurnInfo();
    },

    enemyInit(){
        // Object.assign(this.enemy, enemyPool[0]); // Способ копировать свойства объекта из одного в другой. Оставлю до лучших времен.
        this.enemy.name = enemyPool[2].name;
        this.enemy.hp = enemyPool[2].hp;
        this.enemy.armor = enemyPool[2].armor;
        this.enemy.power = enemyPool[2].power;
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
        let enemyDamage = this.enemy.power;
        this.player.hp = this.player.hp - enemyDamage;
        if(this.player.hp < 0){
            this.player.hp = 0;
        }
        localStorage.setItem('playerHp', this.player.hp);
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

    updatePlayerStatus(){
        if(this.player.hp > 100){
            this.player.hp = 100;
        }
        document.getElementById("player__hp").innerHTML = this.player.hp;
    },

    updateStatus(){
        this.updatePlayerStatus();
        document.getElementById("enemy__name").innerHTML = this.enemy.name;
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
        let fightDiv = this.fightElement;
        let damageCount = document.createElement('p');
        damageCount.id = "damageCount";
        fightDiv.appendChild(damageCount);
        let turn = document.createElement('p');
        turn.id = "currentTurn";
        fightDiv.appendChild(turn);
        return fightDiv;
    },

    createStartFightButton(){
        let fightDiv = this.fightElement;
        let startBtn = document.createElement('button');
        startBtn.textContent = "Начать бой";
        startBtn.classList.add("fight__start");
        fightDiv.appendChild(startBtn);
        return fightDiv;
    },

    createAttackButton(){
        let fightDiv = this.fightElement;
        let attackBtn = document.createElement('button');
        attackBtn.textContent = "Атаковать";
        attackBtn.classList.add("fight__attack");
        fightDiv.appendChild(attackBtn);
        return fightDiv;
    },

    createEndTurnButton(){
        let fightDiv = this.fightElement;
        let endTurn = document.createElement('button');
        endTurn.textContent = "Закончить ход";
        endTurn.classList.add("fight__endTurn");
        fightDiv.appendChild(endTurn);
        return fightDiv;
    },

    deleteAttackButton(){
        let fightDiv = this.fightElement;
        let damageInfo = document.querySelector(".fight__attack");
        damageInfo.remove();
        return fightDiv;
    },

    deleteEndTurnButton(){
        let fightDiv = this.fightElement;
        let endTurn = document.querySelector(".fight__endTurn");
        endTurn.remove();
        return fightDiv;
    },

    clearFightDiv(){
        let fightDiv = this.fightElement;
        fightDiv.innerHTML = "";

        return fightDiv;
    },
//Конец боя
    endFight(){
        this.clearFightDiv();
        this.createStartFightButton();
    },
};
