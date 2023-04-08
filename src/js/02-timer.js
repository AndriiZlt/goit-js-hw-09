import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

startBtnRef = document.querySelector('[data-start]');
inputDateRef = document.querySelector('#datetime-picker');
daysRef = document.querySelector('[data-days]');
hoursRef = document.querySelector('[data-hours]');
minsRef = document.querySelector('[data-minutes]');
secsRef = document.querySelector('[data-seconds]');

startBtnRef.addEventListener('click', onStartClick);
startBtnRef.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) <= Date.now()) {
      window.alert('Please choose a date in the future!');
      return;
    }
    startBtnRef.removeAttribute('disabled', '');
  },
};

flatpickr('#datetime-picker', options);

let isActive = false;
let intervalID = null;

function onStartClick() {
  clearInterval(intervalID);
  const goalDate = new Date(inputDateRef.value);
  intervalID = setInterval(() => {
    const diffInTime = goalDate - Date.now();
    console.log('diffInTime', diffInTime);
    if (diffInTime <= 0) {
      clearInterval(intervalID);
      console.log('stop');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(diffInTime);
    console.log(days, hours, minutes, seconds);
    clockUpdate(days, hours, minutes, seconds);
  }, 1000);
}

function clockUpdate(days, hours, mins, secs) {
  if (days > 99) {
    daysRef.textContent = days;
  } else {
    daysRef.textContent = pad(days, 2);
  }
  hoursRef.textContent = pad(hours, 2);
  minsRef.textContent = pad(mins, 2);
  secsRef.textContent = pad(secs, 2);
}

function pad(value, numOfDigits) {
  return String(value).padStart(numOfDigits, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
