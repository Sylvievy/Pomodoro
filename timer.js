const timerDisplay = document.getElementById('timer');
const playPauseBtn = document.getElementById('playPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const sessionBtn = document.querySelectorAll('.session-duration-button');
const customBtn = document.querySelector('.custom');

const typewriterClickSound = document.getElementById('typewriterClickSound');
const dingSound = document.getElementById('dingSound');
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
    playSound(typewriterClickSound);

    intervalID = setInterval(() => {
        totalSeconds--;

        if (totalSeconds < 0) {
            clearInterval(intervalID);
            timerDisplay.textContent="00:00";
            playSound(dingSound);
            
            // alert("Time's up!");
            // isPaused = true;
            // playPauseBtn.textContent = 'play';

            if (isBreak){
                //break ended;new session
                isBreak = false;
                totalSeconds = currentSessionDuration;
                updateDisplay();
                // alert("Break time is over! Back to work.");
                startTimer();
            }else{
                //session ended; start break
                sessionCount++;
                isBreak = true;
                if (sessionCount % 4 === 0) {
                    totalSeconds = longBreakTime; 
                    // alert("Time for a long break!");
                } else {
                    playSound(dingSound);
                    totalSeconds = breakTime;

                    // alert("Time for a break!");
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
    console.log(`Timer started  for ${totalseconds/60} minutes}`)
};

const pauseTimer = () => {
    clearInterval(intervalID);
    isPaused = true;
    playPauseBtn.textContent = 'play';
    console.log(`Timer paused. `);
    playSound(typewriterClickSound);
};

const resetTimer = () => {
    clearInterval(intervalID);
    totalSeconds = currentSessionDuration;
    isPaused = true;
    isBreak = false;
    updateDisplay();
    playPauseBtn.textContent = 'play';
    playSound(typewriterClickSound);
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
                playSound(typewriterClickSound);
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
                playSound(typewriterClickSound);
                console.log(`Custom session duration set to ${duration} minutes.`);
            } else {
                alert("Please enter a valid positive number.");
            }
        }
    });
});

