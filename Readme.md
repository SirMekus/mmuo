# Mmuo

Mmuo is a Javascript library for making AJAX requests, alternative to native browser `alert()` function, image/file upload and many other 'utility' features that will/can be added at interval basis (or in the future) - This is why it is called **Mmuo** (the Igbo Language name of "spirit" in English language) because you won't see it coming.

Especially for AJAX requests, you don't have to create AJAX scripts/files for different/specific pages anymore. This single package can take care of any AJAX request for you (as well as the following listed below). The package does the following at the moment (but can always be extended to include more features in the future):

- Image Preview/Upload
- Replacement of native browser's `alert()` function
- Performing AJAX **GET** requests
- Performing AJAX **POST** requests
- Exposes some AJAX loading indicator functions which you can use for your project
- Lazy-load Image(s)

## Installation

To get started all you need to do is:

```
$ npm install mmuo
```

and you're in. The package exposes a `registerEventListeners()` function which already has some event listeners and classes for you to just dive right in and use. Simply import the function into your project and use right away. Example:

```
import {registerEventListeners} from "mmuo"

//Always nice to register events when the DOM has been fully loaded
window.addEventListener("DOMContentLoaded", function() {
    registerEventListeners()
});
```

Please note that in using this function some classes and/or ID's have already been defined and registered so all you have to do is assign any of these classes or ID's to your element and you're good to go. The functions are already defined and you can use them on your own if you want to create or listen to custom events on your own. The workflow, should you choose to register events on your own with a different class/ID name, should be the same:

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

> Note that these are just class/ID names you can use on the fly without any configuration and that these names, if they conflict with any class/ID name already in use, can be changed to your preference. However, you will have to manually register your events

> Also note that proper styling is done with Bootstrap so you may want to include it in your project

# Registering Events

This works like Jquery's DOM event listener. To register an event, all you have to do is import the `on` function like so:

```
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
```
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne', 'click', myFunctionOrYourFunctionToRun);
});
```

or

```
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne #selector2', 'click', myFunctionOrYourFunctionToRun);
});
```

or

```
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne #selector2', 'click', function(event){
        //Do whatever you wish
    });
});
```

or

```
window.addEventListener("DOMContentLoaded", function() {
    on('.selectorOne .selector2', 'click', function(event){
        //Do whatever you wish
    });
});
```

If you will like to use our function(s) (as defined in the table above) then you should not forget to import the particular function(s) as well. You can add as many selectors you like to listen to the same event.

# Examples
Please note that the class names specified here are optional and you are free to use your own class names. The difference is that you will have to register your events yourself using any of our functions defined in the table above.

1. ## Image Upload
- ## Via Trigger:
```
<div class="preview-upload">
<!-- The selected photo will be displayed here-->
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

- ## Via Normal File Input:

```
<div class="preview-upload">
<!-- The selected photo will be displayed here. This is always very important-->
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

2. ## Password Toogling:
Toggle between showing and hiding a password.

```
<div>
    <label>Password</label>
    <input type="password" class="password-checker" id="password">

    <!-- data-id=* points to the ID of the password input we want to toggle-->
    <a class="password-visibility" data-id='password' href="#">
        <i class="fas fa-eye-slash "></i>
    </a>
</div>
```

3. ## Checking If Two Passwords Match:
Just make sure they (inputs) have the `name` attributes set to **"password"** and **"password_confirmation"** respectively alongside the **"password-checker"** class name
```
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

4. ## Generating Password:
```
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
```
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

5. ## Ask Before Running A Link

```
<a class="pre-run" data-caption="Would you like to buy me Shawama or Nkwobi as well?" data-classname="run-get-request" data-bc="logout" href="https://www.webloit.com">Shop Now</a>
```

The **"pre-run"** (but you can give it a different name) class is the most important here. It is important that only this class be present unless other classes are just for styling or won't affect our process. The following are explained:

- `data-caption=*` => A message that will be displayed to the user as an instruction or warning

- `data-classname=*` => Any class you want to be added to the link that will perform the user's click action if (s)he continues the action. This may be for styling or our **"AJAX GET"** class (which we'll touch shortly)

- `data-bc=*` (optional) => In the link that will perform the user's action you can decide whether an event should be broadcast when successful. We'll touch this in the next outline.

Note that these are optional and that there are alternatives in place already such that you can just simply do:
```
<a class="pre-run" href="https://www.webloit.com">Shop Now</a>
```
And it will mean the same thing using our defined values.

6. ## Running AJAX Requests Via Links (GET Requests)
A simple one looks just like this:
```
<a class='run-get-request' href="/delete-user">Remove</a>
```

By default, on successful completion it won't show anything on screen. However, if it fails you'll be notify. If you will like to do something on successful completion then you should add an event via the `data-bc=*` property which you can listen to and do whatever you wish.

You can also warn (or instruct) before running the request by using the strategy discussed in the previous block and then including the class that controls the AJAX GET request via `data-classname=*` like below:

```
<a class='pre-run' data-caption="Are you sure you want to remove this student?" data-classname="run-get-request" data-bc="student_removed" 
href="/delete-user">Remove</a>
```

7. ## Running AJAX Requests Via Forms (POST Requests)

We advice that each input type be placed within a `div` for proper styling and alignment.
```
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

You can put as many input elements as you like and they'll be submitted to your server. 

It is important that your submit button has a `type="submit"`. 

And for **Laravel users**, it is also important that no element with similar ID of any of the input's value for `name` attribute exists. This is because we will create and append error messages to the particular input using the input's `name` attribute as ID (should there be any error from server regarding input).

When returning response from server (which will usually come in a JSON format) **Mmmuo** will try to detect if it has a **"message"** or **"msg"** property and then display it as successful (or failure) message to the user else it falls to default and just displays whatever was sent to the client.

If you want a redirect to take place on successful request then you should pass the URL/link you want the user to be directed to (as response) by adding a `url` property to the response. A typical response may look like:

```
{
  "message": "Request was successful",
  "url": "https://www.webloit.com"
}
```

If you want the link to be opened on a different tab then you should add a `data-ext` attribute to your form tag (with any value; it doesn't matter here). Example:

```
<form action="submit" id="form" method="post" data-ext='true'>

//

</form>

```

For proper styling and presentation we use the **HTTP status** to detect error or failed request(s) so when returning response(s) we advice you use appropriate **HTTP status header(s)**. No need to append the "Status Code" as property in the result in the reward because we don't use it.

---

# BONUS:
## Emitting Events:
For either GET or POST requests you may want to perform some other actions as well when the request is successful. You can simply do this by adding a `data-bc=*` attribute to either the `a` element or `form` tag with the name of the event you want to emit as value. We will then emit this event when the request is successful which you can listen to in your project. We'll pass across any data received from the server as parameter in the emitted event as well so you can inspect and do whatever you wish with it. 

---

# Utility Functions
## Displaying Spinner:
You may want to indicate to user that an action is taking place. You can import and use our `showSpinner` function for this. E.g

```
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

## Displaying Pop Up (or Alert)

This is typically used to warn or instruct a user after clicking a link before carrying the action of the link (consider it a replacement to browser's `alert()`). Simply use our `showAlert` function like so:

```
import {showAlert} from "mmuo"

showAlert(caption, link, textWord, classToUse=null, bc=null)

//String: caption => The caption or instruction that will be displayed to the user
//String: link => The link which the user can click to continue [default] action
//String: textWord = What text the link ('a' element) will have
//String: classToUse (optional): What class(es) should be added to the link tag/element
//bc => What event should be generated when user clicks the link. This is typically used if using any of our AJAX function.
```

## Lazy-loading Images
If you have to display multiple images on your page it may take time and consume bandwith of user downloading all the images at once. We can save time and increase page load (and speed) by only downloading image(s) when it/they is/are within view. To do this, instead of giving an `src` attribute to your image, give it a `data-src` attribute with the url of the image and the image will be displayed only when into view. For example:
```
#HTML
<img data-src="/link/to/image.jpg" />

#Javascript
import {lazyLoadImages} from "mmuo"

//You will usually want to do this when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", function() {
    lazyLoadImages()
});
```

## Popup From Bottom-To-Top

You may want to display a message to the user after/before an action and will like it to appear from below the user's screen, simply do:
```
import {showCanvass} from "mmuo"

//You will usually want to do this when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", function() {
    //Pass your message across as argument
    showCanvass(message)
});
```


# Meanwhile
 You can connect with me on [LinkedIn](https://www.linkedin.com/in/sirmekus) for insightful tips and so we can grow our networks together.

 Patronise us on [Webloit](https://www.webloit.com).

 And follow me on [Twitter](https://www.twitter.com/Sire_Mekus).

 I encourage contribution even if it's in the documentation. Thank you.