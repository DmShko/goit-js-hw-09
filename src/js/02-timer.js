import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const elementSet = {
  daysElement: document.querySelector('[data-days]'),
  hoursElement: document.querySelector('[data-hours]'),
  minutesElement: document.querySelector('[data-minutes]'),
  secondsElement: document.querySelector('[data-seconds]'),
  inputElement: document.querySelector("#datetime-picker"),
  buttonElement: document.querySelector('[data-start]'),
};


let selectDateVar= null;
elementSet.buttonElement.disabled = true;


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

// add "0", if data length - "1"
function addLeadingZero(value) {

  return value.toString().padStart(2, 0);
}

const start = function () {

  // make setInterval
  let int = setInterval(() => {
    
    // calculate the difference select and current dates
    let diffDate = Math.abs(Date.parse(selectDateVar) - Date.parse(new Date()));
  
    // reset timer
    if(diffDate === Date.parse(new Date())) {
      clearInterval(int);
      elementSet.buttonElement.disabled = true;
    }

    // get the cell of date
    let convertResult = convertMs(diffDate);

    // out result 
    elementSet.daysElement.textContent = convertResult.days < 10 ? addLeadingZero(convertResult.days) : convertResult.days;
    elementSet.hoursElement.textContent = convertResult.hours < 10 ? addLeadingZero(convertResult.hours) : convertResult.hours;
    elementSet.minutesElement.textContent = convertResult.minutes < 10 ? convaddLeadingZeroertMs(convertResult.minutes) : convertResult.minutes;
    elementSet.secondsElement.textContent = convertResult.seconds < 10 ? addLeadingZero(convertResult.seconds) : convertResult.seconds;

    
  }, 1000)
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function onClose(selectedDates) {

    if(Date.parse(selectedDates) - Date.parse(new Date()) > 0) {
      elementSet.buttonElement.disabled = false;
      selectDateVar = selectedDates;
    }
  },
};

flatpickr(elementSet.inputElement, options);

// add button's event
elementSet.buttonElement.addEventListener('click', start);