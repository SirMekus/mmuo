import { insertAfter, checkParent } from "./Dom"

class Element {
  
    element

    selector

    create

    isObject = false

    constructor(element, create=true){
      this.create = create

      this.isObject = (typeof(element) == "object" || typeof(element) == "function");

      this.element = create == true ? document.createElement(element) : (this.isObject ? element : document.querySelectorAll(element));

      //Some ops may require working with DOM nodes already created. We shall seek this element from the DOM using a special method.
      this.selector = element;

      return this;
    }

    id(id){
      if(this.create || this.isObject){
        this.element.id = id;
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].id = id;
        });
      }
      
      return this;
    }

    toggleClass(className){
      if(this.create || this.isObject){
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
          if(this.create){
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
      if(this.create || this.isObject){
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
        if(this.create || this.isObject){
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
      if(this.create || this.isObject){
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
      if(this.create || this.isObject){
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
      return (this.create || this.isObject) ? this.element.classList.contains(className) : null;
    }

    removeClass(className){
      if(this.create || this.isObject){
        this.element.classList.remove(className);
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].classList.remove(className)
        });
      }
    }
    
    text(content=null){
      if(this.create || this.isObject){
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

    value(content=null){
      if(this.create || this.isObject){
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
        const box = typeof(element) == "object" ? element : document.querySelector(element)
        box.appendChild(this.element);
      }
    }

    insertAfter(element){
        insertAfter(this.element, (typeof(element) == "object" ? element : document.querySelector(element)));
    }

    insertBefore(element){
      const selector = typeof(element) == "object" ? element : document.querySelector(element);
      const parent = selector.parentNode;
      
      const childNode = checkParent(parent, selector)
      parent.insertBefore(this.element, childNode);
    }

    remove(){
      if(this.create || this.isObject){
        this.element.remove();
      }
      else{
        this.element.forEach(function (currentValue, currentIndex, listObj) {
          listObj[currentIndex].remove();
        });
      }
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
      this.element.parentElement
      return this;
    }
  
  }
  
  export { Element }