import Swal from 'sweetalert2/dist/sweetalert2.js';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  input: document.getElementById('date-selector'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
  textField: document.querySelector('.timer'),
};

// Слушатели событий
refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartBtnPush);
refs.input.addEventListener('change', onDateSelect);

//  класс Timer (выполняет только рассчет даты/времени)
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const selectedDate = Date.parse(refs.input.value);
    this.isActive = true;

    const stopBtn = document.createElement('button');
    stopBtn.classList.add('btn');
    stopBtn.setAttribute('data-stop', '');
    stopBtn.textContent = 'Stop countdown';
    refs.textField.after(stopBtn);

    this.intervalId = setInterval(() => {
      const deltaTime = selectedDate - Date.now();
      // console.log(deltaTime);
      const timeToCount = this.convertMs(deltaTime);

      // ссылка на функцию updateDateFace
      this.onTick(timeToCount);
    }, 1000);

    stopBtn.addEventListener('click', () => {
      this.stop();
      stopBtn.remove();
    });
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    refs.secs.classList.remove('countdown-started');
  }

  // Изменяет формат на "хх:хх:хх:хх"
  pad(value) {
    return String(value).padStart(2, '0');
  }

  // Конвертирует формат даты/времени
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }
}

// Реакция на выбор даты в прошлом
function onDateSelect() {
  const selectedDate = Date.parse(refs.input.value);
  const currentDate = Date.now();

  if (selectedDate < currentDate) {
    Swal.fire('Please choose a date in the future');
    refs.startBtn.setAttribute('disabled', true);
  } else {
    refs.startBtn.removeAttribute('disabled', true);
  }
}

// Реакция на нажатие кнопки 'Start Countdown'
function onStartBtnPush() {
  const selectedDate = Date.parse(refs.input.value);
  const currentDate = Date.now();

  if (refs.secs.classList.contains('countdown-started')) {
    Swal.fire(`Oops!) Please push "Stop coutdown" first`);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please push "Stop coutdown" first',
      footer: '<a href="">Why do I have this issue?</a>',
    });
  } else if (selectedDate > currentDate && selectedDate !== NaN) {
    timer.start();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Countdown started',
      showConfirmButton: false,
      timer: 1000,
    });
  }
}

// Добавляет в разметку данные
function updateDateFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${minutes}`;
  refs.secs.textContent = `${seconds}`;
  refs.secs.classList.add('countdown-started');
}

// Экземпляр класса Timer
const timer = new Timer({
  onTick: updateDateFace,
});
