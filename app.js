const attchBtn = document.querySelector('#attackBtn')
const splAttackBtn = document.querySelector('#splAttackBtn')
const healBtn = document.querySelector('#healBtn')
const surrenderBtn = document.querySelector('#surrenderBtn')
const battleLog = document.querySelector('.battle-log')
const playerHealth = document.querySelector('.player-health')
const monsterHealth = document.querySelector('.monster-health')
const modalMessage = document.querySelector('#modal-message')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal-close')

class Log{
    constructor(entity, action, enemy, value){
        this.entity = entity
        this.enemy = enemy
        this.value = value
        this.action = action
    }
}

function getHealthValue(el){
    if(el.style.width == ""){
        return 100
    }
    else{
        let value = el.style.width
        value = value.substring(0,value.length-1)
        return parseInt(value)
    }
}

function setHealthValue(el, health, decreaseBy){
    let decreasedHealth = health - decreaseBy
    if(decreasedHealth < 0 ){
        decreasedHealth = 0
    }
    else if(decreasedHealth > 100){
        decreasedHealth = 100
    }
    el.style.width = `${decreasedHealth}%`
    checkForWins()
}

function checkForWins(){
    const monsterHealthVal = getHealthValue(monsterHealth)
    const playerHealthVal = getHealthValue(playerHealth)
    if(monsterHealthVal <= 0){
        showGameOver("You win!")
    }
    else if(playerHealthVal <= 0){
        showGameOver("Monster Wins")
    }
}

function showGameOver(msg){
    modalMessage.innerText = msg
    modal.style.display = 'block'
}

function surrenderGame(){
    setHealthValue(playerHealth, getHealthValue(playerHealth), 100)
    
}

function hidePopUp(){
    modal.style.display = 'none'
    disableBtns([attchBtn,splAttackBtn,surrenderBtn,healBtn])
}

function disableBtns(btnArr){
    btnArr.forEach(element => {
        element.disabled = true
    });
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function playerAttackingMonster(){
    let playerAttackValue = randomIntFromInterval(1,10)
    setHealthValue(monsterHealth, getHealthValue(monsterHealth), playerAttackValue)
    pushLogs(new Log('You','damaged','Monster',playerAttackValue ))
    monsterHealthAttackingPlayer()
}

function monsterHealthAttackingPlayer(){
    let monsterAttackValue = randomIntFromInterval(1,10)
    setHealthValue(playerHealth, getHealthValue(playerHealth), monsterAttackValue)
    pushLogs(new Log('Monster','damaged','you',monsterAttackValue ))
}

function pushLogs(log){
    const {entity, enemy, value, action} = log
    const el = document.createElement('div')
    el.innerText = `${entity} ${action} ${enemy} by ${value} elixir`
    battleLog.appendChild(el)
}

function playerSplAttackingMonster(){
    let playerAttackValue = randomIntFromInterval(10,15)
    setHealthValue(monsterHealth, getHealthValue(monsterHealth), playerAttackValue)
    pushLogs(new Log('You','damaged','Monster',playerAttackValue ))
    monsterHealthAttackingPlayer()
}

function healPlayer(){
    let playerHealerValue = randomIntFromInterval(1,10)
    setHealthValue(playerHealth, getHealthValue(playerHealth), playerHealerValue * (-1))
    pushLogs(new Log('You','healed','Yourself',playerHealerValue ))
    monsterHealthAttackingPlayer()
}

attchBtn.addEventListener('click',playerAttackingMonster)
splAttackBtn.addEventListener('click',playerSplAttackingMonster)
healBtn.addEventListener('click',healPlayer)
surrenderBtn.addEventListener('click',surrenderGame)
modalClose.addEventListener('click',hidePopUp)
