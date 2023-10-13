import { empty, getKey, element as $, capitalLetters } from "./helper.js"

function togglePasswordVisibility(event){
    event.preventDefault()
    
    var clicked_button = event.currentTarget

	let icon = clicked_button.children[0]
	
	var passwordField = !empty(clicked_button.dataset.id) ? document.querySelector(`#${clicked_button.dataset.id}`) : clicked_button.parentElement.parentElement.parentElement.querySelector("input");
	
	if(passwordField.getAttribute("type") == "password")
	{
		passwordField.setAttribute("type", "text")
        if(icon){
            icon.classList.remove('fa-eye-slash')
            icon.classList.add('fa-eye')
        }
	}
	else
	{
		if(passwordField.getAttribute("type") == "text")
		{
            passwordField.setAttribute("type", "password")
            if(icon){
                icon.classList.remove('fa-eye')
                icon.classList.add('fa-eye-slash')
            }
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
    ) 
    {
        if (!notificationBox.style.color || notificationBox.style.color != 'red') {
            notificationBox.style.color = 'red';
        }

        notificationBox.textContent = "Your passwords do not match";
    } 
    else {
        notificationBox.style.color = null
        notificationBox.textContent = "";
    }
}

function generatePassword (event) {
    event.preventDefault();

    var clicked_button = event.currentTarget;

    var target = clicked_button.dataset.target ?? "password";

    var strength = clicked_button.dataset.strength ?? "decent_pw";

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

    if ($('.password-checker-notification',false).isPresent()) {
        let notificationBox = $('.password-checker-notification',false);
        notificationBox.css('color', '');
        notificationBox.text('');
    }
}

function postRequest (event) {
    event.preventDefault();

    var this_form = $(this, false);

    var submit_button = this_form.find("input[type='submit']") || this_form.find("button[type='submit']");

    if(this_form.find("div.success")){
        this_form.find("div.success").remove(); 
    }

    $("div").addClass('success').insertBefore(submit_button)

    var responseArea = this_form.find(".success");

    if (this_form.find("#hidden_content")) {
        this_form.find("#hidden_content").val(frames["richedit"].document.body.innerHTML);
    }

    var notFilled = false;

    //We make sure those fields that are required are filled incase the user mistakenly skips any.
    this_form
        .find("input")
        .each(function() {
            var currentNode = this;

            if (currentNode.data('name') || currentNode.attr("required")) {
                if (currentNode.val() == "") {
                    notFilled = true;

                    var name = currentNode.data('name') || currentNode.attr("name");
                    currentNode.removeClass("is-valid").addClass("is-invalid");

                    responseArea.html(`<span style='color:red;'>You should fill in the ${capitalLetters(name)} field before you proceed</span>`)

                    return false;
                }
                currentNode.removeClass("is-invalid").addClass("is-valid");
            }
        });

    if (notFilled == true) {
        return false;
    }

    var sub_value = submit_button.val();

    var action = this_form.attr("action");

    var method = this_form.attr('method') || 'post'

    var data_to_send = new FormData(this_form.getDomElement());

    let progressIndicatorText =submit_button.data('inprogress') || "...in progress";
    
    submit_button.val(progressIndicatorText).attr("disabled", "disabled")

    const cssForServerError = "rgb(220, 53, 69)";

    const cssForServerSuccess = "#198754";

    let config = {
        url: action,
        method: method,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
      }

      switch(method.toLowerCase()){
        case 'patch':

        case "put":

        case "delete":

        case "post":
            config = {...config, data: this_form.data('json') ? JSON.parse(JSON.stringify(Object.fromEntries(data_to_send))) : data_to_send}
            
            break

        default:
            config = {...config, params: JSON.parse(JSON.stringify(Object.fromEntries(data_to_send)))}
      }

    axios
        .request(config)
        .then((response) => {
            //This is how we identify messages from the server so that we can easily remove them and display the latest message from server.
            this_form.removeElement(".server-response");
            
            if (this_form.data('bc')) {
                document.dispatchEvent(new CustomEvent(this_form.data('bc'), { detail: response }))
            }
            
            if(response.data?.message?.url || response.data?.url){
                var url = response.data?.message?.url || response.data?.url
                if (this_form.data('ext')) {
                    window.open(url, '_ext');
                }
                else{
                    location.href = url
                }
            }
            else{
                var serverResponse = (response.data.msg || (response.data.message?.message || response.data.message)) ?? response.data

                if(typeof serverResponse == 'object'){
                    serverResponse = submit_button.data('mSuccess') ?? "Operation was successful"
                }

                responseArea.html(`<span style="color:${cssForServerSuccess}; font-weight:700;">${serverResponse}</span>`);
            }

        })
        .catch((error) => {
            if (!error || !error.response) {
                return;
            }
            
            this_form.removeElement(".server-response");

            switch (error.response.status) {
                case 422:
                    var items = error.response.data.errors;
                    if (items != undefined) {
                        for (var item in items) {
                            //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM
                            if (!this_form.find(`[name='${item}']`)) {
                                continue;
                            }

                            var sibling = this_form.find(`[name='${item}']`).sibling();

                            const id = `${item}_mmuo`;

                            if (!sibling) {
                                //Then we need to create it
                                $("div").id(id).addClass('server-response').css('color', cssForServerError).insertAfter(this_form.find(`[name='${item}']`))
                            } else {
                                if (sibling.attr('id') != id) {
                                    $("div").id(id).addClass('server-response').css('color', cssForServerError).insertAfter(sibling)
                                }
                            }

                            this_form.find(`#${id}`).text(items[item][0])
                        }

                        if (items.length > 1) {
                            responseArea.html(`<span style='color:${cssForServerError}; font-weight:700' class='server-response'>Please make sure you fill required fields in the form and try again.</span>`);
                        } else {
                            responseArea.html(`<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${error.response.data.message}</span>`);
                        }
                    }
                    else {
                        if (error.response.data?.message?.message) {
                            var msg = error.response.data.message.message;
                        } else if (error.response.data?.message) {
                            var msg = error.response.data.message;
                        } else {
                            var msg = error.response.data;
                        }
                        
                        responseArea.html(`<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${msg}</span>`);

                        if(error.response.data?.message?.target || error.response.data?.target){
                            const inputName = error.response.data.message.target || error.response.data?.target

                            //This may be an element that is dynamically added to the form field, thus may not always be present in the DOM
                            if (this_form.find(`[name='${inputName}']`) != null) {
                                var sibling = this_form.find(`[name='${inputName}']`).sibling();

                                const id = `${inputName}_mmuo`;

                                if (!sibling) {
                                    //Then we need to create it
                                    $("div").id(id).addClass('server-response').css('color', cssForServerError).css('fontWeight', '700').insertAfter(this_form.find(`[name='${inputName}']`))
                                } 
                                else {
                                    if (sibling.attr('id') != id) {
                                        $("div").id(id).addClass('server-response').css('color', cssForServerError).css('fontWeight', '700').insertAfter(sibling)
                                    }
                                }

                                this_form.find(`#${id}`).html(msg);
                            }
                        }
                    }

                    break;

                case 401:
                    responseArea.html(`<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${error.response.data.message}</span>`);

                    break;

                case 403:
                    var forbidden = error.response.data.message ?? error.response.data
                    responseArea.html(`<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${forbidden}</span>`);

                    break;

                case 404:
                    responseArea.html(
                        `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>${error.response.data.message ?? error.response.data}</span>`);

                    break;

                default:
                    responseArea.html(
                        `<span style='color:${cssForServerError}; font-weight:700' class='server-response'>There was a problem in submission. Please try again</span>`);
            }
        })
        .then(() => {
            submit_button.val(sub_value);

            submit_button.removeAttr("disabled");
        });
}

export { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword, postRequest };