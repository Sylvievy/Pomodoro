const timerDisplay = document.getElementById('timer');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');

let isPaused = true;
let totalSeconds = 1500;
let intervalID;

const updateDisplconst timerDisplay = document.getElementById('timer');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');

let isPaused = true;
let totalSeconds = 24*60;
let intervalID;

const updateDisplay = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

}

const startTimer = () => {

    clearInterval(intervalID)
    isPaused = false;
    playPauseBtn.textContent = 'pause';

    intervalID = setInterval(() => {
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(intervalID);
            timerDisplay.textContent="00:00";
            alert("Time's up!");
            isPaused = true;
            playPauseBtn.textContent = 'play';
        }else{
            updateDisplay();
        }
    },1000);
    console.log("Timer started.")
};

const pauseTimer = () => {
    clearInterval(intervalID);
    isPaused = true;
    playPauseBtn.textContent = 'play';
    console.log("Timer paused.");
}

const resetTimer = () => {
    clearInterval(intervalID);
    totalSeconds =1500; // Reset to 1 minute
    isPaused = true;
    updateDisplay();
    playPauseBtn.textContent = 'play';
    console.log("Timer reset.");
};

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();

    if(isPaused){
        playPauseBtn.textContent = 'play';
    }else{
        playPauseBtn.textContent = 'pause';
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPaused) {
            startTimer();
        } else {
            pauseTimer();
        }
    });
    
    resetBtn.addEventListener('click', resetTimer);
});

ay = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

}

const startTimer = () => {

    clearInterval(intervalID)
    isPaused = false;
    playPauseBtn.textContent = 'Pause';

    intervalID = setInterval(() => {
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(intervalID);
            timerDisplay.textContent="00:00";
            alert("Time's up!");
            isPaused = true;
            playPauseBtn.textContent = 'Play';
        }else{
            updateDisplay();
        }
    },1000);
    console.log("Timer started.")
};

const pauseTimer = () => {
    clearInterval(intervalID);
    isPaused = true;
    playPauseBtn.textContent = 'Resume';
    console.log("Timer paused.");
}

const resetTimer = () => {
    clearInterval(intervalID);
    totalSeconds =1500; // Reset to 1 minute
    isPaused = true;
    updateDisplay();
    playPauseBtn.textContent = 'Play';
    console.log("Timer reset.");
};

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();

    if(isPaused){
        playPauseBtn.textContent = 'Play';
    }else{
        playPauseBtn.textContent = 'Pause';
    }

    playPauseBtn.addEventListener('click', () => {
        if (isPaused) {
            startTimer();
        } else {
            pauseTimer();
        }
    });
    
    resetBtn.addEventListener('click', resetTimer);
});

