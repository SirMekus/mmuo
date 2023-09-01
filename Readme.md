# Mmuo

Mmuo is a Javascript library for making AJAX requests, alternative to native browser `alert()` function, image/file upload and many other 'utility' features that will/can be added at interval basis (or in the future) - This is why it is called **Mmuo** (the Igbo Language name of "spirit"); because you won't see it coming.

Especially for AJAX requests, you don't have to create AJAX scripts/files for different/specific pages anymore. This single package can take care of any AJAX request for you (as well as the following listed below). The package does the following at the moment (but can always be extended to include more features in the future):

- Image Preview/Upload
- Replacement of native browser's `alert()` function
- Performing AJAX **GET** requests
- Performing AJAX **POST** requests
- Exposes some AJAX loading indicator functions which you can use for your project
- Lazy-load Image(s)

## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Pre-built Features](#pre-built-features)
- [Registering Events](#registering-events)
- [Image Upload](#1-image-upload)
  - [Via Trigger](#via-trigger)
  - [Via Normal File Input](#via-normal-file-input)
- [Password Toogling](#2-password-toogling)
- [Check If Two Passwords Match](#3-check-if-two-passwords-match)
- [Generating Password](#4-generating-password)
- [Ask Before Running A Link](#5-ask-before-running-a-link)
- [Running AJAX GET Requests Via Links](#6-running-ajax-get-requests-via-links)
- [Running AJAX GET Requests In General](#7-running-ajax-requests-in-general)
  - [Returning Response](#returning-response)
- [Opening Page As Modal](#8-opening-page-as-modal)
- [Bonus](#bonus)  
  - [Emitting Events](#emitting-events)
  - [Utility Functions](#utility-functions)
    - [Displaying Spinner](#displaying-spinner)
    - [Displaying Pop Up Or Alert](#displaying-pop-up-or-alert)
    - [Lazy-loading Images](#lazy-loading-images)
    - [Bottom-To-Top Popup](#bottom-to-top-popup)

## Installation and Usage

To get started all you need to do is:

```bash
npm install mmuo
```

and you're in. The package exposes a `registerEventListeners()` function which already has some event listeners and classes for you to just dive right in. Simply import the function into your project and use right away. Example:

```javascript
import {registerEventListeners} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    registerEventListeners()
});
```

OR,

```javascript
window.mmuo = require("mmuo");

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    window.mmuo.registerEventListeners()
});
```

Or, if you prefer to link via `<script>` in HTML, especially if you don't use a bundler, then prefix the function(s) with **"`mmuo`"**:

```javascript
<script src="/path_to_node_module_or_installation_directory/mmuo/dist/mmuo.umd.js"></script>   
<script src="/path_to_axios_node_module_installation_directory"></script> 
<script src="/path_to_bootstrap_node_module_installation_directory"></script> 

<script>
    window.addEventListener("DOMContentLoaded", function() {
        mmuo.registerEventListeners()
    });
</script>
```

> Please note that this package requires Bootsrap to function effectively. And if you'll work with AJAX request, this package requires Axios as well. If you use a bundler you should import these dependencies into your application and set "bootstrap" and "axios" window variables. Example:

```javascript
//app.js or main.js
window.bootstrap = require('bootstrap');

window.axios = require('axios');
```

OR,

```javascript
//app.js or main.js
import * as bootstrap from '~bootstrap';
import axios from 'axios';

window.bootstrap =  bootstrap

window.axios = axios;
```

Please note that the `registerEventListeners` registers multiple events in the DOm. However, there may be case(s) where you just need to register or use a single event - for instance, only AJAX POST/Form request. In this case you should just import the needed event only. The event name is usually the function name suffixed with `'Event'`.

For instance, to use only the `triggerFileChanger` event in your project you will do:

```javascript
import {triggerFileChangerEvent} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    triggerFileChangerEvent()
});
```

It will import the function itself and also register the event so you don't have to do anything at all.

## Pre-built Features

Please note that in using this function some classes and/or ID's have already been defined and registered so all you have to do is assign any of these classes or ID's to your HTML element and you're good to go. The functions are already defined (in the `registerEventListeners` function imported earlier) and you can use them on your own if you want to create or listen to custom events on your own. The workflow, should you choose to register events on your own with a different class/ID name, should be the same:

| Class/ID | Event | Function | Description
| ----------- | ----------- | ----------- | ----------- |
| .select-photo | 'click' | `triggerFileChanger`| If you prefer to have the native file element 'replaced' (hidden actually) so that a visual, like an arrow or link, when clicked, triggers file upload then that arrow or link should have this class with a `data-targetClass="image"` attribute that points to the class name of the file input/element itself.
| .image | change | `uploadImage` | This is the file input element itself that controls file upload from client's browser. The above typically triggers it. You will ideally hide it by default but should always add the `data-preview="preview-upload"` attribute as this points to the `div' element/area where the selected content/image will be previewed.
|.remove-image | click | `removeImage` | This will typically remove any previewed image from the 'preview' `div` as well as the file input/element itself. Each previewed image comes with this button on top itself by default.
|.password-visibility | click | `togglePasswordVisibility` | This should be an `a` element nested within a `div` element which is a sibling to an `input` element. It optionally has a `data-id='password'` attribute with a value that points to the password input element you'll like to toggle. You can add more graphic quality by adding a `<i class="fas fa-eye-slash "></i>` within the `a` tag to as visual representation of the toggling.
| .password-checker | focusout | `checkIfPasswordsMatch` | This uses the `name` attribute for its operation and assumes that two `input` with **name** attribute values of **password** and **password_confirmation** respectively exists.These two input elements should have the this class in them. Also you should create or specify an element with `.password-checker-notification` class where the result of this confirmation will be displayed. By default this will only be displayed if the passwords don't match.
|.gen-password | click | `generatePassword` | Generates password depending on the configuration/type (specified in the data-attribute which will be shown with an example below) and displays the result in a typically `input` tag you may optionally specify via `data-target="password"` (where **password** is the name of the id. If you want it, like in a **password_confirmation** setting to also write this generated password in another input tag then that input element should have the same id suffixed with a **"2"**. E.g, `id="password2"`). If an element `.password-visibility` class is present it'll be automatically triggered.
|.pre-run | click | `alertBeforeRunning` | This replaces the native `alert()` function for something more appealing and friendly. It accepts optional `data-attribute=*` such as: `data-caption=*` if you want a different caption to be displayed to the user. For instance, **"Do you truly want to log out?"**; `data-classname=*` if you want a particular **class** to be added to the link that processes the request (should the user decide to proceed). This could be a class that makes an AJAX request in the background like our `.run-get-request` (which we'll learn of next).
|.run-get-request | click | `getRequest` | Performs an AJAX GET request. If you will like to do something with the result of the request, like a redirection, etc, you can add a `data-bc="[event_name]"` attribute to the request with any value. A `[event_name]` event will be emitted on successful request with any data from server passed to the event which you should then listen to on your own and do whatever you wish with the response or result.
|#form (or .form) | click | `postRequest` | Performs an AJAX POST request. It submits everything in the form. This should be used on a HTML form. You don't have to do anything at all. However, this works best with Laravel (PHP) as some response structures/patterns have been coded in it already.

All the above functions can simply be imported and used in your project.

> Note that these are just class/ID names you can use on the fly without any configuration and that these names, if they conflict with any class/ID name already in use, can be changed to your preference. However, you will have to manually register your events.
> Also note that proper styling is done with Bootstrap so you may want to include it in your project

## Registering Events

This works like Jquery's DOM event listener. To register an event, all you have to do is import the `on` function like so:

```javascript
import {on} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    on(elementOrSelector, event, functionToRun);
    //Where:
    //element => The element or selector you want to listen on
    //event => The event you want to listen to
    //functionToRun => The function you want to run as event listener
});
```

You can register a single event on multiple selectors or elements by separating each selector or element with spacing. E.g,

```javascript
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne', 'click', myFunctionOrYourFunctionToRun);

    /*
    OR,
    mmuo.on('.selectorOne', 'click', myFunctionOrYourFunctionToRun);

    */
});
```

or

```javascript
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne #selector2', 'click', myFunctionOrYourFunctionToRun);
});
```

or

```javascript
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne #selector2', 'click', function(event){
        //Do whatever you wish
    });
});
```

or

```javascript
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne .selector2', 'click', function(event){
        //Do whatever you wish
    });
});
```

If you will like to use our function(s) (as defined in the table above) then you should not forget to import the particular function(s) as well. You can add as many selectors you like to listen to the same event.

## Examples

Please note that the class names specified here are optional and you are free to use your own class names. The difference is that you will have to register your events yourself using any of our functions defined in the table above.

## 1 Image Upload

- ## Via Trigger

```javascript
<div class="preview-upload">
<!-- The selected photo will be displayed here -->
</div>

<div>
<!-- Notice where the "data-targetClass=*" points to. This button will trigger the user to select file from browser -->
    <a href="#" data-targetClass="image" class="select-photo">
        <i class="fas fa-plus-circle fa-sm"></i>
    </a>
</div>

<form enctype="multipart/form-data" action="#" method="post">
    <!-- Notice where the "data-preview=*" attribute points to - the div where the selected image will be displayed -->
    <input style="display:none;" type="file" class="image"
    data-preview="preview-upload" accept="image/*" />

    <div>
        <input type="submit" value="upload" />
    </div>
</form>
```

- ## Via Normal File Input

```javascript
<div class="preview-upload">
<!-- The selected photo will be displayed here. This is very important-->
</div>

<form enctype="multipart/form-data" action="#" method="post">
    <!-- Notice where the "data-preview=*" attribute points to-->
    <input type="file" class="image"
    data-preview="preview-upload" accept="image/*" />

    <div>
        <input type="submit" value="upload" />
    </div>
</form>
```

You can control the size of the image (so it doesn't display too large or occupy your screen) by styling the `div` or container where the image will be displayed. If you come from a Bootstrap CSS framework background you can simply give it the `d-flex` class (and can center the `div` as well with appropriate styling or Bootsrap class). Example:

```html
<div class='preview-upload d-flex'>

</div>
```

To explicitly specify allowed file formats (and/or file size) for your application simply set it via the `setImageUploadConfig()` function. Only files that conform to formats in the array will be recognised. Example:

```javascript
import {setImageUploadConfig} from "mmuo"

setImageUploadConfig({
    formats:["image/jpeg", "image/png", "image/gif", "image/webp", "audio/mpeg"],
    size:32132212
})
```

## 2. Password Toogling

Toggle between showing and hiding a password.

```javascript
<div>
    <label>Password</label>
    <input type="password" class="password-checker" id="password">

    <!-- data-id=* points to the ID of the password input we want to toggle-->
    <a class="password-visibility" data-id='password' href="#">
        <i class="fas fa-eye-slash "></i>
    </a>
</div>
```

## 3. Check If Two Passwords Match

Just make sure they (inputs) have the `name` attributes set to **"password"** and **"password_confirmation"** respectively alongside the **"password-checker"** class name

```html
<div>
    <label>Create Password</label>
    <input type="password" class="password-checker" name="password">

    <!-- This can be placed anywhere on the page (but with this particular class name (password-checker-notification)). The goal is to display message to the user if the passwords don't match-->
    <span class="password-checker-notification"></span>
</div>

<div>
    <label>Re-enter Password</label>
    <input type="password" class="password-checker" name="password_confirmation" />
</div>
```

## 4. Generating Password

Give the button a `gen-password` class and place it to the input element you want it to be displayed in. Example:

```html
<div>
    <label>Enter Password</label>
    <input type="password" data-name="second password" id="password"/>
    
    <button data-strength="decent_pw" data-target="password" class="gen-password">
        <!-- The font below is optional and just for visuals-->
        <i class="fas fa-key"></i>
    </button>
</div>
```

Or, if you have double password fields (like in a password confirmation settings), the second field should have the same ID but end with a **"2"**:

```html
<div>
    <label>Enter Password</label>
    <input type="password" data-name="second password" id="password"/>

    <label>Re-enter Password</label>
    <input type="password" data-name="second password" id="password2"/>

    <button data-strength="decent_pw" data-target="password" class="gen-password">
        <!-- The font below is optional and just for visuals-->
        <i class="fas fa-key"></i>
    </button>
</div>
```

The `data-strength=*` attribute can have any of the following values:

- decent_pw
- strong
- stronger
- knox_password
- ci
- type_160
- type_504
- type_64
- type_128
- type_152
- type_256

If not specified, or an invalid value is used, the default is **decent_pw**

## 5. Ask Before Running A Link

```html
<a class="pre-run" data-caption="Would you like to buy me Shawama or Nkwobi as well?" data-classname="run-get-request" data-bc="logout" href="https://www.webloit.com">Shop Now</a>
```

The **"pre-run"** (but you can give it a different name) class is the most important here. It is important that only this class be present unless other classes are just for styling or won't affect our process. The following are explained:

- `data-caption=*` => A message that will be displayed to the user as an instruction or warning

- `data-classname=*` => Any class you want to be added to the link that will perform the user's click action if (s)he continues the action. This may be for styling or our **"AJAX GET REQUEST"** class (which we'll touch shortly)

- `data-bc=*` (optional) => In the link that will perform the user's action you can decide whether an event should be fired when successful. We'll touch this in the documentation soon (below).

Note that these are optional and that there are defaults in place already such that you can just simply do:

```html
<a class="pre-run" href="https://www.webloit.com">Shop Now</a>
```

And it will mean the same thing using our defined values.

## 6. Running AJAX GET Requests Via Links

A simple one looks just like this:

```html
<a class='run-get-request' href="/delete-user">Remove</a>
```

By default, on successful completion, it won't display any information on screen. However, if it fails you'll be notified with a prompt on screen (if the request was made via AJAX). If you will like to do something on successful completion then you should add an event via the `data-bc=*` property which you can listen to and do whatever you wish.

You can also warn (or instruct) before running the request by using the strategy discussed in the previous block and then including the class that controls the AJAX GET request via `data-classname=*` like below:

```html
<a class='pre-run' data-caption="Are you sure you want to remove this user?" data-classname="run-get-request"
href="/delete-user">Remove</a>
```

Or with adding an event:

```html
<a class='pre-run' data-caption="Are you sure you want to remove this user?" data-classname="run-get-request" data-bc="user_removed" 
href="/delete-user">Remove</a>
```

## 7. Running AJAX Requests In General

We advice that each input type be placed within a `div` for proper styling and alignment. If you use our `registerEventListeners()` function then make sure the `form` has the id or class attribute set to `form`. Example:

```html
<form action="submit" id="form" method="post">
    <div>
        <input type="text" name='name'>
    </div>

    <div>
        <input type="email" name='email'>
    </div>

    <div>
        <input type="password" name='password'>
    </div>
    
    <div>
        <input type="submit" value="Log In" />
    </div>
</form>
```

You can put as many input elements as you like and they'll be submitted to your server. By default the request will be sent as `"FormData"`. However, you can choose to send the request in `REQUEST PAYLOAD` (JSON) format. In this case you just have to specify it as a data attribute in the form tag itself and the library will take care of the rest. Example:

``` html
<form action="submit" id="form" method="post" data-json='true'>
    <div>
        <input type="text" name='name'>
    </div>

    <div>
        <input type="email" name='email'>
    </div>

    <div>
        <input type="password" name='password'>
    </div>
    
    <div>
        <input type="submit" value="Log In" />
    </div>
</form>
```

### NB: This transformation is only possible with non-GET requests

It is important that your submit button has a `type="submit"` attribute so we can identify the trigger. Also, as much as possible, try to enclose your `input` tag(s) in a `div`.

---

## Returning Response

When returning response from server (which will usually come in a JSON format) **Mmuo** will try to detect if it has a **"message"** property and then display it as successful (or failure) message to the user else it falls to default and just displays whatever was sent to the client. Unless you just send a plain string as response, you should structure your response. An example is:

```json
{
    "message": {
        "message":"Your message"
    }
}
```

OR

```json
{
    "message":"Your message"
}
```

OR

```json
{
    "Your message"
}
```

Or, if it is a validation message based on some form request (with a **HTTP status** of 422):

```json
{
    "message": {
        "message":"Please enter your email address here",
        "target":"email" //This refers to the HTML input element that this validation message is meant for (if any). It is completely optional and should have the target's value as the exact input "NAME" attribute
    }
} 
```

OR

```json
{
    "message":"Please enter your email address here",
    "target":"email" //This refers to the HTML input form 'NAME' that this validation message is meant for (if any). It is completely optional and should have the target's value as the exact input "NAME" attribute
}
```

With the above the appropriate error message will be displayed right next after the input element it's (message) meant for (as long as the appropraite **HTTP status code** is set. For form request(s) please use **422** for error response(s) when dealing with form validation).

---

> If you use our [Zam PHP package](https://github.com/SirMekus/zam), using the `request()` function, this has already been taken care of so you can just, in case of form validation, pass a string as documented in the package.
> If you, however, return response manually - maybe after some checks and validation - a `message` key will always be set so you don't have to set it yourself unless you are passing in an array which you'll like to listen to in the front-end (via event listening as discussed below). Example:

```php
//php
//Default status code is 200
return response('your success response');
```

OR

```php
//php
//With your preferred status code
return response('your error response', 422);
```

OR

```php
//php
//This should always be 200.
return response(['message'=>'your success response', 'url'=>'webloit.com']);
```

---

If you wish to pass an array but wish for a particular response/message to be displayed to the user (from the array) then you must name that array key `message` (though it may not always be displayed to the user).

If you want a redirect to take place on successful request then you should pass the URL/link you want the user to be directed to (as response) by adding a `url` property to the response. Please note that redirection is only done on successful response. If you will like it to done at your own convenience then pass an event and listen to it so you can implement it the way you like. A typical response may look like:

```json
{
  "url": "https://www.webloit.com"
}
```

OR

```json
{
  "message": "Your message",
  "url": "https://www.webloit.com"
}
```

OR

```json
{
    "message":{
        "message": "Your message",
        "url": "https://www.webloit.com"
    }
}
```

If you want the link to be opened on a different tab then you should add a `data-ext` attribute to your form tag (with any value; it doesn't matter here). Example:

```html
<form action="submit" id="form" method="post" data-ext='true'>
//
</form>

```

For proper message styling and presentation we use the **HTTP status** to detect error or failed request(s) so when returning response(s) we advice you use appropriate **HTTP status header(s)**. No need to append the "Status Code" as property in the result in the reward because we don't use it.

## 8. Opening Page As Modal

You may want to open a page (via a link) as a modal. This page should typically only contain elements without the `html` or `body` tag; for instance, a form. If you imported the `registerEventListeners` function of this package in your project there is already an event listener for such. All you need to do is give an `a` element the `open-as-modal` class and you're good to go (Or, import the function itself - `openAsModal` - and attach to your custom event listener (if you didn't and will like to use some of our functions itself)) Example:

```HTML
<a href="/your-link-goes-here" class="open-as-modal">Open Modal</a>
```

The link will be called and the called page will be displayed as modal in the modal box.

By default, the modal will occupy the full screen on desktop or a bigger device (but will be contained on smaller device(s)). To make the modal smaller on desktop give it a `data-shrink` attribute with any value you like. Example:

```HTML
<a href="/your-link-goes-here" class="open-as-modal" data-shrink='true'>Open Modal</a>
```

Also, clicking outside the modal body will close the modal. To disable this behaviour set a data `data-static` with any value you like. Example:

```HTML
<a href="/your-link-goes-here" class="open-as-modal" data-static='true'>Open Modal</a>
```

Now clicking outside the modal will not close the modal anymore.

---

## BONUS

---

## Emitting Events

For either GET or POST requests you may want to perform some other actions as well when the request is successful. You can simply do this by adding a `data-bc=*` attribute to either the `a` element or `form` tag with the name of the event you want to emit as value. We will then emit this event when the request is successful (a **200 HTTP status code** is received) which you can listen to in your project. We'll pass across any data received from the server as parameter in the emitted event as well so you can inspect and do whatever you wish with it. Example:

```html
<form data-bc="myevent" action="/action" class="form" method="get">
    //input
</form>
```

And then listen to it like so:

```javascript
document.addEventListener("myevent", (event) => {
    //event => contains the response from server and some other properties which you should inspect to find out
});
```

---

## Utility Functions

> Please note that these functions depend on Bootstrap for operation, and are among some of the functions exposed by this package for your consumption.

---

## Displaying Spinner

You may want to indicate to user that an action is taking place. You can import and use our `showSpinner` function for this. E.g

```javascript
import {showSpinner, removeSpinner} from "mmuo"

showSpinner()
axios.get("http://www.example.com").then((response) => {
        //success
    }).catch((error) => {
        //nsogbu (request failure)
    }).then(() => {
        removeSpinner()
    })
```

To give your spinner a theme color you should define a CSS `--color-theme` variable in your project

## Displaying Pop Up Or Alert

This is typically used to warn or instruct a user after clicking a link before carrying the action of the link (consider it a replacement to browser's `alert()`). Simply use our `showAlert` function like so:

```javascript
import {showAlert} from "mmuo"

showAlert(caption, link, textWord, classToUse=null, bc=null)

//String: caption => The caption or instruction that should be displayed to the user
//String: link => The link which the user can click to continue [default] action
//String: textWord = What text the link ('a' element) should have
//String: classToUse (optional): What class(es) should be added to the link tag/element
//bc => What event should be generated when user clicks the link. This is typically used if using any of our AJAX function.
```

## Lazy-loading Images

If you have to display multiple images on your page it may take time and consume bandwith of user downloading all the images at once. We can save time and increase page load (and speed) by only downloading image(s) when it/they is/are within view. To do this, instead of giving an `src` attribute to your image, give it a `data-src` attribute with the url of the image and the image will be displayed only when into view. For example:

```HTML
<img data-src="/link/to/image.jpg" />
```

```javascript
import {lazyLoadImages} from "mmuo"

//You will usually want to do this when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", function() {
    lazyLoadImages()
});
```

## Bottom-To-Top Popup

You may want to display a message to the user after/before an action and will like it to appear from below the user's screen, simply do:

```javascript
import {showCanvass} from "mmuo"

//You will usually want to do this when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", function() {
    //Pass your message across as argument
    showCanvass(message)
});
```

---

## Meanwhile

 You can connect with me on [LinkedIn](https://www.linkedin.com/in/sirmekus) for insightful tips and so we can grow our networks together.

 Patronise us on [Webloit](https://www.webloit.com).

 And follow me on [Twitter](https://www.twitter.com/Sire_Mekus).

 I encourage contribution even if it's in the documentation. Thank you
