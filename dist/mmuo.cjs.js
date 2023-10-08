'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

var Element = /*#__PURE__*/function () {
  function Element(element) {
    var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _classCallCheck(this, Element);

    _defineProperty(this, "element", void 0);

    _defineProperty(this, "selector", void 0);

    _defineProperty(this, "create", void 0);

    _defineProperty(this, "isObject", false);

    this.create = create;
    this.isObject = _typeof(element) == "object" || typeof element == "function";
    this.element = create == true ? document.createElement(element) : this.isObject ? element : document.querySelectorAll(element).length > 1 ? document.querySelectorAll(element) : document.querySelector(element); //Some ops may require working with DOM nodes already created. We shall seek this element from the DOM using a special method.

    this.selector = element;
    return this;
  }

  _createClass(Element, [{
    key: "id",
    value: function id(_id) {
      if (this.create || this.isObject) {
        this.element.id = _id;
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].id = _id;
        });
      }

      return this;
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      if (this.create || this.isObject) {
        this.element.classList.toggle(className);
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.toggle(className);
        });
      }

      return this;
    }
  }, {
    key: "attr",
    value: function attr(name) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!value) {
        return this.element.getAttribute(name);
      } else {
        if (this.create) {
          this.element.setAttribute(name, value);
        } else {
          this.element.forEach(function (currentValue, currentIndex, listObj) {
            listObj[currentIndex].setAttribute(name, value);
          });
        }

        return this;
      }
    }
  }, {
    key: "removeAttr",
    value: function removeAttr(attr) {
      if (this.create || this.isObject) {
        this.element.removeAttribute(attr);
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].removeAttribute(attr);
        });
      }

      return this;
    }
  }, {
    key: "css",
    value: function css(property) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (value == null) {
        return this.element.style[property];
      } else {
        if (this.create || this.isObject) {
          this.element.style[property] = value;
        } else {
          this.element.forEach(function (currentValue, currentIndex, listObj) {
            listObj[currentIndex].style[property] = value;
          });
        }

        return this;
      }
    }
  }, {
    key: "addClasses",
    value: function addClasses(classes) {
      if (this.create || this.isObject) {
        this.element.className = classes;
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].className = classes;
        });
      }

      return this;
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      if (this.create || this.isObject) {
        this.element.classList.add(className);
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.add(className);
        });
      }

      return this;
    }
  }, {
    key: "contains",
    value: function contains(className) {
      return this.create || this.isObject ? this.element.classList.contains(className) : null;
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      if (this.create || this.isObject) {
        this.element.classList.remove(className);
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.remove(className);
        });
      }
    }
  }, {
    key: "text",
    value: function text() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.create || this.isObject) {
        if (content) {
          this.element.textContent = content;
        } else {
          return this.element.textContent;
        }
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].textContent = content;
        });
      }

      return this;
    }
  }, {
    key: "html",
    value: function html() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.create || this.isObject) {
        if (content) {
          this.element.innerHTML = content;
        } else {
          return this.element.innerHTML;
        }
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].innerHTML = content;
        });
      }

      return this;
    }
  }, {
    key: "value",
    value: function value() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.create || this.isObject) {
        if (content) {
          this.element.value = content;
        } else {
          return this.element.value;
        }
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].value = content;
        });
      }

      return this;
    }
  }, {
    key: "appendTo",
    value: function appendTo() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!element) ; else {
        var _box = _typeof(element) == "object" ? element : document.querySelector(element);

        _box.appendChild(this.element);
      }
    }
  }, {
    key: "insertAfter",
    value: function insertAfter$1(element) {
      insertAfter(this.element, _typeof(element) == "object" ? element : document.querySelector(element));
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(element) {
      var selector = _typeof(element) == "object" ? element : document.querySelector(element);
      var parent = selector.parentNode;
      var childNode = checkParent(parent, selector);
      parent.insertBefore(this.element, childNode);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.create || this.isObject) {
        this.element.remove();
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].remove();
        });
      }
    }
  }, {
    key: "getDomElement",
    value: function getDomElement() {
      return this.element;
    }
  }, {
    key: "isPresent",
    value: function isPresent() {
      return this.element ? true : false;
    }
  }, {
    key: "data",
    value: function data(dataset) {
      return this.element.dataset[dataset];
    }
  }, {
    key: "parent",
    value: function parent() {
      this.element.parentElement;
      return this;
    }
  }, {
    key: "scrollHeight",
    value: function scrollHeight() {
      return this.element.scrollHeight;
    }
  }, {
    key: "scrollToBottom",
    value: function scrollToBottom() {
      var _this = this;

      if (this.isPresent()) {
        setTimeout(function () {
          _this.element.scrollTop = _this.element.scrollHeight;
        }, 0);
      }

      return this;
    }
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView() {
      if (this.isPresent()) {
        setTimeout(function () {
          this.element.scrollIntoView();
        }, 1000);
      }
    }
  }]);

  return Element;
}();

function element(element) {
  var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return new Element(element, create);
}

function empty(val) {
  if (val == undefined || val == "") {
    return true;
  }
}

function capitalLetters() {
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
  if (useLowerCase) chars += generateAlphabet(false);
  if (useUpperCase) chars += generateAlphabet();
  if (useNumbers) chars += "1234567890";
  if (useSpecial) chars += "`~!@#$%^&*()-=_+[]{}|;':\",./<>?";
  if (useHex) chars += "123456789ABCDEF";

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
  }
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

function queryString(name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function generateAlphabet() {
  var capital = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return _toConsumableArray(Array(26)).map(function (_, i) {
    return String.fromCharCode(i + (capital ? 65 : 97));
  });
}

function isFloat(value) {
  return typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value) ? true : false;
}

function formatNumber(number) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var decimalPlaces = Number.isInteger(precision) ? precision : 2;
  var value = Number(number);

  if (Number.isInteger(value) || isFloat(value)) {
    return Number(Number.isInteger(value) ? value : number.toFixed(decimalPlaces));
  } else {
    return null;
  }
}

function isEven(number) {
  return number % 2 === 0 ? true : false;
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
    if (!notificationBox.style.color || notificationBox.style.color != 'red') {
      notificationBox.style.color = 'red';
    }

    notificationBox.innerHTML = "Your passwords do not match";
  } else {
    notificationBox.style.color = null;
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

  if (element('.password-checker-notification').isPresent()) {
    var notificationBox = element('.password-checker-notification');
    notificationBox.css('color', '');
    notificationBox.text('');
  }
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
          var boundedFunc = funct.bind(listObj[currentIndex]);
          listObj[currentIndex].addEventListener(event, boundedFunc);
          listObj[currentIndex].setAttribute("data-event-".concat(event), event);
        }
      });
    }
  }, 1000);
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

function defaultEventListeners() {
  togglePasswordVisibilityEvent();
  checkIfPasswordsMatchEvent();
  generatePasswordEvent();
}

exports.capitalLetters = capitalLetters;
exports.checkIfPasswordsMatch = checkIfPasswordsMatch;
exports.checkIfPasswordsMatchEvent = checkIfPasswordsMatchEvent;
exports.checkParent = checkParent;
exports.defaultEventListeners = defaultEventListeners;
exports.element = element;
exports.empty = empty;
exports.formatNumber = formatNumber;
exports.generateAlphabet = generateAlphabet;
exports.generatePassword = generatePassword;
exports.generatePasswordEvent = generatePasswordEvent;
exports.getKey = getKey;
exports.getQueryStringsFromUrl = getQueryStringsFromUrl;
exports.insertAfter = insertAfter;
exports.isEven = isEven;
exports.isFloat = isFloat;
exports.keyGen = keyGen;
exports.lazyLoadImages = lazyLoadImages;
exports.moneyFormat = moneyFormat;
exports.on = on;
exports.queryString = queryString;
exports.removeElement = removeElement;
exports.togglePasswordVisibility = togglePasswordVisibility;
exports.togglePasswordVisibilityEvent = togglePasswordVisibilityEvent;
