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

function registerEventListeners() {
    on(".select-photo", "click", triggerFileChanger);
    on(".image", "change", uploadImage);
    on(".remove-image", "click", removeImage);
    on(".password-visibility", "click", togglePasswordVisibility);

    on(".password-checker", "focusout", checkIfPasswordsMatch);

    on(".gen-password", "click", generatePassword);

    on(".open-as-modal", "click", openAsModal);

    //function to run when user attempts to run any feature that first needs coonfirmation. This replaces the native "alert" prompt of browsers.
    on(".pre-run", "click", alertBeforeRunning);

    on(".run-get-request", "click", getRequest);

    //General for all pages that use a POST submit method especially.
    on("#form .form", "submit", postRequest);
}

export { registerEventListeners, on };