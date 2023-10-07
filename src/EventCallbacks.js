import { empty, getKey, element as $ } from "./helper.js"

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
    ) 
    {
        if (!notificationBox.style.color || notificationBox.style.color != 'red') {
            notificationBox.style.color = 'red';
        }

        notificationBox.innerHTML = "Your passwords do not match";
    } 
    else {
        notificationBox.style.color = null
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

export { togglePasswordVisibility, checkIfPasswordsMatch, generatePassword };