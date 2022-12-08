import { triggerFileChanger, uploadImage, removeImage } from "./ImageUpload.js";
import { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword, alertBeforeRunning, openAsModal, getRequest, postRequest } from "./EventCallbacks.js"

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
                    listObj[currentIndex].addEventListener(event, funct);
                    listObj[currentIndex].setAttribute(`data-event-${event}`, event);
                }
            });
        }
    }, 1000);
}

function triggerFileChangerEvent(){
    on(".select-photo", "click", triggerFileChanger);
}

function uploadImageEvent(){
    on(".image", "change", uploadImage);
}

function removeImageEvent(){
    on(".remove-image", "click", removeImage);
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

function openAsModalEvent(){
    on(".open-as-modal", "click", openAsModal);
}

function alertBeforeRunningEvent(){
    on(".pre-run", "click", alertBeforeRunning);
}

function getRequestEvent(){
    on(".run-get-request", "click", getRequest);
}

function postRequestEvent(){
    on("#form .form", "submit", postRequest);
}

function registerEventListeners() {
    triggerFileChangerEvent()

    uploadImageEvent()

    removeImageEvent()

    togglePasswordVisibilityEvent()

    checkIfPasswordsMatchEvent()

    generatePasswordEvent()

    openAsModalEvent();

    //function to run when user attempts to run any feature that first needs coonfirmation. This replaces the native "alert" prompt of browsers.
    alertBeforeRunningEvent()

    getRequestEvent()

    //General for all pages that use a POST submit method especially.
    postRequestEvent()
}

export { registerEventListeners, on, triggerFileChangerEvent, uploadImageEvent, removeImageEvent, togglePasswordVisibilityEvent, checkIfPasswordsMatchEvent, generatePasswordEvent, openAsModalEvent, alertBeforeRunningEvent, getRequestEvent, postRequestEvent };