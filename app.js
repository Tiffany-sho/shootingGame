import { launch } from './animate.js'
import { launcher, opening } from "./global.js";
import { appearMonsterSeries, monsterPoints } from "./monster.js";

const startBtn = document.querySelector("#start")

const monsterNumber = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
export const launcherSetting = {
    drag: false,
    bulletNumder: 3,
    movingX: 400,
    movingY: 500,
    width: 20,
    height: 20
}



startBtn.addEventListener("click", (e) => {

    if (monsterPoints) {
        for (let monsterPoint of monsterPoints) {
            monsterPoint.element.remove();
        }

        monsterPoints.length = 0;
    }

    launcherSetting.drag = true;
    launcherSetting.movingX = e.clientX;
    launcherSetting.movingY = e.clientY;
    launcher.style.left = `${launcherSetting.movingX}px`
    launcher.style.top = `${launcherSetting.movingY}px`
    appearMonsterSeries(monsterNumber)
    opening.classList.add("hidde")
})

document.addEventListener("keydown", (e) => {
    if (e.key == 'a') {
        launch(launcherSetting.bulletNumder);
    }
})

document.addEventListener("mousemove", (e) => {
    if (launcherSetting.drag) {
        launcherSetting.movingX = e.clientX;
        launcherSetting.movingY = e.clientY;
        launcher.style.left = `${launcherSetting.movingX}px`
        launcher.style.top = `${launcherSetting.movingY}px`

    }


})
