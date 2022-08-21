import { insertAfter, removeElement } from "./Dom.js"
import { empty, getKey, showAlert, showSpinner,removeSpinner,showCanvass } from "./helper.js"

function togglePasswordVisibility(event){
    event.preventDefault()
    
    var clicked_buton = event.currentTarget

	let icon = clicked_buton.children[0]
	
	var passwordField = !empty(clicked_buton.dataset.id) ? document.querySelector(`#${clicked_buton.dataset.id}`) : clicked_buton.parentElement.parentElement.parentElement.querySelector("input");
	
	if(passwordField.getAttribute("type") == "password")
	{
		passwordField.setAttribute("type", "text")
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
	}
	else
	{
		if(passwordField.getAttribute("type") == "text")
		{
            passwordField.setAttribute("type", "password")
            icon.classList.remove('fa-eye')
            icon.classList.add('fa-eye-slash')
	    }
	}
}

function checkIfPasswordsMatch (event) {
    var field = event.currentTarget;

    let name = field.getAttribute("name");

    let notificationBox = document.querySelector(
        `.password-checker-notification`
    );

    if (
        (name == "password" &&
            field.value != "" &&
            field.value !=
                document.querySelector(`[name='password_confirmation']`)
                    .value) ||
        (name == "password_confirmation" &&
            field.value != "" &&
            field.value !=
                document.querySelector(`[name='password']`).value)
    ) {
        if (notificationBox.classList.contains("text-danger") == false) {
            notificationBox.classList.add("text-danger");
        }

        notificationBox.innerHTML = "Your Passwords Do Not Match";
    } else {
        notificationBox.classList.remove("text-danger");
        notificationBox.innerHTML = "";
    }
}

function generatePassword (event) {
    event.preventDefault();

    var clicked_buton = event.currentTarget;

    var target = clicked_buton.dataset.target ?? "password";

    var strength = clicked_buton.dataset.strength ?? "decent_pw";

    var passPhrase = getKey(strength);

    var id = document.querySelector("#" + target)

    document.querySelector("#" + target).value = passPhrase;

    if (document.querySelector("#" + target + "2") != null) {
        document.querySelector("#" + target + "2").value = passPhrase;
    }

    if (id.parentElement.querySelector("#password-visibility") != null) {
        if (id.getAttribute("type") == "password") {
            id.parentElement.querySelector("#password-visibility").trigger("click");
        }
    }

    if (document.querySelector(`.password-checker-notification`) != null) {
        let notificationBox = document.querySelector(`.password-checker-notification`);
        notificationBox.classList.remove("text-danger");
        notificationBox.innerHTML = "";
    }
}

function alertBeforeRunning (event) {
    event.preventDefault();

    var clickedLink = event.currentTarget;

    var href = clickedLink.getAttribute("href");

    var classToUse = clickedLink.dataset.classname || "remove";

    var textWord = clickedLink.text || "Continue";

    var caption = clickedLink.dataset.caption || "Shall we?";

    //incase an event needs to be sent to the component for more action(s) to be carried out
    var bc = clickedLink.dataset.bc || null;

    showAlert(caption, href, textWord, classToUse, bc);
}

function getRequest (event) {
    event.preventDefault();

    if(document.querySelector(".close-alert")){
        document.querySelector(".close-alert").click(); 
    }

    showSpinner()

    var clickedLink = event.currentTarget;
    
    var href = clickedLink.getAttribute("href");

    if(!href || href == "#"){
        document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, { detail: null }))
        
        removeSpinner()

        return
    }
    
    axios.get(href).then((response) => {
        document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, { detail: response }))
    }).catch((error) => {
        showCanvass("<div class='text-danger'>"+error.response.data.message +"</div>")
    }).then(() => {
        removeSpinner()
    })
}

function postRequest (event) {
    event.preventDefault();

    var this_form = event.currentTarget;

    //In case there are more than 2 submit buttons in a form.
    var submit_button = this_form.querySelector("input[type='submit']");

    if (this_form.querySelector("div.success") == null) {
        let div = document.createElement("div");
        div.className = "success";

        this_form.insertBefore(div, submit_button.parentElement);
    }

    var responseArea = this_form.querySelector(".success");

    if (this_form.querySelector("#hidden_content") != null) {
        this_form.querySelector("#hidden_content").value =
            frames["richedit"].document.body.innerHTML;
    }

    var notFilled = false;

    //We make sure those fields that are required are filled incase the user mistakenly skips any.
    this_form
        .querySelectorAll("input")
        .forEach(function (currentValue, currentIndex, listObj) {
            var currentNode = listObj[currentIndex];

            if (
                currentNode.dataset.name != undefined ||
                currentNode.getAttribute("required") != undefined
            ) {
                if (currentNode.value == "") {
                    notFilled = true;

                    var name =
                        currentNode.dataset.name ||
                        currentNode.getAttribute("name");
                    currentNode.classList.remove("is-valid");
                    currentNode.classList.add("is-invalid");

                    responseArea.innerHTML =
                        "<span class='text-danger'>You should fill in the " +
                        capitalLetters(name) +
                        " field before you proceed</span>";

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

    //var method = this_form.getAttribute('method')

    var data_to_send = new FormData(this_form);

    if (this_form.querySelector("div.upload-progress-div") == null) {
        var ajaxIndicator = document.createElement("div");
        ajaxIndicator.className =
            "d-flex justify-content-center spinner-div";
        ajaxIndicator.innerHTML =
            "<div class='spinner-grow position-fixed' role='status' style='left: 50%; top: 50%; height:60px; width:60px; margin:0px auto; position: absolute; z-index:1000; color:var(--color-theme)'><span class='sr-only'>Loading...</span>";

        document.body.appendChild(ajaxIndicator);
    }

    submit_button.value = "...in progress";
    submit_button.setAttribute("disabled", "disabled");

    axios
        .post(action, data_to_send)
        .then((response) => {
            removeElement(this_form, ".server-response");
            
            if(response.data.url){
                if (!this_form.dataset.ext) {
                    window.open(response.data.url, '_ext');
                }
                else{
                    window.open(response.data.url);
                }
            }
            else{
                responseArea.innerHTML = `<span class='text-success'>${(response.data.msg || response.data.message) ?? response.data}</span>`;
            }

            if (this_form.dataset.bc) {
                document.dispatchEvent(new CustomEvent(clickedLink.dataset.bc, { detail: response }))
            }
        })
        .catch((error) => {
            if (!error || !error.response) {
                return;
            }
            
            removeElement(this_form, ".server-response");

            switch (error.response.status) {
                case 422:
                    //data = error.response.data;
                    var items = error.response.data.errors;
                    if (items != undefined) {
                        for (var item in items) {
                            //This may be an element that is dynamically added to the form field, thus may not be always present in the DOM
                            if (this_form.querySelector(`[name='${item}']`) == null) {
                                continue;
                            }

                            var sibling = this_form.querySelector(`[name='${item}']`).nextElementSibling;
                            if (sibling == null) {
                                //Then we need to create it
                                var element = document.createElement("div");
                                element.id = item;
                                element.className = "server-response text-danger";
                                insertAfter(element, this_form.querySelector(`[name='${item}']`));
                            } else {
                                if (sibling.id != item) {
                                    var element = document.createElement("div");
                                    element.id = item;
                                    element.className = "server-response text-danger";
                                    insertAfter(element, sibling);
                                }
                            }

                            var responseForElement =
                                this_form.querySelector(`#${item}`);
                            responseForElement.innerHTML = items[item][0];
                        }

                        if (items.length > 1) {
                            responseArea.innerHTML =
                                "<span class='server-response text-danger'>Please make sure you fill required fields in the form and try again.</span>";
                        } else {
                            responseArea.innerHTML = `<span class='server-response text-danger'>${error.response.data.message}</span>`;
                        }
                    } 
                    else {
                        const msg = error.response.data.message ?? error.response.data;
                        responseArea.innerHTML =
                            "<span class='server-response text-danger'>" +
                            msg +
                            "</span>";
                    }

                    break;

                case 401:
                    responseArea.innerHTML =
                        "<span class='server-response text-danger'>" +
                        error.response.data.message +
                        "</span>";

                    break;

                case 403:
                    var forbidden = error.response.data.message ?? error.response.data
                    responseArea.innerHTML =
                            "<span class='server-response text-danger'>" +
                            forbidden +
                            "</span>";

                    break;

                case 404:
                    responseArea.innerHTML =
                        "<span class='server-response text-danger'>" +
                        error.response.data.message ?? error.response.data +
                        "</span>";

                    break;

                default:
                    responseArea.innerHTML =
                        "<span class='server-response text-danger'>There was a problem in submission. Please try again</span>";
            }
        })
        .then(() => {
            submit_button.value = sub_value;

            submit_button.removeAttribute("disabled");
            document.querySelector(".spinner-div").remove();
        });
}

export { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword, alertBeforeRunning, getRequest, postRequest };