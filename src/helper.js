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
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "1234567890";
const special = "`~!@#$%^&*()-=_+[]{}|;':\",./<>?";
const hex = "123456789ABCDEF";

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

    if (useLowerCase) chars += lowerCase;
    if (useUpperCase) chars += upperCase;
    if (useNumbers) chars += numbers;
    if (useSpecial) chars += special;
    if (useHex) chars += hex;

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
        //throw Error(`No such strength "${strength}"`);
    }
}

function showCanvass($msg) {
    //Just in case one have been created already, we remove it
    if(document.querySelector("#offcanvasBottom") != null){
    document.querySelector("#offcanvasBottom").remove();
    }

    let div = document.createElement('div');
        div.className = 'offcanvas offcanvas-bottom';
        div.id = 'offcanvasBottom'
        div.setAttribute('tabindex', -1)
        div.setAttribute('aria-labelledby', 'offcanvasBottomLabel')
        div.innerHTML = `<div class='offcanvas-header d-flex justify-content-center'>
        <h5 class='offcanvas-title text-center' id='offcanvasBottomLabel'>${$msg}</h5>
      </div>`;
      div.style.height = "80px";
      document.body.appendChild(div);
      
    new bootstrap.Offcanvas(document.getElementById("offcanvasBottom")).show();
}

function showSpinner() {
    //Just in case one have been created already, we remove it
    if(document.querySelector(".spinner-div") != null){
    document.querySelector(".spinner-div").remove();
    }

    let div = document.createElement('div');
        div.className = 'd-flex justify-content-center spinner-div';
        div.innerHTML = `<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span></div`;
      
    document.body.appendChild(div);
}

function removeSpinner() {
    //Just in case one have been created already, we remove it
    if(document.querySelector(".spinner-div") != null){
    document.querySelector(".spinner-div").remove();
    }
}

function showAlert(caption, href, textWord, classToUse=null, bc=null) {
    //Just in case one have been created already, we remove it
    if(document.querySelector(".alert-modal") != null){
        document.querySelectorAll(".alert-modal").forEach(function (currentValue, currentIndex, listObj) {
            listObj[currentIndex].remove();
        });
        //document.querySelector(".modal").remove();
    }

    let div = document.createElement('div');
        div.className = 'modal fade alert-modal';
        div.id = 'myModal'
        div.setAttribute('tabindex', -1)
        div.setAttribute('role', 'dialog')
        div.setAttribute('aria-labelledby', 'myModalLabel')
        div.setAttribute('aria-hidden', 'true')
        div.innerHTML = `<div class='modal-dialog'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='btn-close' data-bs-dismiss='modal' aria-hidden='true'> </button> </div> <div class='modal-body'><div class='card'> <div class='card-body'><h5 class='card-title d-flex justify-content-center'>${caption}</h5></div><div class='card-footer'> <div class='btn-group d-flex justify-content-center' data-toggle='buttons'> <button type='button' class='close close-alert btn btn-dark btn-lg' data-bs-dismiss='modal' aria-hidden='true'>Cancel</button><a href='${href}' class='ms-2 ${classToUse} btn btn-danger btn-lg' data-bc="${bc}">${capitalLetters(textWord)}</a></div></div> <div id='responseArea'></div></div></div> </div></div>`;
      document.body.appendChild(div);
      
    new bootstrap.Modal(document.getElementById("myModal")).show();
}

function DisplayAsToast(msg, status='info') {
    let bgClass
    
    switch(status){
        case true:
            bgClass = 'bg-success'
            break;

        case false:
            bgClass = 'bg-danger'
            break;

        default:
            bgClass = 'bg-primary'
    }

    //Just in case one has been created already, we remove it
    if(document.querySelector("#notificationToastDiv") != null){
        document.querySelector("#notificationToastDiv").remove();
    }

    let div = document.createElement('div');
        div.className = 'position-fixed top-0 end-0 p-3 d-flex justify-content-end';
        div.id = 'notificationToastDiv'
        div.style.zIndex = '1100'
        div.innerHTML = `<div id="notificationToast" class="toast ${bgClass} text-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body">
          <button type="button" class="btn-close float-end" data-bs-dismiss="toast" aria-label="Close"></button>
          ${msg}
        </div>
      </div>`;
    
    document.body.appendChild(div);

    new bootstrap.Toast(document.getElementById("notificationToast")).show();
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

export {showCanvass, showSpinner, removeSpinner, showAlert, capitalLetters, getKey, keyGen, lazyLoadImages, empty, DisplayAsToast, getQueryStringsFromUrl, moneyFormat}