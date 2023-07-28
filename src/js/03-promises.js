import debounce from 'lodash';
import Notiflix from 'notiflix';

// most elements
const elementSet = {
  fatherElement: document.querySelector('.form'),
  imputDelayElement: document.querySelector('[name="delay"]'),
  imputStepElement: document.querySelector('[name="step"]'),
  imputAmountElement: document.querySelector('[name="amount"]'),
  imputSubmitElement: document.querySelector("button"),
};

// disable button
elementSet.imputSubmitElement.disabled = true;

// event handler
const inputEvent = function(evt) {

  evt.preventDefault();

  // gets fields values
  const { elements: { step , delay, amount } } = elementSet.fatherElement;

  // if fields is not empty then button disable is 'false'
  if(step.value !== "" && delay.value !== "" && amount.value !== "") {
    
    elementSet.imputSubmitElement.disabled = false;
  }

  // if button is pressed
  if(evt.target.getAttribute("type") === 'submit') {
    
    for(let i=0; i < currentAmount; i += 1) {
      currentDelay += currentStep;
      //promises enable
      createPromise(currentDelay, i + 1)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`, {
          timeout: 10000,
        },);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`Rejected  promise ${position} in ${delay} ms`,
        {
          timeout: 10000,
        },);
      });
    }
  }

  // input 'delay' event
  if(evt.target.getAttribute("name") === 'delay') {
    currentDelay = Number(delay.value);
  }

  // input 'step' event
  if(evt.target.getAttribute("name") === 'step'){
    currentStep = Number(step.value);
  }

  // input 'amount' event
  if(evt.target.getAttribute("name") === 'amount'){
    currentAmount = Number(amount.value);
  }

};

elementSet.fatherElement.addEventListener('input', debounce._.debounce(inputEvent, 500, {trailing: true}));
elementSet.fatherElement.addEventListener('click', inputEvent);

function createPromise(delay, position) {
  
  const shouldResolve = Math.random() > 0.3;

   return new Promise((resolve, reject) => {
      setTimeout(()=> {
        if (shouldResolve) {
          // Fulfill
          resolve({position, delay});
        } else {
          // Reject
          reject({position, delay});
        }
      }, delay)
      
    }); 
}