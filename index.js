const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const DEFAULT_MINUTES = 25;

function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  if (Number.isInteger(saved) && saved >= MIN_MINUTES && saved <= MAX_MINUTES) {
    return saved;
  }
  return DEFAULT_MINUTES;
}

let remainingSeconds = getSavedMinutes() * 60;
let timerId = null;

const timeDisplay = document.getElementById("time-display");
const currentTimeDisplay = document.getElementById("current-time");

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (timerId !== null) {
    return;
  }

  timerId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }

    remainingSeconds -= 1;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getSavedMinutes() * 60;
  updateDisplay();
}

updateDisplay();
updateCurrentTime();
setInterval(updateCurrentTime, 1000);
