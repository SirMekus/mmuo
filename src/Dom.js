/**
 * Inserts a new node after an existing node in the DOM.
 *
 * @param {Element} newNode - The new node to be inserted.
 * @param {Element} existingNode - The existing node after which the new node will be inserted.
 *
 * @returns {void} - No return value. The function modifies the DOM structure by inserting the new node after the existing node.
 *
 * @example
 * const newElement = document.createElement('div');
 * const existingElement = document.getElementById('existing-element');
 * insertAfter(newElement, existingElement);
 */
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