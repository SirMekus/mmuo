import { Element } from "./Element.js"

function element(element, create=true, root=null) {
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
function capitalLetters(inputString = '') {
    if (inputString) {
        return inputString.trim().split(' ')
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(' ');
    }
}

// function capitalLetters(s=null) {
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
    const config = {
        rootMargin: "0px 0px 50px 0px",
        threshold: 0,
    };

    // register the config object with an instance
    // of intersectionObserver
    let observer = new IntersectionObserver(function (entries, self) {
        // iterate over each entry
        entries.forEach((entry) => {
            // process just the images that are intersecting.
            // isIntersecting is a property exposed by the interface
            if (entry.isIntersecting) {
                var image = entry.target;
                image.src = image.dataset.src;
                // custom function that copies the path to the img
                // from data-src to src
                // the image is now in place, stop watching
                self.unobserve(entry.target);
            }
        });
    }, config);

    setInterval(function () {
        document.querySelectorAll("[data-src]").forEach((img) => {
            observer.observe(img);
        });
    }, 1000);

    
}

//******************* BASICALLY FOR GENERATING STRONG KEYS/PASSWORDS
function random() {
    const { crypto, Uint32Array } = window;
    // if (typeof crypto?.getRandomValues === 'function' && typeof Uint32Array === 'function') {
    if (typeof crypto.getRandomValues === "function" && typeof Uint32Array === "function") {
        // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
        return (window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295);
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
function keyGen(
    length, 
    options = { 
        useLowerCase: true, 
        useUpperCase: true,
        useNumbers: true, 
        useSpecial: true, 
        useHex: false 
    }) {
    const { useLowerCase, useUpperCase, useNumbers, useSpecial, useHex } = options;
    let chars = "";
    let key = "";

    if (useLowerCase) chars += generateAlphabet(false).toString().replaceAll(",", "");
    if (useUpperCase) chars += generateAlphabet().toString().replaceAll(",", "");
    if (useNumbers) chars += "1234567890";
    if (useSpecial) chars += "`~!@#$%^&*()-=_+[]{}|;:/<>?";
    if (useHex) chars += "123456789ABCDEF";

    for (let i = 0; i < length; i++) {
        key += chars[Math.floor(random() * chars.length)];
    }

    return key;
}

function getKey(strength = "default") {
    const keyOptions = {
        "default": { length: 8, useLowerCase: true, useUpperCase: true, useNumbers: true, useSpecial: false, useHex: false },
        "letters": { length: 10, useLowerCase: true, useUpperCase: true, useNumbers: false, useSpecial: false, useHex: false },
        "decent_pw": { length: 10, useLowerCase: true, useUpperCase: true, useNumbers: true, useSpecial: false, useHex: false },
        "strong": { length: 15, useLowerCase: true, useUpperCase: true, useNumbers: true, useSpecial: true, useHex: false },
        "knox_password": { length: 30, useLowerCase: true, useUpperCase: true, useNumbers: true, useSpecial: true, useHex: false },
        "ci": { length: 32, useLowerCase: true, useUpperCase: true, useNumbers: true, useSpecial: false, useHex: false },
        "type_160": { length: 20, useLowerCase: true, useUpperCase: true, useNumbers: true, useSpecial: true, useHex: false },
        "type_504": { length: 63, useLowerCase: true, useUpperCase: true, useNumbers: true, useSpecial: true, useHex: false },
        "type_64": { length: 5, useLowerCase: false, useUpperCase: false, useNumbers: false, useSpecial: false, useHex: true },
        "type_128": { length: 13, useLowerCase: false, useUpperCase: false, useNumbers: false, useSpecial: false, useHex: true },
        "type_152": { length: 16, useLowerCase: false, useUpperCase: false, useNumbers: false, useSpecial: false, useHex: true },
        "type_256": { length: 29, useLowerCase: false, useUpperCase: false, useNumbers: false, useSpecial: false, useHex: true },
    };

    return keyGen(keyOptions[strength].length, keyOptions[strength]);
}

function getQueryStringsFromUrl(url){
    if(url.split("?").length > 1){
        var query = url.split("?")[1]
        var urlSearchParams = new URLSearchParams(query)
        var params = Object.fromEntries(urlSearchParams.entries());
        return params
    }
    else{
        return null
    }
}

function moneyFormat(amount, currency = "NGN") {
    //else the currency must have been set.
    if (!currency || typeof currency != "string") {
        currency = "NGN";
    }

    if(typeof amount != 'number'){
        amount = 0
    }

    var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0,
        //maximumFractionDigits: 0,
    });

    return formatter.format(amount);
}

function queryString(name, url = window.location.href) {
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
function generateAlphabet(capital=true){
    return [...Array(26)].map((_, i)=> String.fromCharCode(i + (capital ? 65 : 97)));
}

function isFloat(value){
    return (typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value)) ? true : false;
}

/**
 * Formats a number to a specified precision, or to 2 decimal places by default.
 *
 * @param {number} number - The number to be formatted
 * @param {number} precision - The precision to format the number to, defaults to 2 decimal places
 * @return {number|null} The formatted number, or null if the input is not a valid number
 */
function formatNumber(number, precision=null){
    const decimalPlaces = (Number.isInteger(precision)) ? precision : 2;

    const value = Number(number)
    if(Number.isInteger(value) || isFloat(value)){
        return Number(Number.isInteger(value) ? value : number.toFixed(decimalPlaces));
    }
    else{
        return null
    }
}

/**
 * Check if the given number is even.
 *
 * @param {number} number - The number to be checked
 * @return {boolean} true if the number is even, false otherwise
 */
function isEven(number){
    return number%2 === 0 ? true : false
}

export {capitalLetters, getKey, keyGen, lazyLoadImages, empty, getQueryStringsFromUrl, moneyFormat, element, queryString, generateAlphabet, isFloat, formatNumber, isEven}