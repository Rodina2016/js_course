document.addEventListener('DOMContentLoaded', function(){
    const DomElement = function (selector,height,width,bg,fontsize,text) {
         this.selector = selector;
         this.height = height;
         this.width = width;
         this.bg = bg;
         this.fontsize = fontsize,
         this.text = text;
    };

    DomElement.prototype.makeElement = function () {
        const firstElem = this.selector[0];
        let elem = '';

        if(firstElem === '#') {
            elem = document.createElement('p');
            elem.setAttribute('id', this.selector);
        } else if (firstElem === '.') {
            elem = document.createElement('div');
            elem.classList.add(this.selector.substring(1));
        }
        const styleStr = `height:${this.height}px; width:${this.width}px; background:${this.bg}; font-size:${this.fontsize}px;`;
        elem.style.cssText = styleStr;
        elem.innerHTML = this.text;
        return elem;
    };

    const newElem = new DomElement('.id', '78', '150', 'green', '20', 'Hello!');

    newElem.makeElement();

    document.body.appendChild(newElem.makeElement());
});