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
                <img src="assets/1.png" alt="" height = "30px" class="me-3">
                <div>
                    <div>${track.title}</div>
                    <div>${track.author}</div>
                </div>
                <audio class = "audio" src="${track.src}"> музикака </audio>
                <div class="ms-auto">${track.time}</div>
            </li>
        `
    }

    function setupAudio() {
        // Найди коллекцию с треками
        let trackNodes = document.querySelectorAll(`.track`); 
        for (let i = 0; i < trackNodes.length; i++) { 
            // Один элемент
            let node = trackNodes[i];   
            // Тег аудио внутри этого элемента
            let audio = node.querySelector(`.audio`); 
    
            // продолжи самостоятельно
            let isPlaying = false;
            node.addEventListener(`click`, function () {
                // Если трек сейчас играет...
                if (isPlaying) {
                    isPlaying = false;
                    // Поставить на паузу
                    audio.pause();
    
                // Если трек сейчас не играет...
                } else {
                    isPlaying = true;
                    // Включить проигрывание
                    audio.play();
                }
            });
        }
    }
    setupAudio();
    
}



