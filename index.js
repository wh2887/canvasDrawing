/** @type {HTMLCanvasElement} */
let canvas = document.querySelector('#canvas')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let ctx = canvas.getContext('2d')


let painting = false


let isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        last = [x, y]
    }

    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        drawLine(last[0], last[1], x, y)
        last = [x, y]
    }
} else {
    canvas.onmousedown = (e) => {
        painting = true
        last = [e.clientX, e.clientY]
    }

    canvas.onmousemove = (e) => {
        if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        }
        canvas.onmouseup = () => {
            painting = false
        }
    }
}


function drawLine(startX, startY, endX, endY) {
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'
    ctx.lineWidth = 8
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
}

window.onload = function () {
    let optionsItems = document.querySelectorAll('.options-item')
    let index = 0;
    for (let i = 0; i < optionsItems.length; i++) {
        optionsItems[i].addEventListener('click', () => {
            optionsItems[index].classList.remove('active')
            index = i
            optionsItems[i].classList.add('active')
        }, false)
    }
}



let downloadButton = document.querySelector('.download')
downloadButton.addEventListener('click', () => {
    let imgUrl = canvas.toDataURL("image/png");
    let saveA = document.createElement("a");
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = "img" + (new Date).getTime();
    saveA.target = "_blank";
    saveA.click();
}, false)
