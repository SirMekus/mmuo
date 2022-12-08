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

    function lazyLoadImages() {
      // create config object: rootMargin and threshold
      // are two properties exposed by the interface
      var config = {
        rootMargin: "0px 0px 50px 0px",
        threshold: 0
      }; // register the config object with an instance
      // of intersectionObserver

      var observer = new IntersectionObserver(function (entries, self) {
        // iterate over each entry
        entries.forEach(function (entry) {
          // process just the images that are intersecting.
          // isIntersecting is a property exposed by the interface
          if (entry.isIntersecting) {
            var image = entry.target;
            image.src = image.dataset.src; // custom function that copies the path to the img
            // from data-src to src
            // the image is now in place, stop watching

            self.unobserve(entry.target);
          }
        });
      }, config);
      setInterval(function () {
        document.querySelectorAll("[data-src]").forEach(function (img) {
          observer.observe(img);
        });
      }, 1000);
    } //******************* BASICALLY FOR GENERATING STRONG KEYS/PASSWORDS


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
        case "letters":
          return keyGen(10, true, true, false, false, false);

        case "decent_pw":
          return keyGen(10, true, true, true, false, false);

        case "strong":
          return keyGen(15, true, true, true, true, false);

        case "knox_password":
          return keyGen(30, true, true, true, true, false);

        case "ci":
          return keyGen(32, true, true, true, false, false);

        case "type_160":
          return keyGen(20, true, true, true, true, false);

        case "type_504":
          return keyGen(63, true, true, true, true, false);

        case "type_64":
          return keyGen(5, false, false, false, false, true);

        case "type_128":
          return keyGen(13, false, false, false, false, true);

        case "type_152":
          return keyGen(16, false, false, false, false, true);

        case "type_256":
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
      div.style.height = "80px";
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

    function DisplayAsToast(msg) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
      var bgClass;

      switch (status) {
        case true:
          bgClass = 'bg-success';
          break;

        case false:
          bgClass = 'bg-danger';
          break;

        default:
          bgClass = 'bg-primary';
      } //Just in case one has been created already, we remove it


      if (document.querySelector("#notificationToastDiv") != null) {
        document.querySelector("#notificationToastDiv").remove();
      }

      var div = document.createElement('div');
      div.className = 'position-fixed top-0 end-0 p-3 d-flex justify-content-end';
      div.id = 'notificationToastDiv';
      div.style.zIndex = '1100';
      div.innerHTML = "<div id=\"notificationToast\" class=\"toast ".concat(bgClass, " text-white\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n        <div class=\"toast-body\">\n          <button type=\"button\" class=\"btn-close float-end\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n          ").concat(msg, "\n        </div>\n      </div>");
      document.body.appendChild(div);
      new bootstrap.Toast(document.getElementById("notificationToast")).show();
    }

    function getQueryStringsFromUrl(url) {
      if (url.split("?").length > 1) {
        var query = url.split("?")[1];
        var urlSearchParams = new URLSearchParams(query);
        var params = Object.fromEntries(urlSearchParams.entries());
        return params;
      } else {
        return null;
      }
    }

    function moneyFormat(amount) {
      var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "NGN";

      //else the currency must have been set.
      if (!currency || typeof currency != "string") {
        currency = "NGN";
      }

      if (typeof amount != 'number') {
        amount = 0;
      }

      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0,
        //maximumFractionDigits: 0,

      });
      return formatter.format(amount);
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

    function isImage(file) {
      return file.type.split("/")[0] == 'image' ? true : false;
    }

    function defaultFormats() {
      var _window$mmuo_accepted;

      return (_window$mmuo_accepted = window.mmuo_acceptedDocs) !== null && _window$mmuo_accepted !== void 0 ? _window$mmuo_accepted : ["image/jpeg", "image/png", "image/gif", "image/webp"];
    }

    function acceptedFormats() {
      var formats = defaultFormats();
      var fileFormats = [];

      for (var index in formats) {
        fileFormats.push(formats[index].split("/")[1]);
      }

      return fileFormats.toString();
    }

    function uploadImage(e) {
      var _window$acceptedSize;

      var selectedFiles = e.currentTarget.files;
      var index = document.querySelectorAll(".remove-image").length;
      var preview_box_locator = e.currentTarget.getAttribute("data-preview");
      var preview_box = document.querySelector(".".concat(preview_box_locator));
      var acceptedDocs = defaultFormats();
      var acceptedSize = (_window$acceptedSize = window.acceptedSize) !== null && _window$acceptedSize !== void 0 ? _window$acceptedSize : 3228267;
      var imageUploaded = false;

      for (var _i = 0; _i < selectedFiles.length; _i++) {
        var size = selectedFiles[_i].size;
        var type = selectedFiles[_i].type;

        if (!acceptedDocs.includes(type)) {
          showCanvass("".concat(selectedFiles[_i].name, " is unknown. Please upload an image or file in: ").concat(acceptedFormats(), " format to continue."));

          if (isImage(selectedFiles[_i])) {
            removePhoto(_i);
          }

          break;
        }

        if (size > acceptedSize) {
          showCanvass("File size for ".concat(selectedFiles[_i].name, " too large. File must not be greater than ").concat((acceptedSize / 1024 / 1024).toFixed("0"), "MB"));

          if (isImage(selectedFiles[_i])) {
            removePhoto(_i);
          }

          break;
        }

        if (isImage(selectedFiles[_i])) {
          imageUploaded = true;
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
      }

      if (imageUploaded) {
        if (document.getElementById("previously_uploaded") != null) {
          var dt = new DataTransfer();

          var _document$getElementB = document.getElementById("previously_uploaded"),
              files = _document$getElementB.files;

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
          document.getElementById("previously_uploaded").remove(); // var found = document.querySelectorAll(".remove-image").length - 1

          document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
            listObj[currentIndex].setAttribute('data-entry', currentIndex);
          });
        }
      }
    }

    function removeImage(event) {
      event.preventDefault();
      var currentButton = event.currentTarget;
      var index = currentButton.dataset.entry;
      var dt = new DataTransfer();
      var input = document.querySelector('.image');

      for (var i = 0; i < input.files.length; i++) {
        var file = input.files[i];

        if (index != i) {
          dt.items.add(file); // here you exclude the file. thus removing it.
        }
      }

      input.files = dt.files; // Assign the updates list

      currentButton.parentElement.remove();
      document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
        listObj[currentIndex].setAttribute('data-entry', currentIndex);
      });
    }

    function removePhoto(index) {
      var dt = new DataTransfer();
      var input = document.getElementById('image');
      var files = input.files;

      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (index !== i) dt.items.add(file); // here you exclude the file. thus removing it.
      }

      input.files = dt.files; // Assign the updates list

      document.querySelectorAll(".remove-image").forEach(function (currentValue, currentIndex, listObj) {
        listObj[currentIndex].setAttribute('data-entry', currentIndex);
      });
      var found = $(document).find('.remove-image').length - 1;
      $(document).find('.remove-image').each(function (k) {
        $(this).attr('data-entry', found - k);
      });
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }

      return target;
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function insertAfter(newNode, existingNode) {
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }

    function removeElement(scope, selector) {
      scope.querySelectorAll(selector).forEach(function (currentValue, currentIndex, listObj) {
        listObj[currentIndex].remove();
      });
    }

    function checkParent(parent, child) {
      var node = child.parentNode;
      var currentChild = child;
      var isFound = false; // keep iterating unless we find a node with the exact parent

      while (!isFound) {
        if (node == parent) {
          isFound = true;
          return currentChild;
        }

        currentChild = node;
        node = currentChild.parentNode;
      }

      return false;
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
      var _clicked_buton$datase, _clicked_buton$datase2;

      event.preventDefault();
      var clicked_buton = event.currentTarget;
      var target = (_clicked_buton$datase = clicked_buton.dataset.target) !== null && _clicked_buton$datase !== void 0 ? _clicked_buton$datase : "password";
      var strength = (_clicked_buton$datase2 = clicked_buton.dataset.strength) !== null && _clicked_buton$datase2 !== void 0 ? _clicked_buton$datase2 : "decent_pw";
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

    function openAsModal(event) {
      event.preventDefault();

      if (document.querySelector(".close-mmuo-modal")) {
        document.querySelector(".close-mmuo-modal").click();
      }

      showSpinner();
      var clickedLink = event.currentTarget;
      var href = clickedLink.getAttribute("href");

      if (!href || href == "#") {
        removeSpinner();
        return;
      }

      axios.request({
        url: href,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
      }).then(function (response) {
        if (document.querySelector(".mmuo-modal") != null) {
          new bootstrap.Modal(document.getElementById('mmuo-modal')).hide();
          document.querySelector(".mmuo-modal").remove();
        }

        var shrink = clickedLink.dataset.shrink;
        var backdrop = clickedLink.dataset.static;
        var element = document.createElement("div");
        element.className = "modal fade mmuo-modal";
        element.id = 'mmuo-modal';
        element.setAttribute('tabindex', -1);
        element.setAttribute('aria-labelledby', 'mmuoModal');
        element.setAttribute('aria-hidden', 'true');

        if (backdrop) {
          element.setAttribute('data-bs-backdrop', 'static');
        }

        element.setAttribute('role', 'dialog');
        element.innerHTML = "\n                        <div class='modal-dialog ".concat(!shrink ? 'modal-xl' : null, "'> \n                            <div class='modal-content'> <div class='modal-header'> \n                            <button type='button' class='close-mmuo-modal btn-close' data-bs-dismiss='modal' aria-hidden='true' aria-label='Close'></button> \n                            </div> \n                            <div class='modal-body'>\n                                ").concat(response.data, " \n                            </div> \n                        </div>");
        document.body.appendChild(element);
        var modal = new bootstrap.Modal(document.getElementById('mmuo-modal'));
        modal.show();
      }).catch(function (error) {
        showCanvass("<div class='text-danger'>" + error.response.data.message + "</div>");
      }).then(function () {
        removeSpinner();
      });
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
        document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, {
          detail: null
        }));
        removeSpinner();
        return;
      }

      axios.request({
        url: href,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
      }).then(function (response) {
        document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, {
          detail: response
        }));
      }).catch(function (error) {
        showCanvass("<div class='text-danger'>" + error.response.data.message + "</div>");
      }).then(function () {
        removeSpinner();
      });
    }

    function postRequest(event) {
      event.preventDefault();
      var this_form = event.currentTarget;
      var submit_button = this_form.querySelector("input[type='submit']") || this_form.querySelector("button[type='submit']");

      if (this_form.querySelector(".div.success")) {
        this_form.querySelector(".div.success").remove();
      }

      var div = document.createElement("div");
      div.className = "success";
      var childNode = checkParent(this_form, submit_button);
      this_form.insertBefore(div, childNode);
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
      var action = this_form.getAttribute("action");
      var method = this_form.getAttribute('method') || 'post';
      var data_to_send = new FormData(this_form);
      showSpinner();
      submit_button.value = "...in progress";
      submit_button.setAttribute("disabled", "disabled");
      var config = {
        url: action,
        method: method,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      switch (method.toLowerCase()) {
        case 'patch':
        case "put":
        case "delete":
        case "post":
          config = _objectSpread2(_objectSpread2({}, config), {}, {
            data: this_form.dataset.json ? JSON.parse(JSON.stringify(Object.fromEntries(data_to_send))) : data_to_send
          });
          break;

        default:
          config = _objectSpread2(_objectSpread2({}, config), {}, {
            params: JSON.parse(JSON.stringify(Object.fromEntries(data_to_send)))
          });
      }

      axios.request(config).then(function (response) {
        var _response$data, _response$data$messag, _response$data2;

        removeElement(this_form, ".server-response");

        if (this_form.dataset.bc) {
          document.dispatchEvent(new CustomEvent(this_form.dataset.bc, {
            detail: response
          }));
        }

        if ((_response$data = response.data) !== null && _response$data !== void 0 && (_response$data$messag = _response$data.message) !== null && _response$data$messag !== void 0 && _response$data$messag.url || (_response$data2 = response.data) !== null && _response$data2 !== void 0 && _response$data2.url) {
          var _response$data3, _response$data3$messa, _response$data4;

          var url = ((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : (_response$data3$messa = _response$data3.message) === null || _response$data3$messa === void 0 ? void 0 : _response$data3$messa.url) || ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.url);

          if (this_form.dataset.ext) {
            window.open(url, '_ext');
          } else {
            location.href = url;
          }
        } else {
          var _ref, _response$data$messag2;

          var serverResponse = (_ref = response.data.msg || ((_response$data$messag2 = response.data.message) === null || _response$data$messag2 === void 0 ? void 0 : _response$data$messag2.message) || response.data.message) !== null && _ref !== void 0 ? _ref : response.data;

          if (_typeof(serverResponse) == 'object') {
            var _submit_button$datase;

            serverResponse = (_submit_button$datase = submit_button.dataset.mSuccess) !== null && _submit_button$datase !== void 0 ? _submit_button$datase : "Operation was successful";
          }

          responseArea.innerHTML = "<span class='text-success fw-bold'>".concat(serverResponse, "</span>");
        }
      }).catch(function (error) {
        var _error$response$data$2, _ref2;

        if (!error || !error.response) {
          return;
        }

        removeElement(this_form, ".server-response");

        switch (error.response.status) {
          case 422:
            var items = error.response.data.errors;

            if (items != undefined) {
              for (var item in items) {
                //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM
                if (this_form.querySelector("[name='".concat(item, "']")) == null) {
                  continue;
                }

                var sibling = this_form.querySelector("[name='".concat(item, "']")).nextElementSibling;
                var id = "".concat(item, "_mmuo");

                if (sibling == null) {
                  //Then we need to create it
                  var element = document.createElement("div");
                  element.id = id;
                  element.className = "server-response text-danger";
                  insertAfter(element, this_form.querySelector("[name='".concat(item, "']")));
                } else {
                  if (sibling.id != id) {
                    var element = document.createElement("div");
                    element.id = id;
                    element.className = "server-response text-danger";
                    insertAfter(element, sibling);
                  }
                }

                var responseForElement = this_form.querySelector("#".concat(id));
                responseForElement.innerHTML = items[item][0];
              }

              if (items.length > 1) {
                responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>Please make sure you fill required fields in the form and try again.</span>";
              } else {
                responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>".concat(error.response.data.message, "</span>");
              }
            } else {
              var _error$response$data, _error$response$data$, _error$response$data2, _error$response$data3, _error$response$data4, _error$response$data5;

              if ((_error$response$data = error.response.data) !== null && _error$response$data !== void 0 && (_error$response$data$ = _error$response$data.message) !== null && _error$response$data$ !== void 0 && _error$response$data$.message) {
                var msg = error.response.data.message.message;
              } else if ((_error$response$data2 = error.response.data) !== null && _error$response$data2 !== void 0 && _error$response$data2.message) {
                var msg = error.response.data.message;
              } else {
                var msg = error.response.data;
              }

              responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>" + msg + "</span>";

              if ((_error$response$data3 = error.response.data) !== null && _error$response$data3 !== void 0 && (_error$response$data4 = _error$response$data3.message) !== null && _error$response$data4 !== void 0 && _error$response$data4.target || (_error$response$data5 = error.response.data) !== null && _error$response$data5 !== void 0 && _error$response$data5.target) {
                var _error$response$data6;

                var inputName = error.response.data.message.target || ((_error$response$data6 = error.response.data) === null || _error$response$data6 === void 0 ? void 0 : _error$response$data6.target); //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM

                if (this_form.querySelector("[name='".concat(inputName, "']")) != null) {
                  var sibling = this_form.querySelector("[name='".concat(inputName, "']")).nextElementSibling;

                  var _id = "".concat(inputName, "_mmuo");

                  if (sibling == null) {
                    //Then we need to create it
                    var element = document.createElement("div");
                    element.id = _id;
                    element.className = "server-response text-danger fw-bold";
                    insertAfter(element, this_form.querySelector("[name='".concat(inputName, "']")));
                  } else {
                    if (sibling.id != _id) {
                      var element = document.createElement("div");
                      element.id = _id;
                      element.className = "server-response text-danger fw-bold";
                      insertAfter(element, sibling);
                    }
                  }

                  var responseForElement = this_form.querySelector("#".concat(_id));
                  responseForElement.innerHTML = msg;
                }
              }
            }

            break;

          case 401:
            responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>" + error.response.data.message + "</span>";
            break;

          case 403:
            var forbidden = (_error$response$data$2 = error.response.data.message) !== null && _error$response$data$2 !== void 0 ? _error$response$data$2 : error.response.data;
            responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>" + forbidden + "</span>";
            break;

          case 404:
            responseArea.innerHTML = (_ref2 = "<span class='server-response text-danger fw-bold'>" + error.response.data.message) !== null && _ref2 !== void 0 ? _ref2 : error.response.data + "</span>";
            break;

          default:
            responseArea.innerHTML = "<span class='server-response text-danger fw-bold'>There was a problem in submission. Please try again</span>";
        }
      }).then(function () {
        submit_button.value = sub_value;
        submit_button.removeAttribute("disabled");
        removeSpinner();
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

    function triggerFileChangerEvent() {
      on(".select-photo", "click", triggerFileChanger);
    }

    function uploadImageEvent() {
      on(".image", "change", uploadImage);
    }

    function removeImageEvent() {
      on(".remove-image", "click", removeImage);
    }

    function togglePasswordVisibilityEvent() {
      on(".password-visibility", "click", togglePasswordVisibility);
    }

    function checkIfPasswordsMatchEvent() {
      on(".password-checker", "focusout", checkIfPasswordsMatch);
    }

    function generatePasswordEvent() {
      on(".gen-password", "click", generatePassword);
    }

    function openAsModalEvent() {
      on(".open-as-modal", "click", openAsModal);
    }

    function alertBeforeRunningEvent() {
      on(".pre-run", "click", alertBeforeRunning);
    }

    function getRequestEvent() {
      on(".run-get-request", "click", getRequest);
    }

    function postRequestEvent() {
      on("#form .form", "submit", postRequest);
    }

    function registerEventListeners() {
      triggerFileChangerEvent();
      uploadImageEvent();
      removeImageEvent();
      togglePasswordVisibilityEvent();
      checkIfPasswordsMatchEvent();
      generatePasswordEvent();
      openAsModalEvent(); //function to run when user attempts to run any feature that first needs coonfirmation. This replaces the native "alert" prompt of browsers.

      alertBeforeRunningEvent();
      getRequestEvent(); //General for all pages that use a POST submit method especially.

      postRequestEvent();
    }

    exports.DisplayAsToast = DisplayAsToast;
    exports.alertBeforeRunning = alertBeforeRunning;
    exports.alertBeforeRunningEvent = alertBeforeRunningEvent;
    exports.checkIfPasswordsMatch = checkIfPasswordsMatch;
    exports.checkIfPasswordsMatchEvent = checkIfPasswordsMatchEvent;
    exports.empty = empty;
    exports.generatePassword = generatePassword;
    exports.generatePasswordEvent = generatePasswordEvent;
    exports.getKey = getKey;
    exports.getQueryStringsFromUrl = getQueryStringsFromUrl;
    exports.getRequest = getRequest;
    exports.getRequestEvent = getRequestEvent;
    exports.keyGen = keyGen;
    exports.lazyLoadImages = lazyLoadImages;
    exports.moneyFormat = moneyFormat;
    exports.on = on;
    exports.openAsModalEvent = openAsModalEvent;
    exports.postRequest = postRequest;
    exports.postRequestEvent = postRequestEvent;
    exports.registerEventListeners = registerEventListeners;
    exports.removeImageEvent = removeImageEvent;
    exports.removeSpinner = removeSpinner;
    exports.showAlert = showAlert;
    exports.showCanvass = showCanvass;
    exports.showSpinner = showSpinner;
    exports.togglePasswordVisibility = togglePasswordVisibility;
    exports.togglePasswordVisibilityEvent = togglePasswordVisibilityEvent;
    exports.triggerFileChangerEvent = triggerFileChangerEvent;
    exports.uploadImageEvent = uploadImageEvent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
