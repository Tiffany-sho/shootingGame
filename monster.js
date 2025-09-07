import { air, airHeight, airWidth, opening } from "./global.js";
import { launcherSetting } from "./app.js";


export const monsterPoints = []
const movingIds = [];

export const appearMonsterSeries = (monsterNumber) => {
    for (let i = 0; i < monsterNumber.length; i++) {
        movingIds[i] = setTimeout(() => {
            appearMonster(monsterNumber[i])
        }, 3000 * i)
    }
}

const appearMonster = (number) => {
    for (let i = 0; i < number; i++) {
        const newMonster = createObject(i, number)
        animate(newMonster);
    }
}

const animate = (obj) => {
    obj.x += obj.vx;
    obj.y += obj.vy;

    obj.animateId = requestAnimationFrame(() => animate(obj));

    collitionMonster(launcherSetting, monsterPoints);

    obj.element.style.left = `${obj.x}px`;
    obj.element.style.top = `${obj.y}px`;

}

const stopAnimate = () => {
    for (let monsterPoint of monsterPoints) {
        cancelAnimationFrame(monsterPoint.animateId)
    }

    for (let movingId of movingIds) {
        clearTimeout(movingId);
    }

    movingIds.length = 0;
    launcherSetting.drag = false;
    opening.classList.remove("hidde")

}

const createObject = (i, number) => {
    const monsterEntity = document.createElement("div");
    const damageMeter = document.createElement("div");
    const damageAmount = document.createElement("div");

    monsterEntity.classList.add("monster")
    damageMeter.classList.add("damageMeter")
    damageAmount.classList.add("damageAmount")

    damageMeter.append(damageAmount);
    monsterEntity.append(damageMeter);
    air.append(monsterEntity);

    const newObject = {
        x: airWidth / 2 + 160 * (i - parseInt(number / 2)),
        y: 100,
        vx: 5,
        vy: -5,
        damage: 100,
        height: 30,
        width: 80,
        element: monsterEntity,
        damageElement: damageAmount,
        animateId: null
    }

    monsterPoints.push(newObject)

    newObject.element.style.left = `${newObject.x}px`
    newObject.element.style.top = `${newObject.y}px`
    newObject.damageElement.style.width = `${newObject.damage}%`

    return newObject;
}


const collitionMonster = (player, monsters) => {
    for (let monster of monsters) {
        if (monster.x - monster.width / 2 < 0) {
            monster.vx = -1 * monster.vx;
            monster.x = monster.width / 2
        }

        else if (monster.x > airWidth - monster.width / 2) {
            monster.vx = -1 * monster.vx;
            monster.x = airWidth - monster.width / 2
        }

        else if (monster.y - monster.height / 2 < 0) {
            monster.vy = -1 * monster.vy;
            monster.y = monster.height / 2
        }

        else if (monster.y > airHeight - monster.height / 2) {
            monster.vy = -1 * monster.vy;
            monster.y = airHeight - monster.height / 2
        }



        if ((monster.x - monster.width / 2 <= player.movingX + player.width * 3 / 4) &&
            (monster.x + monster.width / 2 >= player.movingX - player.width * 3 / 4) &&
            (monster.y - monster.height / 2 <= player.movingY + player.height * 3 / 4) &&
            (monster.y + monster.height / 2 >= player.movingY - player.height * 3 / 4)) {
            console.log("Game Over")
            stopAnimate();
        }
    }
}