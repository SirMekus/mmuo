import { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword, postRequest } from "./EventCallbacks.js"

/**
 * Adds a istener for specific tags for elements that may not yet
 * exist.
 * @param selector the selector in form of tag (p, a, etc) or an ID or Class (e.g, ".form", "#alert", ".form .classTwo")
 * @param event the event to listen to. E.g, click, focus, etc
 * @param funct a function to run for the matched event
 */
function on(selector, event, funct) {
    /**
     * Set up interval to check for new items that do not
     * have listeners yet. This will execute every 1/10 second and
     * apply listeners to
     */
    setInterval(function () {
        var selectors = selector.split(" ");

        for (var i = 0; i < selectors.length; i++) {
            document.querySelectorAll(selectors[i]).forEach(function (currentValue, currentIndex, listObj) {
                if(!listObj[currentIndex].getAttribute(`data-event-${event}`)){
                    let boundedFunc = funct.bind(listObj[currentIndex])
                    listObj[currentIndex].addEventListener(event, boundedFunc);
                    listObj[currentIndex].setAttribute(`data-event-${event}`, event);
                }
            });
        }
    }, 1000);
}

function togglePasswordVisibilityEvent(){
    on(".password-visibility", "click", togglePasswordVisibility);
}

function checkIfPasswordsMatchEvent(){
    on(".password-checker", "focusout", checkIfPasswordsMatch);
}

function generatePasswordEvent(){
    on(".gen-password", "click", generatePassword);
}

function postRequestEvent(){
    on("#form .form", "submit", postRequest);
}

function defaultEventListeners() {

    togglePasswordVisibilityEvent()

    checkIfPasswordsMatchEvent()

    generatePasswordEvent()

    postRequestEvent()
}

export { defaultEventListeners, on, togglePasswordVisibilityEvent, checkIfPasswordsMatchEvent, generatePasswordEvent,postRequestEvent };