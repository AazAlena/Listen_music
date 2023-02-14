let container = document.querySelector(`.album`);
let playlist = document.querySelector(`.playlist`);

let search = new URLSearchParams(window.location.search); 
let i = search.get(`i`);

let album = albums[i];
if(!album){
    container.innerHTML = `Ошибка`
    setTimeout(() => {
        window.location.pathname = `index.html`

    }, 5000);
} else{

    container.innerHTML = `
                    <div class="card mb-3">
                        <div class="row">
                            <div class="col-4">
                                <img src="${album.img}" alt="" class="img-fluid rounded-start">
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h5 class="card-title">${album.title}</h5>
                                    <p class="card-text">${album.description}</p>
                                    <p class="card-text"><small class="text-muted">${album.year}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
    `



    let tracks = album.tracks;
    for(i = 0; i<tracks.length; i++){
        let track = tracks[i]
        playlist.innerHTML += `
            <li class="track list-group-item d-flex align-items-center">
                <img src="assets/1.png" alt="" height = "30px" class="img-pause me-3">
                <img src="assets/2.jpg" alt="" height = "30px" class="img-play me-3 d-none">
                // <div class="progress">
                //     <div class="progress-bar" role="progressbar" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100"></div>
                // </div>
                <div>
                    <div>${track.title}</div>
                    <div>${track.author}</div>
                </div>
                <audio class = "audio" src="${track.src}"> музикака </audio>
                <div class="ms-auto time">${track.time}</div>
            </li>
        `
    }

    function setupAudio() {
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.track`); 
        let tracks = album.tracks;
        for (let i = 0; i < trackNodes.length; i++) { 
            // Один элемент
            let node = trackNodes[i];  
            let timeNode = node.querySelector(`.time`);
            // Тег аудио внутри этого элемента
            let audio = node.querySelector(`.audio`); 
            let track = tracks[i]
            // продолжи самостоятельно
            let imgPause = node.querySelector(`.img-pause`);
            let imgPlay = node.querySelector(`.img-play`);
            node.addEventListener(`click`, function () {
                // Если трек сейчас играет...
                if (track.isPlaying) {
                    track.isPlaying = false;
                    // Поставить на паузу
                    audio.pause();
                    imgPause.classList.remove(`d-none`);
                    imgPlay.classList.add(`d-none`);
                // Если трек сейчас не играет...
                } else {
                    track.isPlaying = true;
                    // Включить проигрывание
                    audio.play();
                    imgPause.classList.add(`d-none`);
                    imgPlay.classList.remove(`d-none`);
                    updateProgress()
                }
            });
            function updateProgress() {
                // Нарисовать актуальное время
                let time = getTime(audio.currentTime);
                if (time != timeNode.innerHtml){
                    timeNode.innerHTML =time;
                }
                // Нужно ли вызвать её ещё раз?
                if (track.isPlaying) {
                      requestAnimationFrame(updateProgress);
                }
                
              }
        }
    }
    setupAudio();
    
    function getTime(time){
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds/60);
        let seconds = Math.floor(currentSeconds%60);
        if (minutes<10) {
            minutes = `0` + minutes;
        }
        if (seconds<10) {
            seconds = `0` + seconds;
        }

        return `${minutes}:${seconds}`
    }
}



