export const air = document.querySelector("#container")
export const launcher = document.querySelector("#launcher")
export const airWidth = parseFloat(getComputedStyle(air).width);
export const airHeight = parseFloat(getComputedStyle(air).height);
export const opening = document.querySelector("#opening")
export const removeElement = (removeObj, removeObjs) => {

    const removeIndex = removeObjs.indexOf(removeObj)

    if (removeIndex > -1) {
        removeObjs.splice(removeIndex, 1);
    }

    setTimeout(() => {
        removeObj.element.style.width = "0px";
        removeObj.element.style.height = "0px";
        removeObj.element.style.opacity = "0";
    }, 0)
    setTimeout(() => {
        if (removeObj.element) {
            removeObj.element.remove();
        }
    }, 1000)
}