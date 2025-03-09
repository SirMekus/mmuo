'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    var root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Element);

    _defineProperty(this, "isThisClass", true);

    _defineProperty(this, "element", void 0);

    _defineProperty(this, "selector", void 0);

    _defineProperty(this, "create", void 0);

    _defineProperty(this, "isObject", false);

    _defineProperty(this, "isSingle", false);

    this.create = create;
    var finder = root || document;
    this.isObject = _typeof(element) == "object" || typeof element == "function";
    this.isSingle = this.isObject || finder.querySelectorAll(element).length <= 1 ? true : false;
    this.element = create == true ? document.createElement(element) : this.isObject ? element : this.isSingle ? finder.querySelector(element) : finder.querySelectorAll(element); //Some ops may require working with DOM nodes already created. We shall seek this element from the DOM using a special method.

    this.selector = element;
    return this;
  }

  _createClass(Element, [{
    key: "raw",
    value: function raw() {
      return this.element;
    }
  }, {
    key: "id",
    value: function id(_id) {
      if (this.create || this.isObject || this.isSingle) {
        this.element.id = _id;
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].id = _id;
        });
      }

      return this;
    }
  }, {
    key: "toggle",
    value: function toggle(className) {
      if (this.create || this.isObject || this.isSingle) {
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
        if (this.create || this.isSingle) {
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
      if (this.create || this.isObject || this.isSingle) {
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
        if (this.create || this.isObject || this.isSingle) {
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
    key: "hide",
    value: function hide() {
      if (this.create || this.isObject || this.isSingle) {
        this.element.style.display = 'none';
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].style.display = 'none';
        });
      }

      return this;
    }
  }, {
    key: "show",
    value: function show() {
      if (this.create || this.isObject || this.isSingle) {
        this.element.style.display = '';
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].style.display = '';
        });
      }

      return this;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      var status = this.css('display');
      return status && status == 'none' ? true : false;
    }
  }, {
    key: "addClasses",
    value: function addClasses(classes) {
      if (this.create || this.isObject || this.isSingle) {
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
      if (this.create || this.isObject || this.isSingle) {
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
      return this.create || this.isObject || this.isSingle ? this.element.classList.contains(className) : null;
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      if (this.create || this.isObject || this.isSingle) {
        this.element.classList.remove(className);
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.remove(className);
        });
      }

      return this;
    }
  }, {
    key: "text",
    value: function text() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.create || this.isObject || this.isSingle) {
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

      if (this.create || this.isObject || this.isSingle) {
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
    key: "val",
    value: function val() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.create || this.isObject || this.isSingle) {
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
        var _box = _typeof(element) == "object" ? element !== null && element !== void 0 && element.isThisClass ? element.getDomElement() : element : document.querySelector(element);

        _box.appendChild(this.element);
      }
    }
  }, {
    key: "insertAfter",
    value: function insertAfter$1(element) {
      insertAfter(this.element, _typeof(element) == "object" ? element !== null && element !== void 0 && element.isThisClass ? element.getDomElement() : element : document.querySelector(element));
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(element) {
      var selector = _typeof(element) == "object" ? element !== null && element !== void 0 && element.isThisClass ? element.getDomElement() : element : document.querySelector(element);
      var parent = selector.parentNode;
      var childNode = checkParent(parent, selector);
      parent.insertBefore(this.element, childNode);
    }
  }, {
    key: "remove",
    value: function remove() {
      if (this.create || this.isObject || this.isSingle) {
        this.element.remove();
      } else {
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].remove();
        });
      }

      return this;
    }
  }, {
    key: "removeElement",
    value: function removeElement(selector) {
      this.element.querySelectorAll(selector).forEach(function (currentValue, currentIndex, listObj) {
        listObj[currentIndex].remove();
      });
      return this;
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
      return this.element.parentElement ? new Element(this.element.parentElement, false) : null;
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
  }, {
    key: "find",
    value: function find(selector) {
      return this.element.querySelector(selector) ? new Element(selector, false, this.element) : null;
    }
  }, {
    key: "each",
    value: function each(funct) {
      this.element.forEach(function (currentValue, currentIndex, listObj) {
        var currentNode = listObj[currentIndex];
        var boundedFunc = funct.bind(new Element(currentNode, false));
        boundedFunc();
      });
    }
  }, {
    key: "sibling",
    value: function sibling() {
      return this.element.nextElementSibling ? new Element(this.element.nextElementSibling, false) : null;
    }
  }]);

  return Element;
}();

function element(element) {
  var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return new Element(element, create, root);
}

function empty(val) {
  if (val == undefined || val == "") {
    return true;
  }
}
/**
 * Returns a new string with the first letter of each word capitalized.
 *
 * @param {string} inputString - the input string to be capitalized
 * @return {string} the modified string with capitalized letters
 */


function capitalLetters() {
  var inputString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (inputString) {
    return inputString.trim().split(' ').map(function (word) {
      return word[0].toUpperCase() + word.substring(1);
    }).join(' ');
  }
} // function capitalLetters(s=null) {
//     if(s){
//         return s.trim().split(" ").map((i) => i[0].toUpperCase() + i.substr(1)).reduce((ac, i) => `${ac} ${i}`);
//     }
// }

/**
 * Lazy loads images using IntersectionObserver and setInterval.
 *
 * @param {none} - No parameters
 * @return {none} - No return value
 */


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
/**
 * Generates a random key of the specified length using the given options.
 *
 * @param {number} length - the length of the key to be generated
 * @param {object} [options] - an object containing options for generating the key
 * @param {boolean} [options.useLowerCase=true] - flag to include lowercase alphabets in the key
 * @param {boolean} [options.useUpperCase=true] - flag to include uppercase alphabets in the key
 * @param {boolean} [options.useNumbers=true] - flag to include numbers in the key
 * @param {boolean} [options.useSpecial=true] - flag to include special characters in the key
 * @param {boolean} [options.useHex=false] - flag to include hexadecimal characters in the key
 * @return {string} the generated random key
 */


function keyGen(length) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    useLowerCase: true,
    useUpperCase: true,
    useNumbers: true,
    useSpecial: true,
    useHex: false
  };
  var useLowerCase = options.useLowerCase,
      useUpperCase = options.useUpperCase,
      useNumbers = options.useNumbers,
      useSpecial = options.useSpecial,
      useHex = options.useHex;
  var chars = "";
  var key = "";
  if (useLowerCase) chars += generateAlphabet(false).toString().replaceAll(",", "");
  if (useUpperCase) chars += generateAlphabet().toString().replaceAll(",", "");
  if (useNumbers) chars += "1234567890";
  if (useSpecial) chars += "`~!@#$%^&*()-=_+[]{}|;:/<>?";
  if (useHex) chars += "123456789ABCDEF";

  for (var i = 0; i < length; i++) {
    key += chars[Math.floor(random() * chars.length)];
  }

  return key;
}

function getKey() {
  var strength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "default";
  var keyOptions = {
    "default": {
      length: 8,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: true,
      useSpecial: false,
      useHex: false
    },
    "letters": {
      length: 10,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: false,
      useSpecial: false,
      useHex: false
    },
    "decent_pw": {
      length: 10,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: true,
      useSpecial: false,
      useHex: false
    },
    "strong": {
      length: 15,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: true,
      useSpecial: true,
      useHex: false
    },
    "knox_password": {
      length: 30,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: true,
      useSpecial: true,
      useHex: false
    },
    "ci": {
      length: 32,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: true,
      useSpecial: false,
      useHex: false
    },
    "type_160": {
      length: 20,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: true,
      useSpecial: true,
      useHex: false
    },
    "type_504": {
      length: 63,
      useLowerCase: true,
      useUpperCase: true,
      useNumbers: true,
      useSpecial: true,
      useHex: false
    },
    "type_64": {
      length: 5,
      useLowerCase: false,
      useUpperCase: false,
      useNumbers: false,
      useSpecial: false,
      useHex: true
    },
    "type_128": {
      length: 13,
      useLowerCase: false,
      useUpperCase: false,
      useNumbers: false,
      useSpecial: false,
      useHex: true
    },
    "type_152": {
      length: 16,
      useLowerCase: false,
      useUpperCase: false,
      useNumbers: false,
      useSpecial: false,
      useHex: true
    },
    "type_256": {
      length: 29,
      useLowerCase: false,
      useUpperCase: false,
      useNumbers: false,
      useSpecial: false,
      useHex: true
    }
  };
  return keyGen(keyOptions[strength].length, keyOptions[strength]);
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
/**
 * Generates the alphabet.
 *
 * @param {boolean} capital - specify if the alphabet should be in capital letters, defaults to true
 * @return {Array} an array of the alphabet characters
 */


function generateAlphabet() {
  var capital = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return _toConsumableArray(Array(26)).map(function (_, i) {
    return String.fromCharCode(i + (capital ? 65 : 97));
  });
}

function isFloat(value) {
  return typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value) ? true : false;
}
/**
 * Formats a number to a specified precision, or to 2 decimal places by default.
 *
 * @param {number} number - The number to be formatted
 * @param {number} precision - The precision to format the number to, defaults to 2 decimal places
 * @return {number|null} The formatted number, or null if the input is not a valid number
 */


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
/**
 * Check if the given number is even.
 *
 * @param {number} number - The number to be checked
 * @return {boolean} true if the number is even, false otherwise
 */


function isEven(number) {
  return number % 2 === 0 ? true : false;
}

var Ajaxify = /*#__PURE__*/function () {
  function Ajaxify(element) {
    _classCallCheck(this, Ajaxify);

    _defineProperty(this, "element", void 0);

    _defineProperty(this, "submitButton", void 0);

    this.element = element;
    this.submitButton = element.find("input[type='submit']") || element.find("button[type='submit']");
  }

  _createClass(Ajaxify, [{
    key: "createResponseArea",
    value: function createResponseArea() {
      if (this.element.find("div.success")) {
        this.element.find("div.success").remove();
      }

      element("div").addClass("success").insertBefore(this.submitButton);
      var responseArea = this.element.find(".success");
      return responseArea;
    }
  }, {
    key: "startAjax",
    value: function startAjax() {
      var submitBtnInitialValue = this.submitButton.val();
      var progressIndicatorText = this.submitButton.data("mmuoStart") || "...in progress";
      this.submitButton.val(progressIndicatorText).attr("disabled", "disabled");
      this.submitButton.attr("data-mmuo-initial", submitBtnInitialValue);
    }
  }, {
    key: "successAjax",
    value: function successAjax(response) {
      var _response$data, _response$data$messag, _response$data2;

      var responseArea = this.createResponseArea();
      var cssForServerSuccess = "#198754";
      this.element.removeElement(".server-response");

      if (this.element.data("bc")) {
        document.dispatchEvent(new CustomEvent(this.element.data("bc"), {
          detail: response
        }));
      }

      if ((_response$data = response.data) !== null && _response$data !== void 0 && (_response$data$messag = _response$data.message) !== null && _response$data$messag !== void 0 && _response$data$messag.url || (_response$data2 = response.data) !== null && _response$data2 !== void 0 && _response$data2.url) {
        var _response$data3, _response$data3$messa, _response$data4;

        var url = ((_response$data3 = response.data) === null || _response$data3 === void 0 ? void 0 : (_response$data3$messa = _response$data3.message) === null || _response$data3$messa === void 0 ? void 0 : _response$data3$messa.url) || ((_response$data4 = response.data) === null || _response$data4 === void 0 ? void 0 : _response$data4.url);

        if (this.element.data("ext")) {
          window.open(url, "_ext");
        } else {
          location.href = url;
        }
      } else {
        var _ref, _response$data$messag2;

        var serverResponse = (_ref = response.data.msg || ((_response$data$messag2 = response.data.message) === null || _response$data$messag2 === void 0 ? void 0 : _response$data$messag2.message) || response.data.message) !== null && _ref !== void 0 ? _ref : response.data;

        if (_typeof(serverResponse) == "object") {
          var _this$submitButton$da;

          serverResponse = (_this$submitButton$da = this.submitButton.data("mSuccess")) !== null && _this$submitButton$da !== void 0 ? _this$submitButton$da : "Operation was successful";
        }

        responseArea.html("<span style=\"color:".concat(cssForServerSuccess, "; font-weight:700;\">").concat(serverResponse, "</span>"));
      }
    }
  }, {
    key: "errorAjax",
    value: function errorAjax(error) {
      var _ref2, _error$response$data$, _error$response$data, _error$response$data$2;

      if (!error || !error.response) {
        return;
      }

      var responseArea = this.createResponseArea();
      var cssForServerError = "rgb(220, 53, 69)";
      this.element.removeElement(".server-response");
      var errorMessage = (_ref2 = (_error$response$data$ = error.response.data.message) !== null && _error$response$data$ !== void 0 ? _error$response$data$ : (_error$response$data = error.response.data) === null || _error$response$data === void 0 ? void 0 : (_error$response$data$2 = _error$response$data.data) === null || _error$response$data$2 === void 0 ? void 0 : _error$response$data$2.message) !== null && _ref2 !== void 0 ? _ref2 : error.response.data;

      switch (error.response.status) {
        case 422:
          var items = error.response.data.errors;

          if (items != undefined) {
            for (var item in items) {
              //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM
              if (!this.element.find("[name='".concat(item, "']"))) {
                continue;
              }

              var sibling = this.element.find("[name='".concat(item, "']")).sibling();
              var id = "".concat(item, "_mmuo");

              if (!sibling) {
                //Then we need to create it
                element("div").id(id).addClass("server-response").css("color", cssForServerError).insertAfter(this.element.find("[name='".concat(item, "']")));
              } else {
                if (sibling.attr("id") != id) {
                  element("div").id(id).addClass("server-response").css("color", cssForServerError).insertAfter(sibling);
                }
              }

              this.element.find("#".concat(id)).text(items[item][0]);
            }

            if (items.length > 1) {
              responseArea.html("<span style='color:".concat(cssForServerError, "; font-weight:700' class='server-response'>Please make sure you fill required fields in the form and try again.</span>"));
            } else {
              responseArea.html("<span style='color:".concat(cssForServerError, "; font-weight:700' class='server-response'>").concat(error.response.data.message, "</span>"));
            }
          } else {
            var _error$response$data2, _error$response$data3, _error$response$data4, _error$response$data5, _error$response$data6, _error$response$data7;

            var msg;

            if ((_error$response$data2 = error.response.data) !== null && _error$response$data2 !== void 0 && (_error$response$data3 = _error$response$data2.message) !== null && _error$response$data3 !== void 0 && _error$response$data3.message) {
              msg = error.response.data.message.message;
            } else if ((_error$response$data4 = error.response.data) !== null && _error$response$data4 !== void 0 && _error$response$data4.message) {
              msg = error.response.data.message;
            } else {
              msg = error.response.data;
            }

            responseArea.html("<span style='color:".concat(cssForServerError, "; font-weight:700' class='server-response'>").concat(msg, "</span>"));

            if ((_error$response$data5 = error.response.data) !== null && _error$response$data5 !== void 0 && (_error$response$data6 = _error$response$data5.message) !== null && _error$response$data6 !== void 0 && _error$response$data6.target || (_error$response$data7 = error.response.data) !== null && _error$response$data7 !== void 0 && _error$response$data7.target) {
              var _error$response$data8;

              var inputName = error.response.data.message.target || ((_error$response$data8 = error.response.data) === null || _error$response$data8 === void 0 ? void 0 : _error$response$data8.target); //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM

              if (this.element.find("[name='".concat(inputName, "']")) != null) {
                var _sibling = this.element.find("[name='".concat(inputName, "']")).sibling();

                var _id = "".concat(inputName, "_mmuo");

                if (!_sibling) {
                  //Then we need to create it
                  element("div").id(_id).addClass("server-response").css("color", cssForServerError).css("fontWeight", "700").insertAfter(this.element.find("[name='".concat(inputName, "']")));
                } else {
                  if (_sibling.attr("id") != _id) {
                    element("div").id(_id).addClass("server-response").css("color", cssForServerError).css("fontWeight", "700").insertAfter(_sibling);
                  }
                }

                this.element.find("#".concat(_id)).html(msg);
              }
            }
          }

          break;
        // case 401:
        // case 412:
        // case 403:
        // case 404:
        //     responseArea.html(
        //         `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${errorMessage}</span>`);
        //     break;

        default:
          responseArea.html("<span style='color:".concat(cssForServerError, "; font-weight:700' class='server-response'>").concat(errorMessage, "</span>"));
          break;
      }

      document.dispatchEvent(new CustomEvent("http_error", {
        detail: error
      }));
    }
  }, {
    key: "endAjax",
    value: function endAjax() {
      this.submitButton.val(this.submitButton.data("mmuoInitial"));
      this.submitButton.removeAttr("disabled");
      this.submitButton.removeAttr("data-mmuo-initial");
    }
  }]);

  return Ajaxify;
}();

function togglePasswordVisibility(event) {
  event.preventDefault();
  var clicked_button = event.currentTarget;
  var icon = clicked_button.children[0];
  var passwordField = !empty(clicked_button.dataset.id) ? document.querySelector("#".concat(clicked_button.dataset.id)) : clicked_button.parentElement.parentElement.parentElement.querySelector("input");

  if (passwordField.getAttribute("type") == "password") {
    passwordField.setAttribute("type", "text");

    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  } else {
    if (passwordField.getAttribute("type") == "text") {
      passwordField.setAttribute("type", "password");

      if (icon) {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
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

    notificationBox.textContent = "Your passwords do not match";
  } else {
    notificationBox.style.color = null;
    notificationBox.textContent = "";
  }
}

function generatePassword(event) {
  var _clicked_button$datas, _clicked_button$datas2;

  event.preventDefault();
  var clicked_button = event.currentTarget;
  var target = (_clicked_button$datas = clicked_button.dataset.target) !== null && _clicked_button$datas !== void 0 ? _clicked_button$datas : "password";
  var strength = (_clicked_button$datas2 = clicked_button.dataset.strength) !== null && _clicked_button$datas2 !== void 0 ? _clicked_button$datas2 : "decent_pw";
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

  if (element('.password-checker-notification', false).isPresent()) {
    var notificationBox = element('.password-checker-notification', false);
    notificationBox.css('color', '');
    notificationBox.text('');
  }
}

function postRequest(event) {
  var _this = this;

  var ajaxConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  event.preventDefault();
  var thisForm = element(this, false);
  var ajaxify = new Ajaxify(thisForm);
  var userAjaxStartFunction = ajaxConfig === null || ajaxConfig === void 0 ? void 0 : ajaxConfig.start;
  var userAjaxSuccessFunction = ajaxConfig === null || ajaxConfig === void 0 ? void 0 : ajaxConfig.success;
  var userAjaxErrorFunction = ajaxConfig === null || ajaxConfig === void 0 ? void 0 : ajaxConfig.error;
  var userAjaxEndFunction = ajaxConfig === null || ajaxConfig === void 0 ? void 0 : ajaxConfig.end;

  if (userAjaxStartFunction) {
    userAjaxStartFunction.call(this, thisForm.raw());
  } else {
    ajaxify.startAjax();
  }

  var action = thisForm.attr("action");
  var method = thisForm.attr('method') || 'post';
  var dataToSend = new FormData(thisForm.getDomElement());
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
        data: thisForm.data('json') ? JSON.parse(JSON.stringify(Object.fromEntries(dataToSend))) : dataToSend
      });
      break;

    default:
      config = _objectSpread2(_objectSpread2({}, config), {}, {
        params: JSON.parse(JSON.stringify(Object.fromEntries(dataToSend)))
      });
  }

  axios.request(config).then(function (response) {
    if (userAjaxSuccessFunction) {
      userAjaxSuccessFunction.call(_this, thisForm.raw(), response);
    } else {
      ajaxify.successAjax(response);
    }
  }).catch(function (error) {
    if (!error || !error.response) {
      return;
    }

    if (userAjaxErrorFunction) {
      userAjaxErrorFunction.call(_this, thisForm.raw(), error);
    } else {
      ajaxify.errorAjax(error);
    }
  }).then(function () {
    if (userAjaxEndFunction) {
      userAjaxEndFunction.call(_this, thisForm.raw());
    } else {
      ajaxify.endAjax();
    }
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


function postRequestEvent() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  // on("#form .form", "submit", postRequest);
  on('#form .form', 'submit', function (event) {
    event.preventDefault();
    postRequest.call(this, event, config);
  });
}

function defaultEventListeners() {
  togglePasswordVisibilityEvent();
  checkIfPasswordsMatchEvent();
  generatePasswordEvent();
  postRequestEvent();
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
exports.postRequest = postRequest;
exports.postRequestEvent = postRequestEvent;
exports.queryString = queryString;
exports.removeElement = removeElement;
exports.togglePasswordVisibility = togglePasswordVisibility;
exports.togglePasswordVisibilityEvent = togglePasswordVisibilityEvent;
