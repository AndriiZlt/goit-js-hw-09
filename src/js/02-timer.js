startBtnRef = document.querySelector('[data-start]');
inputDateRef = document.querySelector('#datetime-picker');
daysRef = document.querySelector('[data-days]');
hoursRef = document.querySelector('[data-hours]');
minsRef = document.querySelector('[data-minutes]');
secsRef = document.querySelector('[data-seconds]');

inputDateRef.addEventListener('change', onDateInput);
startBtnRef.addEventListener('click', onStartClick);
startBtnRef.setAttribute('disabled', '');

let isActive = false;
let intervalID = null;

function onDateInput() {
  const today = new Date();
  const goalDate = new Date(inputDateRef.value);
  if (goalDate <= today) {
    Swal.fire({
      title: 'Error!',
      text: 'Please choose a date in the future!',
      icon: 'error',
      confirmButtonText: 'Cool',
    });
    // alert('Please choose a date in the future!');
    return;
  }
  startBtnRef.removeAttribute('disabled', '');
  m;
}

function onStartClick() {
  clearInterval(intervalID);
  const goalDate = new Date(inputDateRef.value);
  intervalID = setInterval(() => {
    const { diffInDays, diffInHours, diffInMin, diffInSec } =
      getTimeDifference(goalDate);
    clockUpdate(diffInDays, diffInHours, diffInMin, diffInSec);
  }, 1000);
}

function clockUpdate(days, hours, mins, secs) {
  daysRef.textContent = pad(days);
  hoursRef.textContent = pad(hours);
  minsRef.textContent = pad(mins);
  secsRef.textContent = pad(secs);
  // console.log(days, hours, mins, secs);
}

function getTimeDifference(end) {
  const start = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;
  const oneMin = 1000 * 60;
  const diffInTime = end - start;
  const diffInDays = Math.floor(diffInTime / oneDay);
  const diffInHours = Math.floor((diffInTime - diffInDays * oneDay) / oneHour);
  const diffInMin = Math.floor(
    (diffInTime - diffInDays * oneDay - diffInHours * oneHour) / oneMin
  );
  const diffInSec = Math.floor(
    (diffInTime -
      diffInDays * oneDay -
      diffInHours * oneHour -
      diffInMin * oneMin) /
      1000
  );
  return { diffInDays, diffInHours, diffInMin, diffInSec };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
