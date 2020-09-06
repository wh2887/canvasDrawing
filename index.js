/** @type {HTMLCanvasElement} */
let canvas = document.querySelector('#canvas')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let ctx = canvas.getContext('2d')
ctx.strokeStyle = 'blue'



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
    ctx.lineWidth = 8
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
}

// options style
window.onload = function () {
    let optionsItems = document.querySelectorAll('.options-item')
    let index = 0;
    for (let i = 0; i < optionsItems.length; i++) {
        optionsItems[i].addEventListener('mousedown', () => {
            optionsItems[index].classList.remove('active')
            index = i
            optionsItems[i].classList.add('active')
        }, false)
    }
}

// color style
window.onload = function () {
    let colorItems = document.querySelectorAll('.color-item')
    let index = 0;
    for (let i = 0; i < colorItems.length; i++) {
        colorItems[i].addEventListener('mousedown', () => {
            colorItems[index].classList.remove('color-active')
            index = i
            colorItems[i].classList.add('color-active')
        }, false)
    }
}
let colorItems = document.querySelectorAll('.color-item')
for (let i = 0; i < colorItems.length; i++) {
    colorItems[i].addEventListener('click', () => {
        console.log(1)
        ctx.strokeStyle = colorItems[i].style.backgroundColor
    }, false)
}

// for (let i = 0; i < aColorBtn.length; i++) {
//     aColorBtn[i].onclick = function () {
//     for (let i = 0; i < aColorBtn.length; i++) {
//         activeColor = this.style.backgroundColor;
//         ctx.strokeStyle = activeColor;
//     }
// }


// 下载
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

// 擦除整块
let resetCanvas = document.querySelector('.clear')
resetCanvas.addEventListener('mousedown', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})
resetCanvas.addEventListener('mouseup', () => {
    resetCanvas.classList.remove('active')
})


// 禁止微信浏览器 H5 下拉显示
document.body.addEventListener('touchmove', function (e) {
    e.preventDefault()
}, { passive: false })