# Mmuo

Mmuo is a Javascript library aimed at making life easy for developers in running common day-to-day tasks. It simplifies task like event handling, DOM manipulation (you'll so much love this) and some utility functions that which are documented below. This is why it is called **Mmuo** (the Igbo Language name of "spirit"); because you won't see it coming.

## Table of Contents

- [Installation and Usage](#installation-and-usage)
- [Pre-built Event Listeners](#pre-built-event-listeners)
- [Registering Events](#registering-events)
- [DOM Manipulation](#dom-manipulation)
  - [Available Methods](#available-method)
- [Utility Functions](#utility-functions)
- [Event Functions](#event-functions)

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
<script src="/path_to_axios_node_module_installation_directory"></script> 
<script src="/path_to_bootstrap_node_module_installation_directory"></script> 

<script>
    window.addEventListener("DOMContentLoaded", function() {
        mmuo.defaultEventListeners()
    });
</script>
```

> Please note that some features in this package (AJAX request, Alert, etc), if you're coming from previous/older version, have been moved to a new repo/package - Ije. Visit the [Ije](https://www.github.com/SirMekus/ije) repository for more information.

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
|.gen-password | click | `generatePassword` | Generates password depending on the configuration/type (specified in the data-attribute which will be shown with an example [below](#2-utility-functions)) and displays the result in a typical `input` tag you may optionally specify via `data-target="password"` (where **password** is the name of the id. If you want it, like in a **password_confirmation** setting, to also write this generated password in another input tag then that input element should have the same id suffixed with a **"2"**. E.g, `id="password2"`). If an element `.password-visibility` class is present it'll be automatically triggered.

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
<div class="form-group mt-3">
    <label>Create Password</label>
    <div>
        <input type="password" class="password-checker"
        id="password" name="password">
    </div>
    <span class="password-checker-notification"></span>
</div>

<div class="form-group mt-3">
    <label>Re-enter Password</label>
    <div class="input-group">
        <input type="password" class="password-checker" id="password2" name="password_confirmation" />
    </div>
</div>
```

- ### Generate Password

```html
<div class="form-group mt-3">
    <label>Create Password</label>
    <div>
        <input type="password" class="password-checker"
        id="password" name="password">
    </div>
    <span class="password-checker-notification"></span>
</div>

<div class="form-group mt-3">
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

Here, `data-strength` can have any value as defined in the `getKey(strength = null)` in the Utility Functions section.

## Registering Events

This works like Jquery's DOM event listener. Inside your listener your function will have access to a special property or keyword called `this` which refers to the element on which the event was fired. You can use this `this` keyword for easy DOM manipulation. To register an event, all you have to do is import the `on` function like so:

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

/*
OR,

import { element as $} from "mmuo"

if you want to have the Jquery feeling and make the function shorter
*/

element('p');

```

The above will create a new DOM element (but won't insert it yet). You can apply other DOM manipulations until you finally insert it using any of the methods defined below. Please note that only valid selectors and tags should be passed into this function.

> For the rest of this documentation we shall use `import { element as $} from "mmuo"` instead.

If, however, you want to manipulate an element that is already in the DOM, simply supply a `false` second parameter to the function. E.g

```javascript
import { element as $} from "mmuo"

$('a', false).toggle('btn-danger');

```

This will select every `<a>` tag in the DOM.

If, however, you want to work on a particular element - for instance on the particular button that was clicked on - say, for an event, simply pass the element (retrieved via any "normal" Javascript DOM retrieval methods) as argument to the function. If you use our event listener then you will already have access to a special `this` keyword which is a reference to the the element that was clicked on. E.g:

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
    //this => the element that was clicked on
});

```

- ## Available Methods

  After instantiating the function, the following methods are available for use:

1. `id(id)` - Set the `id` attribute to `id`
2. `toggleClass(className)` - toggles the class with `className`
3. `attr(name, value=null)` - sets the `name` attribute property to `value`. If `value` is empty, it returns the value of `name` attribute of the element.
4. `removeAttr(attr)` - removes `attr` attribute from the element
5. `css(property, value=null)` - sets the css `property` to `value`. If `value` is empty, it returns the value of css `property` of the element.
6. `addClasses(classes)` - adds multiple `classes` (each separated by space) to the element.
7. `addClass(class)` - adds a singe `class` to the element.
8. `contains(className)` - checks if the element contains a class called `className`. It returns `true` or `false`.
9. `removeClass(className)` - removes the `className` class from the element.
10. `text(content=null)` - sets the inner HTML to the `content`. If an empty parameter is passed, it returns the content (if any) instead.
11. `value(content=null)` - sets the value property of an input field to `content`. If an empty parameter is passed, it returns the value (if any) instead.
12. `appendTo(element)` - appends the newly-created DOM element to `element`. `element` can be a retrieved DOM node already or a string which represents a valid HTML tag and/or a selector.
13. `insertAfter(element)` - inserts the newly-created DOM element after `element`. `element` can be a retrieved DOM node (object) or a string which represents a valid HTML tag and/or a selector.
14. `insertBefore(element)` - inserts the newly-created DOM element before `element`. `element` can be a retrieved DOM node (object) or a string which represents a valid HTML tag and/or a selector.
15. `remove()` - removes the element from the DOM.
16. `getDomElement()` - returns the DOM instance of the created or selected element
17. `isPresent()` - checks if the element exists in the DOM.

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

- ## Event Functions

The functions here have already been registered in `defaultEventListeners()` function with appropriate class/ID names as described above. However, if you want specific event(s) or feature(s) instead of the whole events registered by `defaultEventListeners()` function you can simply import and use any of these events. More details of these functions have been dropped above; they follow the same protocol/procedure and must use the class/ID name discussed above.

1. `togglePasswordVisibilityEvent` - toggles the visibility of password fields

2. `checkIfPasswordsMatchEvent` - checks if two password fields match. This can be used for 'password confirmation' - to inform users whether their 'confirmation password' matches their 'password'. if you have double password fields (like in a password confirmation settings), the second field should have the same ID but end with a **"2"**

3. `generatePasswordEvent` - generates random password for the user.

Example usage:

```javascript
import { generatePasswordEvent } from "mmuo"

generatePasswordEvent()

```

---

## Meanwhile

 You can connect with me on [LinkedIn](https://www.linkedin.com/in/sirmekus) for insightful tips and so we can grow our networks together.

 Visit us on [i-runs](https://www.i-runs.com).

 And follow me on [Twitter](https://www.twitter.com/Sire_Mekus).

 I encourage contribution even if it's in the documentation. Thank you
