import { empty, getKey, element as $ } from "./helper.js"

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

export { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword };