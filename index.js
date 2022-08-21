import { on, registerEventListeners } from "./src/EventListeners.js"
import { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword, alertBeforeRunning, getRequest, postRequest } from "./src/EventCallbacks.js"
import {showCanvass, showSpinner, removeSpinner, showAlert, lazyLoadImages} from "./src/helper.js"

export {on, registerEventListeners, togglePasswordVisibility, checkIfPasswordsMatch, generatePassword, alertBeforeRunning, getRequest, postRequest, showCanvass, showSpinner, removeSpinner, showAlert, lazyLoadImages}
