import { Element } from "./Element.js"

function element(element, create=true) {
    return new Element(element, create);
}

function empty(val) {
    if (val == undefined || val == "") {
        return true;
    }
}

function capitalLetters(s=null) {
    if(s){
        return s.trim().split(" ").map((i) => i[0].toUpperCase() + i.substr(1)).reduce((ac, i) => `${ac} ${i}`);
    }
}

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

function keyGen(length,useLowerCase = true,useUpperCase = true,useNumbers = true,useSpecial = true,useHex = false) {
    let chars = "";
    let key = "";

    if (useLowerCase) chars += generateAlphabet(false);
    if (useUpperCase) chars += generateAlphabet();
    if (useNumbers) chars += "1234567890";
    if (useSpecial) chars += "`~!@#$%^&*()-=_+[]{}|;':\",./<>?";
    if (useHex) chars += "123456789ABCDEF";

    for (let i = 0; i < length; i++) {
        key += chars[Math.floor(random() * chars.length)];
    }

    return key;
}

function getKey(strength = null) {
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

function generateAlphabet(capital=true){
    return [...Array(26)].map((_, i)=> String.fromCharCode(i + (capital ? 65 : 97)));
}

function isFloat(value){
    return (typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value)) ? true : false;
}

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

function isEven(number){
    return number%2 === 0 ? true : false
}

export {capitalLetters, getKey, keyGen, lazyLoadImages, empty, getQueryStringsFromUrl, moneyFormat, element, queryString, generateAlphabet, isFloat, formatNumber, isEven}