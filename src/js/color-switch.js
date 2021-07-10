const colors = ['#FFFFFF', '#2196F3', '#4CAF50', '#FF9800', '#009688', '#795548'];

const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button.btn-start'),
  stop: document.querySelector('button.btn-stop'),
};
let changeColorTimer = null;

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const onStartBtnClick = () => {
  refs.start.setAttribute('disabled', true);
  changeColorTimer = setInterval(() => {
    let randomColor = colors[randomIntegerFromInterval(0, colors.length - 1)];
    refs.body.style.backgroundColor = randomColor;
  }, 1000);
};

const onStopBtnClick = () => {
  refs.start.removeAttribute('disabled');
  clearInterval(changeColorTimer);
};

refs.start.addEventListener('click', onStartBtnClick);
refs.stop.addEventListener('click', onStopBtnClick);
