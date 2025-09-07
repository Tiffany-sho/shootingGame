import { monsterPoints } from "./monster.js";
import { air, airWidth, launcher, removeElement } from "./global.js";

const bulletVelocity = 10;
const photonPoints = [];
const pointRadius = 5;

export const launch = (bulletNumber) => {

    for (let i = 0; i < bulletNumber; i++) {
        const newPhoton = createObject(i, bulletNumber);
        animate(newPhoton);
    }
}

const createObject = (i, bulletNumber) => {
    const photon = document.createElement("div");
    photon.classList.add("photon");
    air.append(photon)
    const newObject = {
        x: parseFloat(getComputedStyle(launcher).left),
        y: parseFloat(getComputedStyle(launcher).top),
        vx: i - Math.floor(bulletNumber / 2),
        vy: -Math.sqrt(bulletVelocity * bulletVelocity - (i - Math.floor(bulletNumber / 2)) * (i - Math.floor(bulletNumber / 2))),
        animateId: null,
        element: photon
    }
    photonPoints.push(newObject);

    newObject.element.style.left = `${newObject.x}px`;
    newObject.element.style.top = `${newObject.y}px`;

    return newObject;
}

const animate = (obj) => {
    obj.x += obj.vx;
    obj.y += obj.vy;

    if (photonDisapear(obj, monsterPoints)) {
        if (obj.animateId) {
            cancelAnimationFrame(obj.animateId)
            obj.animateId = null;
        }

        removeElement(obj, photonPoints)
    }
    else {
        obj.animateId = requestAnimationFrame(() => animate(obj));
    }

    obj.element.style.left = `${obj.x}px`;
    obj.element.style.top = `${obj.y}px`;
}

const photonDisapear = (obj, others) => {
    if (obj.y <= 0 ||
        obj.x <= 0 ||
        obj.x >= airWidth - pointRadius * 2) {
        return true;
    } else {
        for (let other of others) {

            if ((obj.y <= other.y + other.height / 2)
                && (obj.y >= other.y - other.height / 2)
                && (obj.x <= other.x + other.width / 2)
                && (obj.x >= other.x - other.width / 2)) {
                attackMonster(other, others)
                return true;
            }
        }
    }
    return false;
}


const attackMonster = (other, others) => {
    other.damage -= 5;
    other.damageElement.style.width = `${other.damage}%`;

    if (other.damage == 0) {

        if (other.animateId) {
            cancelAnimationFrame(other.animateId)
            other.animateId = null;
        }

        removeElement(other, others)

    } else if (other.damage <= 50 && other.damage >= 20) {
        other.damageElement.style.backgroundColor = "#ffff00";
    } else if (other.damage < 20 && other.damage >= 0) {
        other.damageElement.style.backgroundColor = "#ff0000";
    }
}