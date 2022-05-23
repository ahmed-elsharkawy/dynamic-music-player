let audioPlayer = document.querySelector('audio');
let audioList = document.getElementById('audioList');
let currentAudio = document.getElementById('currentAudio');
let playButton = document.getElementById('playButton');
let repeatButton = document.getElementById('repeatButton');
let mixButton = document.getElementById('mixButton');
let uploadButton = document.getElementById('uploadButton');
let uploadFileInbut = document.getElementById('uploadFileInbut');

let existAudioList = [];

let playingMode = '';
let indexOfCurrentAudio = 0;
// displayNewAudio();


//----------  upload new Audio -----------
uploadButton.addEventListener('click', ()=>{
    uploadFileInbut.click();
})
uploadFileInbut.addEventListener('change', uploadNewAudio);
function uploadNewAudio(){
    let selectedFile = uploadFileInbut.files[0];
    let audioNameList = [];
    for(let i=0; i<existAudioList.length; i++){
        audioNameList.push(existAudioList[i].name);
    }    
    if(!audioNameList.includes(selectedFile.name)){
        existAudioList.push({src: `sounds/${selectedFile.name}`, name: selectedFile.name});
                displayNewAudio();
                directRunAudioByClick();
                directDeleteAudioByClick();
    }    
}
function displayNewAudio(){
    let items = '';
        for(let i=0; i<existAudioList.length; i++){
            items += `
                <div class="d-flex justify-content-between align-items-center w-75 mx-auto border rounded py-2 px-3 font-weight-bold my-2">
                    <span class="music-name px-1 overflow-hidden"><a href="#" class="text-secondary">Music Sample ${existAudioList[i].name}</a></span> 
                    <button class="btn px-2 border rounded font-weight-normal">
                        <a href="#" class="closeItem text-secondary">
                            <i class="fa-solid fa-xmark"></i>
                        </a>
                    </button> 
                </div>`;
        }
    
    audioList.innerHTML = items;
}

// -------------  event listining to RUN on Audio by clicking it directly -----------------
function directRunAudioByClick(){
    let audioListItems = document.querySelectorAll('#audioList div span a');
    for(let i=0; i<audioListItems.length; i++){
        audioListItems[i].addEventListener('click', ()=>{runNewAudio(i)})
    }
}

function runNewAudio(i){
    audioPlayer.src = existAudioList[i].src;
    audioPlayer.play();
    displaycurrentAudioName(i);
}

function displaycurrentAudioName(i){
    currentAudio.classList.remove('d-none');
    currentAudio.innerHTML = existAudioList[i].name;
}

let arr = [1, 2, 3]
let x = arr.slice(1, 3);
console.log(x)

// -------------  event listining to DELETE on Audio by clicking it directly -----------------
function directDeleteAudioByClick(){
    let closeItem = document.querySelectorAll('.closeItem');
    for(let i=0; i<existAudioList.length; i++){
        closeItem[i].addEventListener('click', deleteSelectedItem.bind(null, i), false)
    }
}
function deleteSelectedItem(i, e){
    let currentAudioContent = existAudioList[indexOfCurrentAudio]; 
    existAudioList = existAudioList.filter((item) => {return item != existAudioList[i]});
    indexOfCurrentAudio = existAudioList.indexOf(currentAudioContent);
    let outerDiv = e.target.closest('div');
    outerDiv.classList.remove('d-flex')
    outerDiv.classList.add('d-none')
    console.log(existAudioList);
}


// -------------  event listining to controle mode buttons -----------------
playButton.addEventListener('click', ()=>{
    playingMode = 'normal';
    runNewAudio(indexOfCurrentAudio);
});

repeatButton.addEventListener('click', ()=>{
    playingMode = 'repeat';
    runNewAudio(indexOfCurrentAudio);
});

mixButton.addEventListener('click', ()=>{
    playingMode = 'mix';
    runNewAudio(indexOfCurrentAudio);
})


// -------------  event listining to Ending the current Audio to detect Mode and select Next Audio-----------------
audioPlayer.addEventListener('ended', selectNextAudio)
function selectNextAudio(){
    switch (playingMode){
        case 'normal':
            runAudioNormalMode();
            break;
        case 'repeat':
            runNewAudio(indexOfCurrentAudio);
            break;
        case 'mix':
            runAudioMixMode();
            break;
    }
}

function runAudioNormalMode(){
    if(indexOfCurrentAudio == existAudioList.length-1){
        indexOfCurrentAudio = 0;
        runNewAudio(indexOfCurrentAudio);
    }else{
        indexOfCurrentAudio ++;
        runNewAudio(indexOfCurrentAudio);
    }
}

function runAudioMixMode(){
    let random = Math.round(Math.random() * (existAudioList.length -1));
    if(random == indexOfCurrentAudio){
        runAudioMixMode();
    }else{
        indexOfCurrentAudio = random;
        runNewAudio(indexOfCurrentAudio);
    }
}







