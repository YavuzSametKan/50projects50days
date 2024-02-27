const rangeInputs = {
    red: document.querySelector('.red'),
    green: document.querySelector('.green'),
    blue: document.querySelector('.blue'),
    alpha: document.querySelector('.alpha')
}
const hexInput = document.querySelector('.hex-code input')
const changeColorBtn = document.querySelector('#change-color')
const copyHexBtn = document.querySelector('#copy-hex')

if(!localStorage.getItem('rgba'))
    localStorage.setItem('rgba', '255,255,255,1')

const setBg = () => document.body.style.background = `rgba(${localStorage.getItem('rgba')})`
setBg()

const hexToRgba = hex => {
    if (hex.length < 6 || hex.length > 8) {
        alert('6 to 8 characters must be entered.')
        return false;
    }
    if (!/^[0-9a-fA-F]+$/.test(hex)) {
        alert('Can only contain letters (a,b,c,d,e,f) and numbers.')
        return false;
    }
    const lastTwoCharacters = hex.slice(-2)
    if (isNaN(parseInt(lastTwoCharacters, 16))) {
        alert('last two characters must contain numbers only.')
        return false;
    }

    const [redHex,greenHex,blueHex,alphaHex] = hex.match(/.{2}/g)
    return {
        red: parseInt(redHex, 16),
        green: parseInt(greenHex, 16),
        blue: parseInt(blueHex, 16),
        alpha: parseInt(alphaHex, 16)
    }
}

const rgbaToHex = rgbaObj => {
    const r = parseInt(rgbaObj.red)
    const g = parseInt(rgbaObj.green)
    const b = parseInt(rgbaObj.blue)

    if( (r < 0 || r > 255) ||
        (g < 0 || g > 255) ||
        (b < 0 || b > 255)
    ){
        console.error(new Error('The rgb values entered must be between 0 and 255'))
        return false
    }

    let a = parseFloat(rgbaObj.alpha);
    if (isNaN(a) || a < 0 || a > 1){
        console.error(new Error('The alpha value must be at most 1.'))
        return false
    }

    a = Math.round(a * 255)

    const toHex = (c) => {
        const hex = c.toString(16)
        return hex.length == 1 ? '0' + hex : hex
    };

    const hex = toHex(r) + toHex(g) + toHex(b) + toHex(a)

    return hex
}

Object.values(rangeInputs).forEach(range => {
    range.addEventListener('input', ()=>{
        const rgba = {
            red: rangeInputs.red.value,
            green: rangeInputs.green.value,
            blue: rangeInputs.blue.value,
            alpha: rangeInputs.alpha.value
        }
        const rgbaText = `${rgba.red},${rgba.green},${rgba.blue},${rgba.alpha}`
        hexInput.value = rgbaToHex(rgba)
        localStorage.setItem('rgba', rgbaText)
        setBg()
    })
})

changeColorBtn.addEventListener('click', ()=>{
    const hex = hexInput.value
    const rgba = hexToRgba(hex)
    const rgbaText = `${rgba.red},${rgba.green},${rgba.blue},${rgba.alpha}`
    localStorage.setItem('rgba', rgbaText)
    setBg()
    rangeInputs.red.value = rgba.red
    rangeInputs.green.value = rgba.green
    rangeInputs.blue.value = rgba.blue
    rangeInputs.alpha.value = rgba.alpha
})

copyHexBtn.addEventListener('click', ()=> {
    const hex = "#" + hexInput.value
    navigator.clipboard.writeText(hex)
    .then(function() {
        alert("Hex Code Copied: " + hex);
    })
    .catch(function(err) {
        console.error('An error occurred while copying text: ', err);
    })
})

