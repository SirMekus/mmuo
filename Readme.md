# Mmuo

Mmuo is a Javascript library aimed at making life easy for developers in running common day-to-day tasks. It simplifies task like event handling, DOM manipulation (you'll so much love this), form submission via AJAX and some utility functions which are documented below. This is why it is called **Mmuo** (the Igbo word for "spirit"); because you won't see it coming.

Especially for AJAX requests, you don't have to create AJAX scripts/files for different/specific pages anymore. This single package can take care of any AJAX request (form submission) for you (as well as the following listed in the Table of Contents).

> [!IMPORTANT]
> Please note that some previous features in this package such as: Alert, Modal box, Image upload/manipulation etc, if you're coming from previous/older versions, have been moved to a new repo/package - Ije. Visit the [Ije](https://www.github.com/SirMekus/ije) repository for more information.

## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Pre-built Event Listeners](#pre-built-event-listeners)
- [Form Submission Via AJAX](#form-submission-via-ajax)
  - [Returning Response](#returning-response)
  - [Emitting Event](#emitting-event)
- [Registering Event Listeners](#registering-event-listeners)
- [DOM Manipulation](#dom-manipulation)
  - [Available Methods](#available-methods)
- [Utility Functions](#utility-functions)
- [Event Functions](#event-functions)
- [Lazy-load Images](#lazy-load-images)

## Installation and Usage

To get started all you need to do is:

```bash
npm install mmuo
```

and you're in. The package exposes a `defaultEventListeners()` function which already has some event listeners and classes for you to just dive right in. Simply import the function into your project and use right away. Example:

```javascript
import {defaultEventListeners} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    defaultEventListeners()
});
```

OR,

```javascript
window.mmuo = require("mmuo");

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    window.mmuo.defaultEventListeners()
});
```

Or, if you prefer to link via `<script>` in HTML, especially if you don't use a bundler, then prefix the function(s) with **"`mmuo`"**:

```javascript
<script src="/path_to_node_module_or_installation_directory/mmuo/dist/mmuo.umd.js"></script>

<script>
    window.addEventListener("DOMContentLoaded", function() {
        mmuo.defaultEventListeners()
    });
</script>
```

> Replace <b>"path_to_node_module_or_installation_directory"</b> with the actual directory where `Mmuo` is installed on your system.

Please note that the `defaultEventListeners` registers multiple events in the DOM. However, there may be case(s) where you just need to register or use a single event. In this case you should just import the needed event only. The event name is usually the function name suffixed with `'Event'`.

For instance, to use only the `togglePasswordVisibilityEvent` event in your project you will do:

```javascript
import {togglePasswordVisibilityEvent} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    togglePasswordVisibilityEvent()
});
```

It will import the function itself and also register the event so you don't have to do anything at all.

## Pre-built Event Listeners

Please note that in using this function (`defaultEventListeners`) some classes and/or ID's have already been defined and registered so all you have to do is assign any of these classes or ID's (as tabulated below) to your HTML element and you're good to go. The functions are already defined and you can use them on your own if you want to create or listen to custom events. The workflow, should you choose to register events on your own with a different class/ID name, should be the same (just make sure you import the right function):

| Class/ID | Event | Function | Description
| ----------- | ----------- | ----------- | ----------- |
|.password-visibility | click | `togglePasswordVisibility` | This should be an `a` element nested within a `div` element which is a sibling to an `input` element. It optionally has a `data-id='password'` attribute with a value that points to the password input element you'll like to toggle. You can add more graphic quality by adding a `<i class="fas fa-eye-slash "></i>` within the `a` tag for visual representation of the toggling. This requires Font Awesome though.
| .password-checker | focusout | `checkIfPasswordsMatch` | This uses the `name` attribute for its operation and assumes that two `input` with **name** attribute values of **password** and **password_confirmation** respectively exists.These two input elements should have the same class name (`password-checker`) in them. Also you should create or specify an element with `.password-checker-notification` class where the result of this confirmation will be displayed. By default this will only be displayed if the passwords don't match.
|.gen-password | click | `generatePassword` | Generates password depending on the configuration/type (specified in the data-attribute which will be shown with an example [below](#utility-functions)) and displays the result in a typical `input` tag you may optionally specify via `data-target="password"` (where **password** is the name of the id. If you want it, like in a **password_confirmation** setting, to also write this generated password in another input tag then that input element should have the same id suffixed with a **"2"**. E.g, `id="password2"`). If an element `.password-visibility` class is present it'll be automatically triggered.
|#form (or .form) | submit | `postRequest` | Performs an AJAX request. It submits everything in the form. This should be used on a HTML form. You don't have to do anything at all. However, this works best with [structured response](#returning-response) from the back-end.

All the above functions can simply be imported and used in your project.

> Note that these are just class/ID names you can use on the fly without any configuration and that these names, if they conflict with any class/ID name already in use, can be changed to your preference. However, you will have to manually register your events.

## Example

- ### Password Visibility

```html
<div class="form-group mt-3">
    <label>Create Password</label>
    <div>
        <input type="password" id="password" name="password">
        <div>
            <a class="password-visibility" data-id='password' href="#">
                <i class="fas fa-eye-slash "></i>
            </a>
        </div>
    </div>
</div>
```

- ### Password Checker

```html
<div>
    <label>Create Password</label>
    <div>
        <input type="password" class="password-checker"
        id="password" name="password">
    </div>
    <span class="password-checker-notification"></span>
</div>

<div>
    <label>Re-enter Password</label>
    <div class="input-group">
        <input type="password" class="password-checker" id="password2" name="password_confirmation" />
    </div>
</div>
```

- ### Generate Password

```html
<div>
    <label>Create Password</label>
    <div>
        <input type="password" class="password-checker"
        id="password" name="password">
    </div>
    <span class="password-checker-notification"></span>
</div>

<div>
    <label>Re-enter Password</label>
    <div class="input-group">
        <input type="password" class="password-checker" id="password2" name="password_confirmation" />
        <div>
            <button data-strength="decent_pw" data-target="password"
            class="gen-password">
            <i class="fas fa-key"></i>
            </button>
        </div>
    </div>
</div>
```

Here, `data-strength` can have any value as defined in the `getKey(strength = null)` in the [Utility Functions](#utility-functions) section.

## Form Submission Via AJAX

Form submission is an integral part of websites these days. Practically every site has one or two forms that are submitted to the server (back-end). However, we know that making the submission process feel seamless is the default or go-to these days. This process is done most times via AJAX request where the form can be submitted without a browser refresh. `Mmuo` takes care of this for you; all you have to do is add `"form"` to the class or ID attribute of your HTML **form tag** and any request to the backend will be intercepted and "AJAX-ed". Very simple.

> We advice that each `input` type be placed within a `div` for proper styling and alignment. If you use our `defaultEventListeners()` function then make sure the `form` has the id or class attribute set to **"form"**. Example:

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

You can put as many input elements as you want and they'll be submitted to your back-end. By default the request will be sent as **"FormData"**. However, you can choose to send the request in `REQUEST PAYLOAD` (JSON) format. In this case you just have to specify it as a data attribute (`data-json`) in the form tag itself and the library will take care of the rest. Example:

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

> NB: This transformation is only possible with non-GET requests

It is important that your submit button has a `type="submit"` attribute so we can identify the trigger. Also, as much as possible, try to enclose your `input` tag(s) in a `div`.

Also, when request to server is in progress, whatever value the "submit" button has is replaced with a generic **"...in progress"** value (as an indicator) until the request is completed then the original value will be restored. If you would like a different message to be displayed to the user then you should specify it by adding a `data-mmuo-start` attribute with the value referencing what you want to be displayed.

Alternatively, since the `defaultEventListeners` function registers multiple event listeners at once, you may be interested in just the AJAX functionality of this package. For this reason you can simply inport the function that handles it and call it in your own JS file like so:

```javascript
import { postRequestEvent } from "mmuo"

window.addEventListener("DOMContentLoaded", function() {
    postRequestEvent();
})
```

Just remember to give your HTML form tag the class or ID attribute value of `form`. That is all.

However, you may choose to not want to use `form` as name for either the class or ID attribute for whatever reason. You may have your own selector or element which you may wish to target instead. For this, you can simply import the function itself that handles AJAX request like so and then register it to your own handler:

```javascript
import { on, postRequest } from "mmuo"

window.addEventListener("DOMContentLoaded", function() {
    on("#your-selector", "submit", postRequest);
})
```

## Returning Response

When returning response from server (which should usually come in a JSON format) **Mmuo** will try to detect if it has a **"message"** property and then display it as a successful (or failure) message to the user else it falls to default and just displays whatever was sent to the client. Unless you just send a plain string as response, you should always structure your response. An example is:

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
    "target":"email" //This refers to the HTML input form 'NAME' attribute that this validation message is meant for (if any). It is completely optional and should have the target's value as the exact input "NAME" attribute
}
```

With the above, the appropriate error message will be displayed right next after the input element it's (message) was meant for (as long as the appropraite **HTTP status code** is set. For form request(s) please use **422** for error response(s) when dealing with form validation).

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
return response(['message'=>'your success response', 'url'=>'https://www.i-runs.com']);
```

---

If you wish to pass an array but wish for a particular response/message to be displayed to the user (from the array) then you must name that array key `message` (though it may not always be displayed to the user).

If you want a redirect to take place on successful request then you should pass the URL/link you want the user to be directed to (as response) by adding a `url` property to the response. Please note that redirection is only done on successful response. If you will like it to done at your own convenience then pass an event and listen to it so you can implement it the way you like. A typical response may look like:

```json
{
  "url": "https://www.i-runs.com"
}
```

OR

```json
{
  "message": "Your message",
  "url": "https://www.i-runs.com"
}
```

OR

```json
{
    "message":{
        "message": "Your message",
        "url": "https://www.i-runs.com"
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

---

## Emitting Event

After form submission you may want to perform some other actions as well when the request is successful. You can simply do this by adding a `data-bc=*` attribute to either the `form` tag with the name of the event you want to emit as value. We will then emit this event when the request is successful (a **200 HTTP status code** is received) which you can listen to in your project. We'll pass across any data received from the server as parameter in the emitted event as well so you can inspect and do whatever you wish with it. Example:

```html
<form data-bc="myevent" action="/action" class="form" method="get">
    ...
</form>
```

And then listen to it like so:

```javascript
document.addEventListener("myevent", (event) => {
    //event => contains the response from server and some other properties which you should inspect to find out
});
```

---

## Registering Event Listeners

This works like Jquery's DOM event listener. Inside your listener your callback function will have access to a special property or keyword called `this` which refers to the element on which the event was fired. You can use this `this` keyword for easy DOM manipulation. To register an event, all you have to do is import the `on` function like so:

```javascript
import {on} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    on(elementOrSelector, event, functionToRun);
    //Where:
    //element => The element or selector you want to listen on
    //event => The event you want to listen to. E,g, click, focus, etc
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

## DOM Manipulation

DOM Manipulation here works just like Jquery's. In fact, it was inspired by our love for Jquery. It also supports method chaining; that is, you can perform multiple operations at once. You can use this function to create a new DOM element or manipulate an existing element. E.g

```javascript
import { element } from "mmuo"

element('p');

```

OR,

```javascript
//if you want to have the Jquery feeling and make the function shorter
import { element as $ } from "mmuo"

$('p');

```

The above will create a new DOM element (but won't insert it yet). You can apply other DOM manipulations until you finally insert it using any of the methods defined below. Please note that only valid selectors and tags should be passed into this function.

> For the rest of this documentation we shall use `import { element as $} from "mmuo"` instead.

If, however, you want to manipulate an element that is already in the DOM, simply supply a `false` second parameter to the function. E.g

```javascript
import { element as $} from "mmuo"

$('a', false).toggle('btn-danger');

```

This will select every `<a>` tag in the DOM.

If, however, you want to work on a particular element - for instance on the particular button that was clicked on - say, for an event, simply pass the element (retrieved via any "normal" Javascript DOM retrieval methods) as argument to the function. 

> If you use our `on` function to listen to events then you will already have access to a special `this` keyword which is a reference to the element that was clicked on. E.g:

```javascript
import { element as $, on } from "mmuo"

on('a', 'click', function(event){
    event.preventDefault();

    $(this, false).toggle('btn-danger');
    //this => the element that was clicked on
});

```

OR,

```javascript
import { element as $, on } from "mmuo"

on('a', 'click', function(event){
    event.preventDefault();

    $(document.querySelector('.selector'), false).toggle('btn-danger');
});

```

- ## Available Methods

  After instantiating the function, the following methods are available for use:

1. `id(id)` - Set the `id` attribute to `id`
2. `toggle(className)` - toggles the element with the class name **"className"**
3. `attr(name, value=null)` - sets the `name` attribute property to `value`. If `value` is empty, it returns the value of `name` attribute of the element.
4. `removeAttr(attr)` - removes `attr` attribute from the element
5. `css(property, value=null)` - sets the css `property` to `value`. If `value` is empty, it returns the value of css `property` of the element.
6. `addClasses(classes)` - adds multiple `classes` (each separated by space) to the element.
7. `addClass(class)` - adds a singe `class` to the element.
8. `contains(className)` - checks if the element contains a class called `className`. It returns `true` or `false`.
9. `removeClass(className)` - removes the `className` class from the element.
10. `text(content=null)` - sets the text content of the element to the `content`. If an empty parameter is passed, it returns the content (if any) instead. This method will render any HTML element as string and not as HTML.
11. `val(content=null)` - sets the value property of an input field to `content`. If an empty parameter is passed, it returns the value (if any) instead.
12. `appendTo(element=null)` - appends the newly-created DOM element to `element`. `element` can be a retrieved DOM node already or a string which represents a valid HTML tag and/or a selector. If no argument is passed it will be appended to the `body`.
13. `insertAfter(element)` - inserts the newly-created DOM element after `element`. `element` can be a retrieved DOM node (object) or a string which represents a valid HTML tag and/or a selector.
14. `insertBefore(element)` - inserts the newly-created DOM element before `element`. `element` can be a retrieved DOM node (object) or a string which represents a valid HTML tag and/or a selector.
15. `remove()` - removes the element from the DOM.
16. `getDomElement()` - returns the DOM instance of the created or selected element
17. `isPresent()` - checks if the element exists in the DOM.
18. `data(dataset)` - returns a `data attribute` value for an element.
19. `parent()` - gets the parent element of the element supplied in the constructor.
20. `scrollHeight()` - gets the scroll height of the element.
21. `scrollToBottom()` - scrolls the element to bottom of document.
22. `scrollIntoView()` - scrolls/brings the element into view.
23. `html(content=null)` - sets the innerHTML content of the element to the `content`. If an empty parameter is passed, it returns the innerHTML content (if any) instead. This method will render any HTML as HTML.
24. `removeElement(selector)` - removes elements (identified as `selector` - could be an ID or Class name) that are children of the original selector element used to initialise this operation.
25. `find(selector)` - searches for the  `selector` element in the DOM.
26. `each(funct)` - executes the given function for each matched node from the `selector` used to initialise this operation. Inside your function you have access to a special variable called `this` which refers to the current node executing which is an object. You can also perform normal DOM operation using our methods for each of the node.
27. `sibling()` - gets the next sibling element.

- ## Utility Functions

1. `empty(val)` - checks if the supplied value is empty or null
2. `capitalLetters(value)` - converts the first letter of each word in `value` to capital letter
3. `lazyLoadImages()` - lazy-load images. Instead of using `src` for your image, when using this function, use `data-src` as your `src` instead. The image will only be loaded when it is in view in the DOM.
4. `getKey(strength = null)` - generates a secured and randomised string that can be used as key or password. The values which `strength` can have are limited to:

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

5. `getQueryStringsFromUrl(url)` - returns all the query strings from a URL as an object.
6. `moneyFormat(amount, currency = "NGN")` - formats the value of `amount` into a nice-looking money format. For instance, NGN1000 will be formatted to NGN 1,000 for easy readability.
7. `queryString(name, url = window.location.href)` - gets the `name` property value of the query string from the `URL`. The current URL is used when no URL argument is passed.
8. `generateAlphabet(capital=true)` - generates english alphabets in either capital or small letters. This is useful if you want to 'number' a list or give options like in an exam or interview.
9. `isFloat(value)` - checks if `value` is a float number. Returns true or false.
10. `formatNumber(number, precision=null)` - formats the `number` to `precision` number of decimals. If `number` is an integer it is untouched.
11. `isEven(number)` - checks if `number` is an even number. Returns true or false.

- ## Event Functions

The functions here have already been registered in `defaultEventListeners()` function with appropriate class/ID names as described above. However, if you want specific event(s) or feature(s) instead of the whole events registered by `defaultEventListeners()` function you can simply import and use any of these events. More details of these functions have been dropped above; they follow the same protocol/procedure `and must use the class/ID name discussed above`.

1. `togglePasswordVisibilityEvent` - toggles the visibility of password fields

2. `checkIfPasswordsMatchEvent` - checks if two password fields match. This can be used for 'password confirmation' - to inform users whether their 'confirmation password' matches their 'password'. if you have double password fields (like in a password confirmation settings), the second field should have the same ID but end with a **"2"**

3. `generatePasswordEvent` - generates random password for the user.

Example usage:

```javascript
import { generatePasswordEvent } from "mmuo"

generatePasswordEvent()

```

- ## Lazy-load Images

To lazy-load an image, instead of giving it an `src` attribute, give it a `data-src` attribute with its value set to the URL/link of the image then import and use the `lazyLoadImages()` function. That is all. You can do it for any number of images and they'll be lazy-loaded when they come into view. Example:

```javascript
import { lazyLoadImages } from "mmuo"

window.addEventListener("DOMContentLoaded", function() {
    lazyLoadImages()
});

```

---

## Meanwhile

 You can connect with me on [LinkedIn](https://www.linkedin.com/in/sirmekus) for insightful tips and so we can grow our networks together.

 Visit us on [i-runs](https://www.i-runs.com).

 And follow me on [Twitter](https://www.twitter.com/Sire_Mekus).

 I encourage contribution even if it's in the documentation. Thank you
