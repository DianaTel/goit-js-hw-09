// // Описаний в документації
// import flatpickr from "flatpickr";
// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate = new Date();
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notify.failure(`Please choose a date in the future`);
      // alert ("Please choose a date in the future");
      btn.setAttribute('disabled', '');
      return;
    }
    btn.removeAttribute('disabled');
    //   console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
  },
};

// Otherwise, selectors are also supported
flatpickr('#datetime-picker', options);

let interval = 0;

const btn = document.querySelector('button[data-start]');
btn.addEventListener('click', () => {
  if (interval && !btn.hasAttribute('disabled')) {
    return;
  }
  interval = setInterval(() => {
    const diff = selectedDate.getTime() - Date.now();
    if (diff < 0) {
      clearInterval(interval);
      document.querySelector('span[data-days]').innerHTML = '00';
      document.querySelector('span[data-hours]').innerHTML = '00';
      document.querySelector('span[data-minutes]').innerHTML = '00';
      document.querySelector('span[data-seconds]').innerHTML = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    document.querySelector('span[data-days]').innerHTML = days
      .toString()
      .padStart(2, '0');
    document.querySelector('span[data-hours]').innerHTML = hours
      .toString()
      .padStart(2, '0');
    document.querySelector('span[data-minutes]').innerHTML = minutes
      .toString()
      .padStart(2, '0');
    document.querySelector('span[data-seconds]').innerHTML = seconds
      .toString()
      .padStart(2, '0');
    //    console.log(1);
  }, 1000);
});

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
