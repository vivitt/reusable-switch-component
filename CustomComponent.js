export default class CustomComponent extends HTMLElement {
    static ID = 0;
    constructor(){
        super()

        this.attachShadow({mode: 'open'}); 
        this.mainComp = document.createElement('span')
        this.mainComp.setAttribute('class','custom-comp');

        this.customStyle = "";
        this.__style = document.createElement("style")
        this.__style.textContent = ""

        this.shadowRoot.appendChild(this.__style);
        this.shadowRoot.appendChild(this.mainComp);

        this.compName = "";
        this.compID = CustomComponent.ID
        CustomComponent.ID++;
        this._attributes = {}
        this.isAttached = false;
    }
  


    attributeChangedCallback(name, old, newName){
            this.display()
    }
   
    render() {
        return null;
    }

    display(force=false) {
    
        this.__style.textContent = this.customStyle;

        let rendered = this.render()
        this.isAttached = true;
        this.mainComp.appendChild(rendered)
    } 

    connectedCallback() {
        this.display()
        for(let i = 0; i < this.childNodes.length; i++) {
            let child = this.childNodes[i]
            this.append(child)
        }
    }
}