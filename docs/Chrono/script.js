let timer;
let elapsedTime = 0;
let isRunning = false;
let startTime = 0;

const chronoDisplay = document.querySelector('.chrono-display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const totalMilliseconds = elapsedTime;
    const hours = String(Math.floor(totalMilliseconds / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((totalMilliseconds % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((totalMilliseconds % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(totalMilliseconds % 1000).padStart(3, '0');
    chronoDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startChrono() {
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseChrono() {
    isRunning = false;
    clearInterval(timer);
}

function resetChrono() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
}

startButton.addEventListener('click', startChrono);
pauseButton.addEventListener('click', pauseChrono);
resetButton.addEventListener('click', resetChrono);

updateDisplay();

//Horloge mondiale

const clock = document.getElementById('clock');
const timezoneSelect = document.getElementById('timezone-select');

const timezones = Intl.supportedValuesOf('timeZone');

timezones.forEach((timezone) => {
  const option = document.createElement('option');
  option.value = timezone;
  option.textContent = `${timezone}`;
  timezoneSelect.appendChild(option);
});


function updateClock() {
  const timezone = timezoneSelect.value;
  const now = new Date().toLocaleString('fr-FR', { timeZone: timezone });
  clock.textContent = `Heure locale : ${now}`;
}

setInterval(updateClock, 1000);

timezoneSelect.addEventListener('change', updateClock);

timezoneSelect.value = 'Europe/Paris';
updateClock();