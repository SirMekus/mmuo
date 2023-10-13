import { insertAfter, checkParent } from "./Dom"

class Element {

    isThisClass = true
  
    element

    selector

    create

    isObject = false

    isSingle = false

    constructor(element, create=true, root=null){
      this.create = create

      let finder = root || document;

      this.isObject = (typeof(element) == "object" || typeof(element) == "function");

      this.isSingle = this.isObject || (finder.querySelectorAll(element).length <= 1) ? true : false;

      this.element = create == true ? document.createElement(element) : (this.isObject ? element : (this.isSingle ? finder.querySelector(element) : finder.querySelectorAll(element)));

      //Some ops may require working with DOM nodes already created. We shall seek this element from the DOM using a special method.
      this.selector = element;

      return this;
    }
    
    id(id){
      if(this.create || this.isObject || this.isSingle){
        this.element.id = id;
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].id = id;
        });
      }
      
      return this;
    }

    toggle(className){
      if(this.create || this.isObject || this.isSingle){
        this.element.classList.toggle(className);
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.toggle(className);
        });
      }
      return this;
    }

    attr(name, value=null){
        if(!value){
            return this.element.getAttribute(name);
        }
        else{
          if(this.create || this.isSingle){
            this.element.setAttribute(name, value);
          }
          else{
            this.element.forEach(function (currentValue, currentIndex, listObj) {
              listObj[currentIndex].setAttribute(name, value);
            });
          }
          return this;
        }
    }

    removeAttr(attr){
      if(this.create || this.isObject || this.isSingle){
        this.element.removeAttribute(attr);
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].removeAttribute(attr);
        });
      }
      return this;
    }

    css(property, value=null){
      if(value == null){
        return this.element.style[property];
      }
      else{
        if(this.create || this.isObject || this.isSingle){
          this.element.style[property] = value;
        }
        else{
          this.element.forEach(function (currentValue, currentIndex, listObj) {
            listObj[currentIndex].style[property] = value;
          });
        }
    
        return this;
      }
    }

    addClasses(classes){
      if(this.create || this.isObject || this.isSingle){
        this.element.className = classes;
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].className = classes;
        });
      }
      return this;
    }

    addClass(className){
      if(this.create || this.isObject || this.isSingle){
        this.element.classList.add(className);
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.add(className)
        });
      }
      
      return this;
    }

    contains(className){
      return (this.create || this.isObject || this.isSingle) ? this.element.classList.contains(className) : null;
    }

    removeClass(className){
      if(this.create || this.isObject || this.isSingle){
        this.element.classList.remove(className);
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.remove(className)
        });
      }
      return this;
    }
    
    text(content=null){
      if(this.create || this.isObject || this.isSingle){
        if(content){
          this.element.textContent = content;
        }
        else{
          return this.element.textContent;
        }
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].textContent = content;
        });
      }
      return this;
    }

    html(content=null){
      if(this.create || this.isObject || this.isSingle){
        if(content){
          this.element.innerHTML = content;
        }
        else{
          return this.element.innerHTML;
        }
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].innerHTML = content;
        });
      }
      return this;
    }

    val(content=null){
      if(this.create || this.isObject || this.isSingle){
        if(content){
          this.element.value = content;
        }
        else{
          return this.element.value;
        }
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].value = content;
        });
      }
      
      return this;
    }

    appendTo(element=null){
      if(!element){
        const box = document.body
      }
      else{
        const box = typeof(element) == "object" ? (element?.isThisClass ? element.getDomElement() : element) : document.querySelector(element)
        box.appendChild(this.element);
      }
    }

    insertAfter(element){
        insertAfter(this.element, (typeof(element) == "object" ? (element?.isThisClass ? element.getDomElement() : element) : document.querySelector(element)));
    }

    insertBefore(element){
      const selector = typeof(element) == "object" ? (element?.isThisClass ? element.getDomElement() : element) : document.querySelector(element);
      const parent = selector.parentNode;
      
      const childNode = checkParent(parent, selector)
      parent.insertBefore(this.element, childNode);
    }

    remove(){
      if(this.create || this.isObject || this.isSingle){
        this.element.remove();
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].remove();
        });
      }
      return this;
    }

    removeElement(selector) {
      this.element.querySelectorAll(selector).forEach(function(currentValue, currentIndex, listObj){
        listObj[currentIndex].remove()
      });
      return this;
   }

    getDomElement(){
      return this.element;
    }

    isPresent(){
      return this.element ? true : false;
    }

    data(dataset){
      return this.element.dataset[dataset]
    }

    parent(){
      return this.element.parentElement ? new Element(this.element.parentElement, false) : null
    }

    scrollHeight(){
      return this.element.scrollHeight;
    }

    scrollToBottom(){
      if(this.isPresent()){
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        },0)
      }
      return this;
    }

    scrollIntoView(){
      if(this.isPresent()){
        setTimeout(function () {
          this.element.scrollIntoView();
        }, 1000);
      }
    }

    find(selector){
      return this.element.querySelector(selector) ? new Element(selector, false, this.element) : null
    }

    each(funct){
      this.element.forEach(function (currentValue, currentIndex, listObj) {
        var currentNode = listObj[currentIndex];
        let boundedFunc = funct.bind(new Element(currentNode, false))
        boundedFunc()
      })
    }

    sibling(){
      return this.element.nextElementSibling ? new Element(this.element.nextElementSibling, false) : null
    }
  
  }
  
  export { Element }