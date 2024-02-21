const progressContainers = document.getElementsByClassName('progress-container')

Object.values(progressContainers).forEach(progressContainer => {
    const processesContainer = progressContainer.children[0]
    const processes = processesContainer.children
    const prevBtn = progressContainer.children[1].children[0]
    const nextBtn = progressContainer.children[1].children[1]

    // The first function to run when the page loads
    ;(()=>{
        // for assigning numbers to processes
        for(let i = 0; i < processes.length; i++){
            processes[i].textContent = (i + 1).toString();
        }

        // Determination of progress bar fillness when opening the page
        setProgressBarFillness(processesContainer)

        // If there is no process selected, select the first one
        if(indexOfStage(processes) === -1)
            processes[0].classList.add('selected')
        // If there is a phase selected when the page loads,
        // it adds the value 'selected' to the classList of all previous phases
        else{
            for(let i = indexOfStage(processes) - 1; i >= 0; i--)
                processes[i].classList.add('selected')
        }

        // Determining whether the previous and next buttons are disabled when opening the page
        if(indexOfStage(processes) === 0)
            btnDisabled(prevBtn)
        else if(indexOfStage(processes) === processes.length - 1)
            btnDisabled(nextBtn)
    })()

    prevBtn.addEventListener('click', ()=>{
        try{
            let currentProcessStage = processes[indexOfStage(processes)]
            currentProcessStage.classList.remove('selected')
        }catch (error){
            console.error(error)
        }

        if(indexOfStage(processes) === 0)
            btnDisabled(prevBtn)

        btnEnabled(nextBtn)
        setProgressBarFillness(processesContainer)
    })

    nextBtn.addEventListener('click', ()=>{
        try{
            const nextProcessStage = processes[indexOfStage(processes) + 1]
            nextProcessStage.classList.add('selected')
        }catch (error){
            console.error(error)
        }

        if(indexOfStage(processes) === processes.length - 1)
            btnDisabled(nextBtn)

        btnEnabled(prevBtn)
        setProgressBarFillness(processesContainer)
    })
})

// for finding the last selected process index
function indexOfStage(processes){
    for(let i = processes.length -1; i >= 0; i--){
       if(processes[i].classList.contains('selected'))
           return i
    }
    return -1
}

// for determining to progress bar fillness value
function setProgressBarFillness(progressContainer){
    const fillPercentage = 100 * indexOfStage(progressContainer.children) / (progressContainer.children.length - 1)
    progressContainer.style.setProperty('--progress-bar-fillness', `calc(${fillPercentage}%)`)
}

function btnDisabled(btn){
    btn.classList.add('disabled')
}

function btnEnabled(btn){
    btn.classList.remove('disabled')
}