const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;
const DEFAULT_MINUTES = 25;

const timerInput = document.getElementById("timer-input");
const confirmBtn = document.querySelector(".btn-confirm");

function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  if (Number.isInteger(saved) && saved >= MIN_MINUTES && saved <= MAX_MINUTES) {
    return saved;
  }
  return DEFAULT_MINUTES;
}

function isValidInput() {
  if (timerInput.value === "") {
    return false;
  }
  const value = Number(timerInput.value);
  return Number.isInteger(value) && value >= MIN_MINUTES && value <= MAX_MINUTES;
}

function updateConfirmBtnState() {
  confirmBtn.disabled = !isValidInput();
}

function saveSetting() {
  if (!isValidInput()) {
    return;
  }
  localStorage.setItem(STORAGE_KEY, timerInput.value);
  location.href = "index.html";
}

timerInput.min = MIN_MINUTES;
timerInput.max = MAX_MINUTES;
timerInput.value = getSavedMinutes();

timerInput.addEventListener("input", updateConfirmBtnState);
confirmBtn.addEventListener("click", saveSetting);

updateConfirmBtnState();
