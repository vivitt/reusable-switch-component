export default class VivittSwitcher extends HTMLElement{
    constructor() {
    super();
        this.name = 'switcher'
        this.state = 'off';
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
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') {
            this.setAttribute('aria-checked', this.checked.toString())
        }
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true }); 
        this.mainComp = document.createElement('span')
        this.mainComp.setAttribute('class','vivitt-switcher');

        this.customStyle = "";
        this.__style = document.createElement("style")
        this.__style.textContent = ""

        this.shadowRoot.appendChild(this.__style);
        
        this.mainComp.innerHTML = `
            <style>
                .vivitt-switcher label {
                    display: block;
                    --color: black;
                    --container-width: 100px;
                    width: var(--container-width);
                    height: calc(var(--container-width) / 2);
                    border: 1px solid var(--color);
                }
            </style>
            <input
            type="checkbox"
            id="switcher"
            role="switch"
            />
            <label for="switcher"></label>                                      
            `;
        this.shadowRoot.append(this.mainComp)
        this.setAttribute('aria-checked', this.checked.toString())
 
        this.addEventListener('click', () => {
        this.checked = !this.checked
        })
    }
}

customElements.define("vivitt-switcher", VivittSwitcher)
