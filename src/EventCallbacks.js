import { empty, getKey, element as $ } from "./helper.js"
import { Ajaxify } from "./Ajaxify.js"

function togglePasswordVisibility(event){
    event.preventDefault()
    
    let clicked_button = event.currentTarget

	let icon = clicked_button.children[0]
	
	let passwordField = !empty(clicked_button.dataset.id) ? document.querySelector(`#${clicked_button.dataset.id}`) : clicked_button.parentElement.parentElement.parentElement.querySelector("input");
	
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
    let field = event.currentTarget;

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

    let clicked_button = event.currentTarget;

    let target = clicked_button.dataset.target ?? "password";

    let strength = clicked_button.dataset.strength ?? "decent_pw";

    let passPhrase = getKey(strength);

    let id = document.querySelector("#" + target)

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

function postRequest (event, ajaxConfig=null) {
    event.preventDefault();

    let thisForm = $(this, false);

    let ajaxify = new Ajaxify(thisForm);

    let userAjaxStartFunction = ajaxConfig?.start;
    let userAjaxSuccessFunction = ajaxConfig?.success;
    let userAjaxErrorFunction = ajaxConfig?.error;
    let userAjaxEndFunction = ajaxConfig?.end;

    if(userAjaxStartFunction){
        userAjaxStartFunction.call(this, thisForm.raw());
    }
    else{
        ajaxify.startAjax();
    }

    let action = thisForm.attr("action");

    let method = thisForm.attr('method') || 'post'

    let dataToSend = new FormData(thisForm.getDomElement());

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
            config = {...config, data: thisForm.data('json') ? JSON.parse(JSON.stringify(Object.fromEntries(dataToSend))) : dataToSend}
            
            break

        default:
            config = {...config, params: JSON.parse(JSON.stringify(Object.fromEntries(dataToSend)))}
      }

    axios
        .request(config)
        .then((response) => {
            if(userAjaxSuccessFunction){
                userAjaxSuccessFunction.call(this, thisForm.raw(), response);
            }
            else{
                ajaxify.successAjax(response);
            }
        })
        .catch((error) => {
            if (!error || !error.response) {
                return;
            }
            if(userAjaxErrorFunction){
                userAjaxErrorFunction.call(this, thisForm.raw(), error);
            }
            else{
                ajaxify.errorAjax(error);
            }
        })
        .then(() => {
            if(userAjaxEndFunction){
                userAjaxEndFunction.call(this, thisForm.raw());
            }
            else{
                ajaxify.endAjax();
            }
        });
}

export { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword, postRequest };