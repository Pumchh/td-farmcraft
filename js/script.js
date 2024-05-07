

function generateFields(){
    for(let i = 0; i < 25; i++){
        const field = document.createElement('field-part')
        field.classList.add('grass')
        document.querySelector('field-parts').appendChild(field)
    }
}


function attachToolsEvents(event1){
    const tools = document.querySelectorAll('tool')
    for(const tool of tools){
        tool.classList.toggle('active', tool === event1.target)
    }
}


function labourer(field){
    if(document.querySelector('#tool-hoe').classList.contains('active') && field.classList.contains('grass')){
        field.classList.remove('grass')
        field.classList.add('farmland')
    }

}

function arroser(field){
    if(document.querySelector('#tool-water').classList.contains('active') && field.classList.contains('farmland')){
        field.classList.add('hydrated')
    }
}

function semer(field){
    if(document.querySelector('#tool-sow').classList.contains('active') && (field.classList.contains('hydrated') || field.classList.contains('farmland'))){
        field.dataset.seed = 1
    }
}

function moissonner(field){
    if(document.querySelector('#tool-harvest').classList.contains('active') && field.classList.contains('hydrated')){
        if(field.dataset.seed == 7){
            document.getElementById('stock-wheat').textContent = Number(document.getElementById('stock-wheat').textContent) + 1
        }
        field.dataset.seed = 0
    }
}


function grow(){
    const fields = document.querySelectorAll('field-part')
    for(const field of fields){
        if(Math.random() <= 0.3 && field.classList.contains('hydrated')){
            if(field.classList.contains('hydrated') && 0 < field.dataset.seed && field.dataset.seed < 7){
                field.dataset.seed = Number(field.dataset.seed) + 1
            }
        } else if (Math.random() <= 0.05 && !field.classList.contains('hydrated')){
            if(0 < field.dataset.seed && field.dataset.seed < 7){
                field.dataset.seed = Number(field.dataset.seed) + 1
            }
        }
    }
    setTimeout(grow, 1000)
}

function keep_hydrated(){
    const fields = document.querySelectorAll('field-part')
    for(const field of fields){
        if(field.classList.contains('hydrated')){
            field.classList.remove('hydrated')
        }
    }
    setTimeout(keep_hydrated, 10000)
}

function dry(){
    const fields = document.querySelectorAll('field-part')
    for(const field of fields){
        if(field.dataset.seed == 0 && Math.random() <= 0.01){
            field.classList.remove('farmland')
            field.classList.add('grass')
        }
    }
    setTimeout(dry, 1000)
}

function farmEvent(){
    const fields = document.querySelectorAll('field-part')
    for(const field of fields){
        field.addEventListener('click', function(event){
            labourer(field)
            arroser(field)
            semer(field)
            moissonner(field)
        })
    }
}



window.addEventListener('load', generateFields)
window.addEventListener('load', grow)
window.addEventListener('load', keep_hydrated)
window.addEventListener('load', dry)
window.addEventListener('click', attachToolsEvents)
window.addEventListener('click', farmEvent)


