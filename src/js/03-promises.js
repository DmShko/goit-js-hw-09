import debounce from 'lodash';
import Notiflix from 'notiflix';

const elementSet = {
  fatherElement: document.querySelector('.form'),
  imputDelayElement: document.querySelector('[name="delay"]'),
  imputDelayElement: document.querySelector('[name="step"]'),
  imputDelayElement: document.querySelector('[name="amount"]'),
  imputDelayElement: document.querySelector("button"),
};

const inputEvent = function(evt) {

  evt.preventDefault();

  const { elements: { step , delay, amount } } = elementSet.fatherElement;

  if(evt.target.getAttribute("type") === 'submit') {
    
    if(step !== "" || delay !== "" || amount !== "") {
      for(let i=0; i < currentAmount; i += 1) {
        currentDelay += currentStep;
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
  } 

  if(evt.target.getAttribute("name") === 'delay') {
    currentDelay = Number(delay.value);
  }

  if(evt.target.getAttribute("name") === 'step'){
    currentStep = Number(step.value);
  }

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