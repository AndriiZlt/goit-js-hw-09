const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');

stopBtnRef.setAttribute('disabled', '');

startBtnRef.addEventListener('click', onStartClick);
stopBtnRef.addEventListener('click', onStopClick);

let currentInterval = null;

function onStartClick() {
  currentInterval = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
  }, 1000);
  startBtnRef.setAttribute('disabled', '');
  stopBtnRef.removeAttribute('disabled', '');
}

function onStopClick() {
  clearInterval(currentInterval);
  startBtnRef.removeAttribute('disabled', '');
  stopBtnRef.setAttribute('disabled', '');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
