function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function removeElement(scope, selector) {
    scope.querySelectorAll(selector).forEach(function(currentValue, currentIndex, listObj){
        listObj[currentIndex].remove()
    });
}

function checkParent(parent, child) {
    let node = child.parentNode;
    var currentChild = child

    let isFound = false
  
    // keep iterating unless we find a node with the exact parent
    while (!isFound) {
        if (node == parent) {
            isFound = true
            return currentChild;
        }
        currentChild = node
        node = currentChild.parentNode;
    }
    return false;
}

export {removeElement, insertAfter, checkParent}