const mainContainers = document.getElementsByClassName('main-container')

Object.values(mainContainers).forEach(container => {
    const imagesContainer = container.children[0]
    const imageList = imagesContainer.children
    let dots;

    if(container.children[1] && container.children[1].classList.contains('panning-box')) {
        const panningBox = container.children[1]
        const previousBtn = panningBox.children[0]
        dots = panningBox.children[1]
        const nextBtn = panningBox.children[2]

        // for dots addition
        for (let i = 0; i < imageList.length; i++) {
            const dot = document.createElement('span')
            dot.classList.add('dot')
            dots.appendChild(dot)
        }
        dots.children[searchIndexOfOpenImage(imageList)].classList.add('selected')

        previousBtn.addEventListener('click', () => {
            const currentOpenImageIndex = searchIndexOfOpenImage(imageList)
            closeImage(imageList[currentOpenImageIndex])
            dotHide(dots.children[currentOpenImageIndex])
            if (currentOpenImageIndex === 0) {
                openImage(imageList[imageList.length - 1])
                dotVisible(dots.children[imageList.length - 1])
            } else {
                openImage(imageList[currentOpenImageIndex - 1])
                dotVisible(dots.children[currentOpenImageIndex - 1])
            }
        })

        nextBtn.addEventListener('click', () => {
            const currentOpenImageIndex = searchIndexOfOpenImage(imageList)
            closeImage(imageList[currentOpenImageIndex])
            dotHide(dots.children[currentOpenImageIndex])
            if (currentOpenImageIndex === imageList.length - 1) {
                openImage(imageList[0])
                dotVisible(dots.children[0])
            } else {
                openImage(imageList[currentOpenImageIndex + 1])
                dotVisible(dots.children[currentOpenImageIndex + 1])
            }
        })

        let dotCount = dots.children.length;
        for(let i = 0; i < dotCount; i++){
            let currentDot = dots.children[i]
            currentDot.addEventListener('click', () => {
                dotHide(dots.children[searchIndexOfOpenImage(imageList)])
                closeImage(imageList[searchIndexOfOpenImage(imageList)])
                dotVisible(currentDot)
                openImage(imageList[i])

            })
        }
    }

    Object.values(imageList).forEach(image => {
        image.addEventListener('click', ()=> {
            dotHide(dots.children[searchIndexOfOpenImage(imageList)])
            closeImage(imageList[searchIndexOfOpenImage(imageList)])
            openImage(image)
            dotVisible(dots.children[searchIndexOfOpenImage(imageList)])
        })
    })
})

//for searching current open img
function searchIndexOfOpenImage(images){
    for(let i = 0; i < images.length; i++) {
        if (images[i].classList.contains('open'))
            return i
    }
    return -1
}

// for making the image smaller
function closeImage(openImage){
    openImage.classList.remove('open')
    openImage.classList.add('close')
}

// for making the image bigger
function openImage(closeImage){
    closeImage.classList.remove('close')
    closeImage.classList.add('open')
}

function dotVisible(dot){
    dot.classList.add('selected')
}

function dotHide(dot){
    dot.classList.remove('selected')
}

themeCheck()
function themeCheck() {
    // for startup theme
    const IsSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if(localStorage.getItem('theme'))
        document.body.className = localStorage.getItem('theme') === 'dark' ? 'dark' : ''
    else if(IsSystemThemeDark)
        document.body.className = 'dark'
    else
        document.body.className = ''

    const themeBtn = document.getElementById('theme-button')
    const icon = document.createElement('i')
    themeBtn.appendChild(icon)
    themeBtn.className = document.body.classList.contains('dark') ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
    themeBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        } else {
            document.body.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }
        themeBtn.className = document.body.classList.contains('dark') ? 'fa-solid fa-sun' :'fa-solid fa-moon'
    })
}