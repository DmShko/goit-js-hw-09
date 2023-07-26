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

  const { elements: { step , delay, amount} } = elementSet.fatherElement;

  if(evt.target.getAttribute("name") === 'step') {
    createPromise(step.value , delay.value, amount.value);
  } 
  if(evt.target.getAttribute("name") === 'delay'){
    createPromise(step.value , delay.value, amount.value);
  }
  if(evt.target.getAttribute("name") === 'amount'){
    createPromise(step.value , delay.value, amount.value);
  }
};

elementSet.fatherElement.addEventListener('input', debounce._.debounce(inputEvent, 500, {trailing: true}))

function createPromise(position, delay, amount) {
  console.log(position, delay, amount);
  let promSet = [];

  const shouldResolve = Math.random() > 0.3;
  
  for(let i=0; i < amount; i += 1) {
    promSet.push(new Promise((resolve, reject) => {
      setTimeout(()=> {
        if (shouldResolve) {
          // Fulfill
          resolve(`Fulfilled promise ${position} in ${delay} ms`);
        } else {
          // Reject
          reject(`Rejected promise ${position} in ${delay} ms`);
        }
      }, delay)
      
    }));
  }
  
  console.log(promSet);

  promSet[0].then(result => {
    console.log(result);
  }
  ).catch(error => {
    console.log(error)
  });
    
}

