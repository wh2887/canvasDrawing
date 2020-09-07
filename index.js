/** @type {HTMLCanvasElement} */
let canvas = document.querySelector('#canvas')
let colorItems = document.querySelectorAll('.color-item')
let downloadButton = document.querySelector('.download')
let resetCanvas = document.querySelector('.clear')
let inputRange = document.querySelector('#range')
let optionsItems = document.querySelectorAll('.options-item')
let back = document.querySelector(".back");
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let ctx = canvas.getContext('2d')
ctx.strokeStyle = '#393b44'
ctx.lineWidth = 8

let historyData = [];
let hasChanged = false
let painting = false


// 判断 PC 或 移动设备
let isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        saveData(this.firstDot);
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
        this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        saveData(this.firstDot);
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
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.closePath();
    ctx.stroke();
    hasChanged = true
}

// options style
window.onload = function () {
    let index = 0;
    for (let i = 0; i < optionsItems.length; i++) {
        optionsItems[i].addEventListener('mousedown', () => {
            optionsItems[index].classList.remove('active')
            index = i
            optionsItems[i].classList.add('active')
        }, false)
    }
}
// 更改颜色
window.onload = function () {
    let index = 0;
    for (let i = 0; i < colorItems.length; i++) {
        colorItems[i].addEventListener('mousedown', () => {
            colorItems[index].classList.remove('color-active')
            index = i
            colorItems[i].classList.add('color-active')
        }, false)
    }
}
for (let i = 0; i < colorItems.length; i++) {
    colorItems[i].addEventListener('click', () => {
        console.log(1)
        ctx.strokeStyle = colorItems[i].style.backgroundColor
    }, false)
}



// 更改粗细
inputRange.addEventListener('change', () => {
    ctx.lineWidth = inputRange.value
}, false)

// 下载
downloadButton.addEventListener('click', () => {
    let imgUrl = canvas.toDataURL("image/png");
    let saveA = document.createElement("a");
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = "img" + (new Date).getTime();
    saveA.target = "_blank";
    saveA.click();
    hasChanged = false
}, false)

// 擦除整块
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

// 未保存提示
window.onbeforeunload = () => {
    if (hasChanged)
        return "放弃当前未保存内容而关闭页面？";
}

canvas.ontouchstart = function (e) {
    // 在这里储存绘图表面

}



function saveData(data) {
    (historyData.length === 10) && (historyData.shift()); // 上限为储存10步，太多了怕挂掉
    historyData.push(data);
}
back.addEventListener('click', () => {
    if (historyData.length < 1) return false;
    ctx.putImageData(historyData[historyData.length - 1], 0, 0);
    historyData.pop()
}, false)


