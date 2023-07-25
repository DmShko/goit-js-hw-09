import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const elementSet = {
    daysElement: document.querySelector('[data-days]'),
    hoursElement: document.querySelector('[data-hours]'),
    minutesElement: document.querySelector('[data-minutes]'),
    secondsElement: document.querySelector('[data-seconds]'),
    inputElement: document.querySelector("#datetime-picker"),
};

function addZero(data) {
  if(data.length === 1) {
    return "0" + data;
  }
  return data;
}

let time = function(data) {

  const currentDays = elementSet.daysElement
  const currentHourse = elementSet.hoursElement;
  const currentMinutes = elementSet.minutesElement;
  const currentSeconds = elementSet.secondsElement;

  let diffDate = Date.parse(data) - Date.parse(new Date());

  let seconds = Math.abs(Math.floor(diffDate / 1000) % 60);
  let minutes = Math.abs(Math.floor(diffDate / 1000 / 60) % 60); 
  let hours = Math.abs(Math.floor((diffDate / 1000 / 60 / 60) % 24));  
  let days = Math.abs(Math.floor(diffDate / 1000 / 60 / 60 / 24));  

  currentDays.textContent = days < 10 ? "0" + days : days;
  currentHourse.textContent = hours < 10 ? "0" + hours : hours;
  currentMinutes.textContent = minutes < 10 ? "0" + minutes : minutes;
  currentSeconds.textContent = seconds < 10 ? "0" + seconds : seconds;

  console.log(Math.abs(days), Math.abs(hours), Math.abs(minutes), Math.abs(seconds));
  // currentHourse.textContent = 23 - (countHours - dataHours);
  // currentMinutes.textContent = 59 - (countMinutes - dataMinutes);
  // currentSeconds.textContent = 59 - (Math.abs(dataSeconds - countSeconds));

  // console.log(`${23 - (countHours - dataHours)} : ${59 - (countMinutes - dataMinutes)} : ${59 - (countSeconds - dataSeconds)}`);

  // if(currentDays.textContent === "00") {
  //   currentDays.textContent = ((options.defaultDate.getDate().toString() - data.split("-")[2].split(" ")[0]) - 1);
  // } 

  // if(currentHourse.textContent === "00") {
  //   currentHourse.textContent = (options.defaultDate.getDate().toString() - data.split("-")[2].split(" ")[0]) * 24;
  // } 
  
  // if(currentMinutes.textContent === "00") {
  //   currentMinutes.textContent = "03";
    
  // } else {
  //   currentMinutes.textContent = addZero(currentMinutes.textContent);
  // }

  // if(currentSeconds.textContent === "00") {
  //   currentSeconds.textContent = "03";
  //   currentMinutes.textContent -= 1
  //   currentMinutes.textContent = addZero(currentMinutes.textContent);
  // } else {
  //   currentSeconds.textContent -= 1;
  //   currentSeconds.textContent = addZero(currentSeconds.textContent);
  // }

}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: function onClose(selectedDates) {
      console.log(Date.parse(selectedDates));
      // const NEW_SECONDS = new Date().getSeconds();
      // const NEW_MINUTES = new Date().getMinutes();
      // const NEW_HOURS = new Date().getHours();
      setInterval(time, 1000, selectedDates);
    },
  };


const calendar = flatpickr(elementSet.inputElement, options);

// elementSet.hoursElement.textContent = calendar[0];

// console.log(options.defaultDate.getDate().toString());
// console.log();