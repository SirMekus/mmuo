function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function removeElement(scope, selector) {
    scope.querySelectorAll(selector).forEach(function(currentValue, currentIndex, listObj){
        listObj[currentIndex].remove()
    });
}

export {removeElement, insertAfter}