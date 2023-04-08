import Notiflix from 'notiflix';

const firstDelayRef = document.querySelector('[name="delay"]');
const delayStepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');
const submitBtnRef = document.querySelector('.form');
submitBtnRef.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();
  if (amountRef.value === 0) {
    return;
  }
  setTimeout(() => {
    createPromise(1, Number(firstDelayRef.value))
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    let delay = Number(firstDelayRef.value) + Number(delayStepRef.value);
    let position = 2;
    const intervalID = setInterval(() => {
      if (position > Number(amountRef.value)) {
        clearInterval(intervalID);
        console.log('stopped');
        return;
      }
      createPromise(position, delay)
        .then(() => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(() => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      position += 1;
      delay += Number(delayStepRef.value);
    }, Number(delayStepRef.value));
  }, Number(firstDelayRef.value));
}

function createPromise(position, delay) {
  console.log('createPromise ', 'position:', position, 'delay:', delay);
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve();
    } else {
      reject();
    }
  }, delay);
  return promise;
}
