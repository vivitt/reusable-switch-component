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
        return ['checked', 'label', 'include-label']
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
    get includeLabel() {
        return this.hasAttribute('include-label')
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

        if(this.label !== '' && !this.includeLabel) {
            this.input.setAttribute('aria-label', this.label)
        } else if(this.includeLabel) {
            this.input.setAttribute('aria-labelledby', this.label)
            const label = document.createElement('span')
            label.setAttribute('id', this.label)
            label.innerHTML = this.label
            this.shadowRoot.prepend(label);
        }

        this.__style = document.createElement("style")
     
        this.shadowRoot.appendChild(this.__style);

        this.__style.innerHTML = `  
        :host {
            display: flex;
            align-items: center;
        } 
        
        span:first-of-type {
            font-family: "Gill Sans", sans-serif;
            font-size: 1.2em;
            padding-inline-end: 0.3em;
        }

        input {
            position: absolute;
            opacity: 0;
            width: 0;
            height: 0;
            display: flex;
        } 

        .switch__control {
            display: block;
            --color: black;
            --container-width: 5rem;
            width: var(--container-width);
            height: calc(var(--container-width) / 2);
            border: 1px solid var(--color);
            border-radius: calc(var(--container-width) / 2 );
            position: relative;
            cursor: pointer;
            color: var(--color);
        }

        input:focus ~ .switch__control  {
            outline: solid 2px   
        }

        .switch__thumb::after {
            content: "🌚";
            position: absolute;
            --size: calc(var(--container-width) / 2 );
            font-size: var(--size);
            width: var(--size);
            height: var(--size);
            top: -0.12em;
            left: 0px;
            transition: left 300ms;
        }
        input:checked ~ span > span::after  {
            content: "🌞";
            left: calc(var(--size)*1.1); 
        } 
        @media (max-width: 400px) {
            :host {
                flex-direction: column; 
            }
            .switch__control {
                height: var(--container-width);
                width: calc(var(--container-width)/2);
            } 
            .switch__thumb::after {
                top: -0.12em;
                left: 0px;
                transition: top 300ms;
            }
            input:checked ~ span > span::after {
                top: calc(var(--size)/1.2); 
                left: 0px;
            }
            span:first-of-type {
                padding-inline-end: 0px;
                padding-bottom: 0.3em;
            }
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
