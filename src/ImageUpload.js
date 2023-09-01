import { showCanvass } from "./helper.js";

function triggerFileChanger(e) {
    e.preventDefault();

    var target_class = e.currentTarget.dataset.targetclass
    
    var target = document.querySelector(`.${target_class}`)

    const maxUpload = window.maxUpload ?? 5;
    
    if (target.files.length >= maxUpload) {
        showCanvass(`You can (and should) only select a maximum of ${maxUpload} image(s) for upload`);

        return;
    }

    //The goal is to grab any previously uploaded file and then attach it to this new result created below
    if (target.files.length > 0) {
        if (document.getElementById("previously_uploaded") != null) {
            document.getElementById("previously_uploaded").remove();
        }

        let clonedNode = target.cloneNode(true);
        clonedNode.id = "previously_uploaded";
        clonedNode.removeAttribute("name");
        clonedNode.classList.remove(target_class);
        document.body.appendChild(clonedNode);
    }

    var event = new MouseEvent("click");

    target.dispatchEvent(event);
}

function isImage(file){
    return (file.type.split("/")[0] == 'image') ? true : false;
}

function defaultFormats(){
    return localStorage.getItem('mmuo_formats') ? JSON.parse(localStorage.getItem('mmuo_formats')) : ["image/jpeg", "image/png", "image/gif", "image/webp"]
}

function acceptedFormats(){
    var formats = defaultFormats()
    
    let fileFormats = []
    
    for(var index in formats){
        fileFormats.push(formats[index].split("/")[1])
    }
    
    return fileFormats.toString()
}

function setImageUploadConfig(config){
    localStorage.setItem('mmuo_formats', config.formats ? JSON.stringify(config.formats) : defaultFormats())
    localStorage.setItem('mmuo_size', config.size ?? 3228267)
}

function uploadImage(e) {
    var selectedFiles = e.currentTarget.files

    let index = document.querySelectorAll(".remove-image").length;

    var preview_box_locator = e.currentTarget.getAttribute("data-preview");

    var preview_box = document.querySelector(`.${preview_box_locator}`);

    const acceptedDocs = defaultFormats();

    const acceptedSize = localStorage.getItem('mmuo_formats') ?? 3228267;

    let imageUploaded = false

    for (let i = 0; i < selectedFiles.length; i++) {
        var size = selectedFiles[i].size;
        var type = selectedFiles[i].type;

        if (!acceptedDocs.includes(type)) {
            showCanvass(`${selectedFiles[i].name} is unknown. Please upload an image or file in: ${acceptedFormats()} format to continue.`);
            
            if(isImage(selectedFiles[i])){
                removePhoto(i);
            }
            
            break;
        }

        if (size > acceptedSize) {
            showCanvass(`File size for ${selectedFiles[i].name} too large. File must not be greater than ${(acceptedSize /1024/1024).toFixed("0")}MB`
            );
            if(isImage(selectedFiles[i])){
                removePhoto(i);
            }
            break;
        }

        if(isImage(selectedFiles[i])){
            imageUploaded = true

            let img = {
                src: URL.createObjectURL(selectedFiles[i]),
                file: selectedFiles[i],
                index:index
            };

            let div = document.createElement('div');
            div.className = 'div-for-this-photo me-2';
            div.innerHTML = `<a style='float:clear;' class='btn btn-lg remove-image' data-entry='${index}'  href='#'><span>&times;</span></a><a href='#' data-fancybox='gallery' data-caption='how it will be displayed ${i}' class='card'><img class='card-img-top' src='${img.src}' /> </a>`;

            preview_box.appendChild(div);

            index++
        }
    }

    if(imageUploaded){
        if (document.getElementById("previously_uploaded") != null) {
            const dt = new DataTransfer();
            const { files } = document.getElementById("previously_uploaded");
            for (var i = 0; i < files.length; i++) {
                const merged_file = files[i];
                dt.items.add(merged_file);
            }

            const current_file = e.currentTarget.files;

            for (var p = 0; p < current_file.length; p++) {
                const merged_file = current_file[p];
                dt.items.add(merged_file);
            }

            e.currentTarget.files = dt.files;

            document.getElementById("previously_uploaded").remove();

            // var found = document.querySelectorAll(".remove-image").length - 1
        
            document.querySelectorAll(".remove-image").forEach(function(currentValue, currentIndex, listObj) {
                listObj[currentIndex].setAttribute('data-entry', currentIndex)
            })
        }
    }
}


function removeImage(event) {
    event.preventDefault();
    var currentButton = event.currentTarget

    var index = currentButton.dataset.entry
	const dt = new DataTransfer()
    
	const input = document.querySelector('.image')

	for (var i = 0; i < input.files.length; i++) {
		const file = input.files[i]
        
		if (index != i){
			dt.items.add(file) // here you exclude the file. thus removing it.
        }
	}
    
	input.files = dt.files // Assign the updates list

    currentButton.parentElement.remove();

    document.querySelectorAll(".remove-image").forEach(function(currentValue, currentIndex, listObj) {
        listObj[currentIndex].setAttribute('data-entry', currentIndex)
    })
}

function removePhoto(index)
{
	const dt = new DataTransfer()
	const input = document.getElementById('image')
	const { files } = input

	for (let i = 0; i < files.length; i++) {
		const file = files[i]
		if (index !== i)
			dt.items.add(file) // here you exclude the file. thus removing it.
	}
    
	input.files = dt.files // Assign the updates list

    document.querySelectorAll(".remove-image").forEach(function(currentValue, currentIndex, listObj) {
        listObj[currentIndex].setAttribute('data-entry', currentIndex)
    })

	// var found = $(document).find('.remove-image').length - 1;

	// $(document).find('.remove-image').each(function (k) {
	// 		    $(this).attr('data-entry', found - k)
	// 	    })
}

export { triggerFileChanger, removeImage, uploadImage, removePhoto, setImageUploadConfig };
