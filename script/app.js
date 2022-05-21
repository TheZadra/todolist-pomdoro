const btnStart = document.querySelector("#start");
const btnVolume = document.querySelector(".buttons-mute");
const btnSettings = document.querySelector("#btn-settings");
const settingsContainer = document.querySelector("#settingsContainer");

const showTimer = document.querySelector(".timer");

const sessionChoice = document.querySelector(".session");
const breakChoice = document.querySelector(".break");
const longBreakChoice = document.querySelector(".longBreak");

const times = [...document.querySelectorAll(".set")];

const audio = new Audio('./alarm.wav');

let session = 25;
let shortBreak = 5;
let longBreak = 15;

let currentTime = 25;

let counting;

let startFlag = true;
let sound = true;

let seconds;
let minutes;

const resetTimer = () => {
  btnStart.style.backgroundColor = "#3030A0";
  btnStart.style.color = "skyblue";
  btnStart.textContent = "start";
  document.title = "Time Manager";
  startFlag = true;
}

const startTime = () => {
  if (startFlag) {
    btnStart.style.backgroundColor = "#ff7b7b";
    btnStart.style.color = "#3030A0";
    btnStart.textContent = "stop";
   
    seconds = currentTime*60;
    minutes = currentTime-1;
    
    clock(seconds, minutes)

    startFlag = false;
  } else {
    clearInterval(counting);
    enterTime();
    resetTimer();
  }
}

const clock = (seconds, minutes) => {

   counting = setInterval(function () {
    seconds--

    if (seconds % 60 == 0) {
      minutes--
      console.log(minutes % 60)
    }

    if (minutes <= 9 && seconds % 60 <= 9) {
      showTimer.value = `0${minutes}:0${seconds%60}`;
      document.title = `[0${minutes}:0${seconds%60}] Time Manager`;
    } else if (seconds % 60 <= 9) {
      showTimer.value = `${minutes}:0${seconds%60}`;
      document.title = `[${minutes}:0${seconds%60}] Time Manager`;
    } else if (minutes <= 9) {
      showTimer.value = `0${minutes}:${seconds%60}`;
      document.title = `[0${minutes}:${seconds%60}] Time Manager`;
    } else {
      showTimer.value = `${minutes}:${seconds%60}`;
      document.title = `[${minutes}:${seconds%60}] Time Manager`;
    }

    if (seconds === 0) {
      clearInterval(counting);
      if(sound) {
        audio.play();
      } 
      

      if (currentTime <= 9) {
        showTimer.value = `0${currentTime}:00`;
      } else {
        showTimer.value = `${currentTime}:00`;
      }
      document.title = "Time Manager";
      btnStart.style.backgroundColor = "#3030A0";
      btnStart.style.color = "skyblue";
      btnStart.textContent = "start";
    }

  }, 1000)};
  

const volume = () => {
  if (sound) {
    console.log("off sound");
    document.querySelector(".btn-mute").style.display = "none";
    document.querySelector(".btn-unmute").style.display = "flex";
    sound = false;
  } else {
    console.log("on sound");
    document.querySelector(".btn-mute").style.display = "flex";
    document.querySelector(".btn-unmute").style.display = "none";
    sound = true;
  }
}

btnSettings.addEventListener('click', () => {
  settingsContainer.style.display = "flex";
  showTasks.style.display = "none";
});

document.querySelector(".fa-times").addEventListener('click', () => {
  settingsContainer.style.display = "none";
  showTasks.style.display = "flex";
});

const enterTime = () => {
  if (currentTime <= 9) {
    showTimer.value = `0${currentTime}:00`
  } else {
    showTimer.value = `${currentTime}:00`
  }
}

times.forEach(time => time.addEventListener('click', function () {
  currentTime = time.dataset.time;
  times.forEach(time => time.classList.remove("choice"));
  this.classList.add("choice");
  console.log(time);
  clearInterval(counting);
  resetTimer();
  enterTime()
}))

document.querySelector("#sessionSettings").addEventListener('input', function () {
  session = this.value;
  sessionChoice.dataset.time = this.value;

  if (sessionChoice.classList.contains("choice")) {
    currentTime = this.value;
    enterTime();
  }
})

document.querySelector("#breakSettings").addEventListener('input', function () {
  shortBreak = this.value;
  breakChoice.dataset.time = this.value;
  if (breakChoice.classList.contains("choice")) {
    currentTime = this.value;
    enterTime();
  }
})

document.querySelector("#longBreakSettings").addEventListener('input', function () {
  longBreak = this.value
  longBreakChoice.dataset.time = this.value;
  if (longBreakChoice.classList.contains("choice")) {
    currentTime = this.value;
    enterTime();
  }
})

btnStart.addEventListener('click', startTime);
btnVolume.addEventListener('click', volume);