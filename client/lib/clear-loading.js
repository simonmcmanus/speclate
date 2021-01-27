'use strict'


export default (loadingClass) => {
    var loadingElements = document.querySelectorAll("." + loadingClass);
    loadingElements.forEach((el) => {
        el.classList.remove(loadingClass)
    })
}