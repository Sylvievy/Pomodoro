const timerDisplay = document.getElementById('timer');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const sessionBtn = document.querySelectorAll('.session-duration-button');
const customBtn = document.querySelector('.custom');

const typewriterClickSoundTimer = document.getElementById('typewriterClickSound');
const dingSoundTimer = document.getElementById('dingSound');
const stampSound = document.getElementById('stampSound');

let isPaused = true;
// let totalSeconds = 25*60;
let intervalID;
let currentSessionDuration = 25*60;
let isBreak = false;
let breakTime = 5*60;
let longBreakTime = 15*60;
let customTime = 0;
let sessionCount = 0;

const playSound = (soundElement) => {
    soundElement.pause();
    soundElement.currentTime = 0; 
    soundElement.play().catch(error => {
    console.error("Error playing sound:", error);
    });

}

const updateDisplay = () => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

}

const startTimer = () => {
    clearInterval(intervalID)
    isPaused = false;
    playPauseBtn.textContent = 'pause';
    playSound(typewriterClickSoundTimer);

    intervalID = setInterval(() => {
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(intervalID);
            timerDisplay.textContent="00:00";
            playSound(dingSoundTimer);
            
            // isPaused = true;
            // playPauseBtn.textContent = 'play';

            if (isBreak){
                //break ended;new session
                isBreak = false;
                totalSeconds = currentSessionDuration;
                updateDisplay();
                startTimer();
            }else{
                //session ended; start break
                sessionCount++;
                isBreak = true;
                if (sessionCount % 4 === 0) {
                    totalSeconds = longBreakTime; 
                } else {
                    playSound(dingSoundTimer);
                    totalSeconds = breakTime;

                }
                updateDisplay();
                startTimer();
            }
            isPaused = false;
            playPauseBtn.textContent = 'pause';
        }else{
            updateDisplay();
        }
    },1000);
    console.log(`Timer started  for ${totalSeconds/60} minutes`)
};

const pauseTimer = () => {
    clearInterval(intervalID);
    isPaused = true;
    playPauseBtn.textContent = 'play';
    console.log(`Timer paused. `);
    playSound(typewriterClickSoundTimer);
};

const resetTimer = () => {
    clearInterval(intervalID);
    totalSeconds = currentSessionDuration;
    isPaused = true;
    isBreak = false;
    updateDisplay();
    playPauseBtn.textContent = 'play';
    playSound(typewriterClickSoundTimer);
    console.log("Timer reset.");
};

document.addEventListener('DOMContentLoaded', () => {
    totalSeconds = currentSessionDuration; // Initialize with default session duration
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

    sessionBtn.forEach(button => {
        button.addEventListener('click', () =>{
            const duration = parseInt(button.dataset.duration);
            if (!isNaN(duration)) {
                currentSessionDuration = duration * 60;
                totalSeconds = currentSessionDuration;
                isBreak = false;
                clearInterval(intervalID);
                isPaused = true;
                playPauseBtn.textContent = 'play';
                updateDisplay();
                playSound(typewriterClickSoundTimer);
                console.log(`Session duration set to ${duration} minutes.`);
            }
        });
    });

    customBtn.addEventListener('click', () => {
        const customMinutes = prompt("Enter custom sesion duration in  minutes:");
        if (customMinutes !== null){
            const duration = parseInt(customMinutes);
            if (!isNaN(duration) && duration > 0) {
                currentSessionDuration = duration * 60;
                totalSeconds = currentSessionDuration;
                isBreak = false;
                clearInterval(intervalID);
                isPaused = true;
                playPauseBtn.textContent = 'play';
                updateDisplay();
                playSound(typewriterClickSoundTimer);
                console.log(`Custom session duration set to ${duration} minutes.`);
            } else {
                alert("Please enter a valid positive number.");
            }
        }
    });
});

