// change document background color function
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

// base element link
const elementLink = {
    startButton: document.querySelector('[data-start]'),
    stopButton: document.querySelector('[data-stop]'),
    varOfTime: changeColor = null,
}

// first start element state function
function initPage() {
    elementLink.stopButton.disabled = true;
    elementLink.startButton.disabled = false;
}

initPage();

// body events handler
const buttonEvent = function(evt) {
 
    // if the START button is pressed
    if(evt.target.hasAttribute('data-start')) {
        elementLink.startButton.disabled = true;
        elementLink.stopButton.disabled = false;
        // set interval
        elementLink.varOfTime = setInterval(() => {
            document.body.style.backgroundColor = `${getRandomHexColor()}`;
        }, 1000)
        return;
    }

    // clear interval, when the STOP button is pressed
    clearInterval(elementLink.varOfTime);
    initPage();
}

// event listener for <body>
document.body.addEventListener('click', buttonEvent);
