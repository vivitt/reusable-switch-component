export default class VivittSwitcher extends HTMLElement{
    constructor() {
    super();
        this.checked = false
        this.addEventListener('click', this.handleClick)   
    }   
    handleClick() {
        this.input.checked = !this.input.checked
        this.checked = this.input.checked
    }
    static get observedAttributes() {
        return ['checked', 'label']
    }
    get checked() {
        return this.hasAttribute('checked')
    }
    set checked(value) {
        this.toggleAttribute('checked', value)
    }
    
    get label() {
        if(this.hasAttribute('label')) {
            return this.getAttribute('label')
        }
    }
    set label(value) {
        this.setAttribute('label', value)
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true }); 
        
        this.input = document.createElement('input')
        this.input.setAttribute('type', 'checkbox')
        this.input.setAttribute('id', 'switch')
        this.input.setAttribute('role', 'switch')
        this.shadowRoot.appendChild(this.input);

        const switchControl = document.createElement('span')
        switchControl.setAttribute('class','switch__control');
        const switchThumb = document.createElement('span')
        switchThumb.setAttribute('class','switch__thumb');
        switchControl.appendChild(switchThumb)
        this.shadowRoot.appendChild(switchControl)
       

        /* <div part="label" class="switch__label">
            <slot></slot>
          </div> */ 

        if(this.label !== '') {
            this.input.setAttribute('aria-label', this.label)
        }

        this.__style = document.createElement("style")
     
        this.shadowRoot.appendChild(this.__style);

        this.__style.innerHTML = `   
        input {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
        } 
        .switch__control {
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

        input:focus ~ .switch__control  {
            outline: solid 2px   
        }

        .switch__thumb::after {
            content: "🌚";
            border-radius: 30px;
            position: absolute;
           
            --size: calc(var(--container-width) / 2 );
            font-size: var(--size);
            width: var(--size);
            height: var(--size);
            top: -6px;
            left: 0px;
            transition: left 300ms;
        }
        input:checked ~ span > span::after  {
            content: "🌞";
            left: var(--size)    
        }
        `
    }
    attributeChangedCallback(name) {
        if (name === 'checked') {
            this.input.setAttribute('aria-checked', this.checked.toString())
            const event = new CustomEvent('checked-changed', {
                bubbles: true,
                composed: true,
                detail: this.checked
              });
              this.dispatchEvent(event);
        } 
    }  
   
}

customElements.define("vivitt-switcher", VivittSwitcher)
