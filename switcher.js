export default class VivittSwitcher extends HTMLElement{
    constructor() {
    super();
        this.name = 'switcher' 
        this.checked = false
    }   
    static get observedAttributes() {
        return ['checked']
    }
    get checked() {
        return this.hasAttribute('checked')
    }
    set checked(value) {
        this.toggleAttribute('checked', value)
    }
 

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true }); 
        
        this.wrapper = document.createElement('span')
        this.wrapper.setAttribute('class','vivitt-switcher');
    
        this.__style = document.createElement("style")
     
        this.shadowRoot.appendChild(this.__style);

        this.__style.innerHTML = `   
        input {
            opacity: 0;
            width: 0;
            height: 0;
        } 
        label {
            display: block;
            --color: black;
            --container-width: 100px;
            width: var(--container-width);
            height: calc(var(--container-width) / 2);
            border: 1px solid var(--color);
            border-radius: 30px;
            position: relative;
            cursor: pointer;
            color: var(--color)   
        }

        input:focus ~ label  {
            outline: solid 2px   
        }

        label::after {
            content: "🌚";
            position: absolute;
            //background-color: var(--color);
            --size: calc(var(--container-width) / 2 );
            font-size: var(--size);
            width: var(--size);
            height: var(--size);
            top: -6px;
            left: 0px;
            transition: left 300ms;
        }
        input:checked ~ label::after {
            content: "🌞";
            left: var(--size)    
        }
        `
        this.shadowRoot.appendChild(this.wrapper)
        this.wrapper.innerHTML = `
                <input type="checkbox" id="switcher" />
                <label for=switcher>                   
            `;
        this.addEventListener('click', () => {
            this.checked = !this.checked
            console.log(this.checked)
        })
    }
    attributeChangedCallback(name) {
        if (name === 'checked') {
            this.setAttribute('aria-checked', this.checked.toString())
        } 
    }  
   
}

customElements.define("vivitt-switcher", VivittSwitcher)
