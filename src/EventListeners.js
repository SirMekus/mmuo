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

/**
 * Sets up event listeners for form submission and calls the postRequest function.
 * It also prevents the default form submission behavior and allows for custom configuration.
 *
 * @param {Object} [config=null] - Optional configuration object for the postRequest function.
 * @param {Function} [config.start] - Function to be called before the postRequest starts.
 * @param {Function} [config.success] - Function to be called if the postRequest is successful.
 * @param {Function} [config.error] - Function to be called if the postRequest encounters an error.
 * @param {Function} [config.end] - Function to be called after the postRequest ends.
 *
 * @returns {void}
 */
function postRequestEvent(config=null){
    on('#form .form', 'submit', function(event)  {
        event.preventDefault();
        postRequest.call(this, event, config);
    });
}

/**
 * Initializes default event listeners for various UI elements.
 *
 * This function sets up the following event listeners:
 * - Toggles password visibility when the associated button is clicked.
 * - Checks if passwords match when focus is lost from the relevant input field.
 * - Generates a password when the generate button is clicked.
 * - Intercepts form submission to handle it via AJAX post request.
 *
 * @returns {void}
 */

function defaultEventListeners() {

    togglePasswordVisibilityEvent()

    checkIfPasswordsMatchEvent()

    generatePasswordEvent()

    postRequestEvent()
}

export { defaultEventListeners, on, togglePasswordVisibilityEvent, checkIfPasswordsMatchEvent, generatePasswordEvent,postRequestEvent };