(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mmuo = {}));
})(this, (function (exports) { 'use strict';

    function empty(val) {
      if (val == undefined || val == "") {
        return true;
      }
    }

    function capitalLetters$1() {
      var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (s) {
        return s.trim().split(" ").map(function (i) {
          return i[0].toUpperCase() + i.substr(1);
        }).reduce(function (ac, i) {
          return "".concat(ac, " ").concat(i);
        });
      }
    }

    var lowerCase = "abcdefghijklmnopqrstuvwxyz";
    var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "1234567890";
    var special = "`~!@#$%^&*()-=_+[]{}|;':\",./<>?";
    var hex = "123456789ABCDEF";

    function random() {
      var _window = window,
          crypto = _window.crypto,
          Uint32Array = _window.Uint32Array; // if (typeof crypto?.getRandomValues === 'function' && typeof Uint32Array === 'function') {

      if (typeof crypto.getRandomValues === "function" && typeof Uint32Array === "function") {
        // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
        return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
      }

      return Math.random();
    }

    function keyGen(length) {
      var useLowerCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var useUpperCase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var useNumbers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var useSpecial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var useHex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var chars = "";
      var key = "";
      if (useLowerCase) chars += lowerCase;
      if (useUpperCase) chars += upperCase;
      if (useNumbers) chars += numbers;
      if (useSpecial) chars += special;
      if (useHex) chars += hex;

      for (var i = 0; i < length; i++) {
        key += chars[Math.floor(random() * chars.length)];
      }

      return key;
    }

    function getKey() {
      var strength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      switch (strength) {
        case "only_letters":
          return keyGen(10, true, true, false, false, false);

        case "decent_pw":
          return keyGen(10, true, true, true, false, false);

        case "strong_pw":
          return keyGen(15, true, true, true, true, false);

        case "ft_knox_pw":
          return keyGen(30, true, true, true, true, false);

        case "ci_key":
          return keyGen(32, true, true, true, false, false);

        case "160_wpa":
          return keyGen(20, true, true, true, true, false);

        case "504_wpa":
          return keyGen(63, true, true, true, true, false);

        case "64_wep":
          return keyGen(5, false, false, false, false, true);

        case "128_wep":
          return keyGen(13, false, false, false, false, true);

        case "152_wep":
          return keyGen(16, false, false, false, false, true);

        case "256_wep":
          return keyGen(29, false, false, false, false, true);

        default:
          return keyGen(8, true, true, true, false, false);
        //throw Error(`No such strength "${strength}"`);
      }
    }

    function showCanvass($msg) {
      //Just in case one have been created already, we remove it
      if (document.querySelector("#offcanvasBottom") != null) {
        document.querySelector("#offcanvasBottom").remove();
      }

      var div = document.createElement('div');
      div.className = 'offcanvas offcanvas-bottom';
      div.id = 'offcanvasBottom';
      div.setAttribute('tabindex', -1);
      div.setAttribute('aria-labelledby', 'offcanvasBottomLabel');
      div.innerHTML = "<div class='offcanvas-header d-flex justify-content-center'>\n        <h5 class='offcanvas-title text-center' id='offcanvasBottomLabel'>".concat($msg, "</h5>\n      </div>");
      document.body.appendChild(div);
      new bootstrap.Offcanvas(document.getElementById("offcanvasBottom")).show();
    }

    function showSpinner() {
      //Just in case one have been created already, we remove it
      if (document.querySelector(".spinner-div") != null) {
        document.querySelector(".spinner-div").remove();
      }

      var div = document.createElement('div');
      div.className = 'd-flex justify-content-center spinner-div';
      div.innerHTML = "<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span></div";
      document.body.appendChild(div);
    }

    function removeSpinner() {
      //Just in case one have been created already, we remove it
      if (document.querySelector(".spinner-div") != null) {
        document.querySelector(".spinner-div").remove();
      }
    }

    function showAlert(caption, href, textWord) {
      var classToUse = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var bc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

      //Just in case one have been created already, we remove it
      if (document.querySelector(".alert-modal") != null) {
        document.querySelectorAll(".alert-modal").forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].remove();
        }); //document.querySelector(".modal").remove();
      }

      var div = document.createElement('div');
      div.className = 'modal fade alert-modal';
      div.id = 'myModal';
      div.setAttribute('tabindex', -1);
      div.setAttribute('role', 'dialog');
      div.setAttribute('aria-labelledby', 'myModalLabel');
      div.setAttribute('aria-hidden', 'true');
      div.innerHTML = "<div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='btn-close' data-bs-dismiss='modal' aria-hidden='true'> </button> </div> <div class='modal-body'><div class='card'> <div class='card-body'><h5 class='card-title d-flex justify-content-center'>".concat(caption, "</h5></div><div class='card-footer'> <div class='btn-group d-flex justify-content-center' data-toggle='buttons'> <button type='button' class='close close-alert btn btn-dark btn-lg' data-bs-dismiss='modal' aria-hidden='true'>Cancel</button><a href='").concat(href, "' class='ms-2 ").concat(classToUse, " btn btn-danger btn-lg' data-bc=\"").concat(bc, "\">").concat(capitalLetters$1(textWord), "</a></div></div> <div id='responseArea'></div></div></div> </div></div>");
      document.body.appendChild(div);
      new bootstrap.Modal(document.getElementById("myModal")).show();
    }

    function triggerFileChanger(e) {
      var _window$maxUpload;

      e.preventDefault();
      var target_class = e.currentTarget.dataset.targetclass;
      var target = document.querySelector(".".concat(target_class));
      var maxUpload = (_window$maxUpload = window.maxUpload) !== null && _window$maxUpload !== void 0 ? _window$maxUpload : 5;

      if (target.files.length >= maxUpload) {
        showCanvass("You can (and should) only select a maximum of ".concat(maxUpload, " image(s) for upload"));
        return;
      } //The goal is to grab any previously uploaded file and then attach it to this new result created below


      if (target.files.length > 0) {
        if (document.getElementById("previously_uploaded") != null) {
          document.getElementById("previously_uploaded").remove();
        }

        var clonedNode = target.cloneNode(true);
        clonedNode.id = "previously_uploaded";
        clonedNode.removeAttribute("name");
        clonedNode.classList.remove(target_class);
        document.body.appendChild(clonedNode);
      }

      var event = new MouseEvent("click");
      target.dispatchEvent(event);
    }

    function uploadImage(e) {
      var _window$acceptedDocs, _window$acceptedSize;

      var selectedFiles = e.currentTarget.files;
      var index = document.querySelectorAll(".remove-image").length;
      var preview_box_locator = e.currentTarget.getAttribute("data-preview");
      var preview_box = document.querySelector(".".concat(preview_box_locator));
      var acceptedDocs = (_window$acceptedDocs = window.acceptedDocs) !== null && _window$acceptedDocs !== void 0 ? _window$acceptedDocs : ["image/jpeg", "image/png", "image/gif", "image/webp"];
      var acceptedSize = (_window$acceptedSize = window.acceptedSize) !== null && _window$acceptedSize !== void 0 ? _window$acceptedSize : 3228267;

      for (var _i = 0; _i < selectedFiles.length; _i++) {
        var size = selectedFiles[_i].size;
        var type = selectedFiles[_i].type;

        if (!acceptedDocs.includes(type)) {
          showCanvass("".concat(file[_i].name, " is unknown. Please upload an image file in JPG, PNG, GIF or WEBP format to continue"));
          removeImage(_i);
          break;
        }

        if (size > acceptedSize) {
          showCanvass("File size for ".concat(selectedFiles[_i].name, " too large. File must not be greater than ").concat((acceptedSize / 1024 / 1024).toFixed("0"), "MB"));
          removeImage(_i);
          break;
        }

        var img = {
          src: URL.createObjectURL(selectedFiles[_i]),
          file: selectedFiles[_i],
          index: index
        };
        var div = document.createElement('div');
        div.className = 'div-for-this-photo me-2';
        div.innerHTML = "<a style='float:clear;' class='btn btn-lg remove-image' data-entry='".concat(index, "'  href='#'><span>&times;</span></a><a href='#' data-fancybox='gallery' data-caption='how it will be displayed ").concat(_i, "' class='card'><img class='card-img-top' src='").concat(img.src, "' /> </a>");
        preview_box.appendChild(div);
        index++;
      }

      if (document.getElementById("previously_uploaded") != null) {
        var dt = new DataTransfer();

        var _document$getElementB = document.getElementById("previously_uploaded"),
            files = _document$getElementB.files;

        console.log(files);

        for (var i = 0; i < files.length; i++) {
          var merged_file = files[i];
          dt.items.add(merged_file);
        }

        var current_file = e.currentTarget.files;

        for (var p = 0; p < current_file.length; p++) {
          var _merged_file = current_file[p];
          dt.items.add(_merged_file);
        }

        e.currentTarget.files = dt.files;
        document.getElementById("previously_uploaded").remove();
        document.querySelectorAll(".remove-image").length - 1;
        document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].setAttribute('data-entry', currentIndex);
        });
      }
    }

    function removeImage(event) {
      event.preventDefault();
      var currentButton = event.currentTarget;
      var index = currentButton.dataset.entry;
      console.log("index is ".concat(index));
      var dt = new DataTransfer();
      var input = document.querySelector('.image');

      for (var i = 0; i < input.files.length; i++) {
        var _file = input.files[i];

        if (index != i) {
          dt.items.add(_file); // here you exclude the file. thus removing it.
        }
      }

      input.files = dt.files; // Assign the updates list

      currentButton.parentElement.remove();
      document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
        listObj[currentIndex].setAttribute('data-entry', currentIndex);
        console.log(currentValue + ', ' + currentIndex + ', ' + this);
        console.log(listObj);
      });
    }

    function insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    function removeElement(scope, selector) {
      scope.querySelectorAll(selector).forEach(function (currentValue, currentIndex, listObj) {
        listObj[currentIndex].remove();
      });
    }

    function togglePasswordVisibility(event) {
      event.preventDefault();
      var clicked_buton = event.currentTarget;
      var icon = clicked_buton.children[0];
      var passwordField = !empty(clicked_buton.dataset.id) ? document.querySelector("#".concat(clicked_buton.dataset.id)) : clicked_buton.parentElement.parentElement.parentElement.querySelector("input");

      if (passwordField.getAttribute("type") == "password") {
        passwordField.setAttribute("type", "text");
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        if (passwordField.getAttribute("type") == "text") {
          passwordField.setAttribute("type", "password");
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      }
    }

    function checkIfPasswordsMatch(event) {
      var field = event.currentTarget;
      var name = field.getAttribute("name");
      var notificationBox = document.querySelector(".password-checker-notification");

      if (name == "password" && field.value != "" && field.value != document.querySelector("[name='password_confirmation']").value || name == "password_confirmation" && field.value != "" && field.value != document.querySelector("[name='password']").value) {
        if (notificationBox.classList.contains("text-danger") == false) {
          notificationBox.classList.add("text-danger");
        }

        notificationBox.innerHTML = "Your Passwords Do Not Match";
      } else {
        notificationBox.classList.remove("text-danger");
        notificationBox.innerHTML = "";
      }
    }

    function generatePassword(event) {
      event.preventDefault();
      var clicked_buton = event.currentTarget;
      var target = clicked_buton.dataset.target;
      var strength = clicked_buton.dataset.strength;
      var passPhrase = getKey(strength);
      var id = document.querySelector("#" + target);
      document.querySelector("#" + target).value = passPhrase;

      if (document.querySelector("#" + target + "2") != null) {
        document.querySelector("#" + target + "2").value = passPhrase;
      }

      if (id.parentElement.querySelector("#password-visibility") != null) {
        if (id.getAttribute("type") == "password") {
          id.parentElement.querySelector("#password-visibility").trigger("click");
        }
      }

      if (document.querySelector(".password-checker-notification") != null) {
        var notificationBox = document.querySelector(".password-checker-notification");
        notificationBox.classList.remove("text-danger");
        notificationBox.innerHTML = "";
      }
    }

    function alertBeforeRunning(event) {
      event.preventDefault();
      var clickedLink = event.currentTarget;
      var href = clickedLink.getAttribute("href");
      var classToUse = clickedLink.dataset.classname || "remove";
      var textWord = clickedLink.text || "Continue";
      var caption = clickedLink.dataset.caption || "Shall we?"; //incase an event needs to be sent to the component for more action(s) to be carried out

      var bc = clickedLink.dataset.bc || null;
      showAlert(caption, href, textWord, classToUse, bc);
    }

    function getRequest(event) {
      event.preventDefault();

      if (document.querySelector(".close-alert")) {
        document.querySelector(".close-alert").click();
      }

      showSpinner();
      var clickedLink = event.currentTarget;
      var href = clickedLink.getAttribute("href");

      if (!href || href == "#") {
        removeSpinner();
        return;
      }

      axios.get(href).then(function (response) {
        eventBus.emit(clickedLink.dataset.bc, response);
      }).catch(function (error) {
        showCanvass("<div class='text-danger'>" + error.response.data.message + "</div>");
      }).then(function () {
        removeSpinner();
      });
    }

    function postRequest(event) {
      event.preventDefault();
      var this_form = event.currentTarget; //In case there are more than 2 submit buttons in a form.

      var submit_button = this_form.querySelector("input[type='submit']");

      if (this_form.querySelector("div.success") == null) {
        var div = document.createElement("div");
        div.className = "success";
        this_form.insertBefore(div, submit_button.parentElement);
      }

      var responseArea = this_form.querySelector(".success");

      if (this_form.querySelector("#hidden_content") != null) {
        this_form.querySelector("#hidden_content").value = frames["richedit"].document.body.innerHTML;
      }

      var notFilled = false; //We make sure those fields that are required are filled incase the user mistakenly skips any.

      this_form.querySelectorAll("input").forEach(function (currentValue, currentIndex, listObj) {
        var currentNode = listObj[currentIndex];

        if (currentNode.dataset.name != undefined || currentNode.getAttribute("required") != undefined) {
          if (currentNode.value == "") {
            notFilled = true;
            var name = currentNode.dataset.name || currentNode.getAttribute("name");
            currentNode.classList.remove("is-valid");
            currentNode.classList.add("is-invalid");
            responseArea.innerHTML = "<span class='text-danger'>You should fill in the " + capitalLetters(name) + " field before you proceed</span>";
            return false;
          }

          currentNode.classList.remove("is-invalid");
          currentNode.classList.add("is-valid");
        }
      });

      if (notFilled == true) {
        return false;
      }

      var sub_value = submit_button.value;
      var action = this_form.getAttribute("action"); //var method = this_form.getAttribute('method')

      var data_to_send = new FormData(this_form);

      if (this_form.querySelector("div.upload-progress-div") == null) {
        var ajaxIndicator = document.createElement("div");
        ajaxIndicator.className = "d-flex justify-content-center spinner-div";
        ajaxIndicator.innerHTML = "<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span>";
        document.body.appendChild(ajaxIndicator);
      }

      submit_button.value = "...in progress";
      submit_button.setAttribute("disabled", "disabled");
      axios.post(action, data_to_send).then(function (response) {
        removeElement(this_form, ".server-response");

        if (response.data.url) {
          if (!this_form.dataset.ext) {
            window.open(response.data.url, '_ext');
          } else {
            window.open(response.data.url);
          }
        } else {
          var _ref;

          responseArea.innerHTML = "<span class='text-success'>".concat((_ref = response.data.msg || response.data.message) !== null && _ref !== void 0 ? _ref : response.data, "</span>");
        }
      }).catch(function (error) {
        var _error$response$data$2, _ref2;

        if (!error || !error.response) {
          return;
        }

        removeElement(this_form, ".server-response");

        switch (error.response.status) {
          case 422:
            //data = error.response.data;
            var items = error.response.data.errors;

            if (items != undefined) {
              for (var item in items) {
                //This may be an element that is dynamically added to the form field, thus may not be always present in the DOM
                if (this_form.querySelector("[name='".concat(item, "']")) == null) {
                  continue;
                }

                var sibling = this_form.querySelector("[name='".concat(item, "']")).nextElementSibling;

                if (sibling == null) {
                  //Then we need to create it
                  var element = document.createElement("div");
                  element.id = item;
                  element.className = "server-response text-danger";
                  insertAfter(element, this_form.querySelector("[name='".concat(item, "']")));
                } else {
                  if (sibling.id != item) {
                    var element = document.createElement("div");
                    element.id = item;
                    element.className = "server-response text-danger";
                    insertAfter(element, sibling);
                  }
                }

                var responseForElement = this_form.querySelector("#".concat(item));
                responseForElement.innerHTML = items[item][0];
              }

              if (items.length > 1) {
                responseArea.innerHTML = "<span class='server-response text-danger'>Please make sure you fill required fields in the form and try again.</span>";
              } else {
                responseArea.innerHTML = "<span class='server-response text-danger'>".concat(error.response.data.message, "</span>");
              }
            } else {
              var _error$response$data$;

              var msg = (_error$response$data$ = error.response.data.message) !== null && _error$response$data$ !== void 0 ? _error$response$data$ : error.response.data;
              responseArea.innerHTML = "<span class='server-response text-danger'>" + msg + "</span>";
            }

            break;

          case 401:
            responseArea.innerHTML = "<span class='server-response text-danger'>" + error.response.data.message + "</span>";
            break;

          case 403:
            var forbidden = (_error$response$data$2 = error.response.data.message) !== null && _error$response$data$2 !== void 0 ? _error$response$data$2 : error.response.data;
            responseArea.innerHTML = "<span class='server-response text-danger'>" + forbidden + "</span>";
            break;

          case 404:
            responseArea.innerHTML = (_ref2 = "<span class='server-response text-danger'>" + error.response.data.message) !== null && _ref2 !== void 0 ? _ref2 : error.response.data + "</span>";
            break;

          default:
            responseArea.innerHTML = "<span class='server-response text-danger'>There was a problem in submission. Please try again</span>";
        }
      }).then(function () {
        submit_button.value = sub_value;
        submit_button.removeAttribute("disabled");
        document.querySelector(".spinner-div").remove();
      });
    }

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
            if (!listObj[currentIndex].getAttribute("data-event-".concat(event))) {
              listObj[currentIndex].addEventListener(event, funct);
              listObj[currentIndex].setAttribute("data-event-".concat(event), event);
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
      on(".gen-password", "click", generatePassword); //function to run when user attempts to run any feature that first needs coonfirmation. This replaces the native "alert" prompt of browsers.

      on(".pre-run", "click", alertBeforeRunning);
      on(".run-get-request", "click", getRequest); //General for all pages that use a POST submit method especially.

      on("#form .form", "submit", postRequest);
    }

    exports.alertBeforeRunning = alertBeforeRunning;
    exports.checkIfPasswordsMatch = checkIfPasswordsMatch;
    exports.generatePassword = generatePassword;
    exports.getRequest = getRequest;
    exports.on = on;
    exports.postRequest = postRequest;
    exports.registerEventListeners = registerEventListeners;
    exports.togglePasswordVisibility = togglePasswordVisibility;

    Object.defineProperty(exports, '__esModule', { value: true });

}));