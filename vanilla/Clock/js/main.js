const display = document.querySelector(".display");
display.innerHTML = '0:00:000'
// const initialValue = display.innerHTML;
const buttons = {
  reset: document.querySelector("#reset"),
  start: document.querySelector("#start"),
  lap: document.querySelector("#lap"),
};
let time = 0;
let offset = Date.now()
let timer;


const lapsDiv = document.querySelector('.laps')
const laps = []

buttons.reset.addEventListener("click", reset);

buttons.start.addEventListener("click", startPause);

buttons.lap.addEventListener("click", () => {
    addLap(display.innerHTML)
});

function startPause() {
  if (timer) {
    clearInterval(timer);
    offset = Date.now()
    timer = undefined;
  } else {
      time += Date.now() - offset;
    timer = setInterval(() => {
      updateDisplay();
    }, 1);
  }
}

function reset() {
  time = Date.now();
  updateDisplay();
  removeLaps();
}

function updateDisplay() {
  display.innerHTML = formatTime(new Date(new Date() - new Date(time)));
}

function formatTime(tTime) {
    const minutes = tTime.getMinutes();
    const seconds = tTime.getSeconds();
    const ms = tTime.getMilliseconds();

    const minStr = minutes < 10 ? '0' + minutes:minutes;
    const secStr = seconds < 10 ? '0' + seconds : seconds
    const msStr = ms < 10 ? '00' + ms : ms < 100 ? '0' + ms : ms;

    return `${minStr}:${secStr}:${msStr}`
}

reset();


function addLap(format) {
    const lapText = `#${laps.length + 1}: ${format}`;
    laps.push(lapText)
    const div = document.createElement('div')
    div.innerHTML = lapText;
    div.classList.add('lap')
    lapsDiv.appendChild(div)
}

function removeLaps() {
    laps.length = 0;
    while(lapsDiv.firstChild) {
        lapsDiv.removeChild(lapsDiv.firstChild)
    }
}
