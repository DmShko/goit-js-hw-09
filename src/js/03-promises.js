import debounce from 'lodash';
import Notiflix from 'notiflix';

// most elements
const elementSet = {
  fatherElement: document.querySelector('.form'),
  imputDelayElement: document.querySelector('[name="delay"]'),
  imputStepElement: document.querySelector('[name="step"]'),
  imputAmountElement: document.querySelector('[name="amount"]'),
  imputSubmitElement: document.querySelector("button"),
  currentDelay: null,
  currentStep: null,
  currentAmount: null,
};

// disable button
elementSet.imputSubmitElement.disabled = true;

// event handler
const inputEvent = function(evt) {

  evt.preventDefault();

  // gets fields values
  const { elements: { step , delay, amount } } = elementSet.fatherElement;

  // if fields is not empty then button disable is 'false'
  if(step.value > 0 && delay.value > 0 && amount.value >= 0) {
    
    elementSet.imputSubmitElement.disabled = false;

  } else {
    if(evt.type !== 'click') {
      elementSet.imputSubmitElement.disabled = true;
      if(step.value < 0 || delay.value < 0 || amount.value < 0)
        Notiflix.Notify.info("The value of all fields must be positive!",
        {
    width: '360px',
  },);
    } 
  }

  // if button is pressed
  if(evt.target.getAttribute("type") === 'submit') {
    
    for(let i=0; i <= (elementSet.currentAmount && (elementSet.currentAmount - 1)); i += 1) {
      elementSet.currentDelay += i && elementSet.currentStep;
      //promises enable
      createPromise(elementSet.currentDelay, i + 1)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`, {
          timeout: 5000,
          width: '360px',
        }, 
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`Rejected  promise ${position} in ${delay} ms`,
        {
          timeout: 5000,
          width: '360px',
        },
       );
      });
    }

    // to start over, when user click again
    getInputs();
  }

  function getInputs() {
    elementSet.currentDelay = Number(delay.value);
    elementSet.currentStep = Number(step.value);
    elementSet.currentAmount = Number(amount.value);
  }

  // input 'delay' event
  if(evt.target.getAttribute("name") === 'delay') {
    getInputs();
  }

  // input 'step' event
  if(evt.target.getAttribute("name") === 'step'){
    getInputs();
  }

  // input 'amount' event
  if(evt.target.getAttribute("name") === 'amount'){
    getInputs();
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