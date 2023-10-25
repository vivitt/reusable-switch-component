export default class VivittSwitcher extends HTMLElement{
    constructor() {
    super();
        this.checked = false
        this.addEventListener('click', this.handleClick) 
    }   
    handleClick() {
        if(!this.disabled) {
            this.input.checked = !this.input.checked
            this.checked = this.input.checked
        }    
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

    get disabled() {
        return this.hasAttribute('disabled')
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
           
            if(this.disabled) {
                label.setAttribute('class', 'switch__label switch__label--disabled')
            } else {
                label.setAttribute('class', 'switch__label')
            }
            label.innerHTML = this.label
            this.shadowRoot.prepend(label);
        }

        if(this.disabled) {
            this.input.setAttribute('disabled', true)   
        }
        this.__style = document.createElement("style")
     
        this.shadowRoot.appendChild(this.__style);

        this.__style.innerHTML = ` 
        :host {
            --container-width: 4rem; 
            --color-control: #c2b9b8;
            --color-thumb: white;
            --color-focus: black;
            --color-label: black;
            --color-border: black;
            --color-control-disabled: #E7E7E7;
            --color-thumb-disabled: #e6dddc;
            --color-label-disabled: #696564;
            display: flex;
            align-items: center;
        } 
        
        .switch__label {
            color: var(--color-label);
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
            --color: var(--color-control);
            display: block;
            background-color: var(--color);
            width: var(--container-width);
            height: calc(var(--container-width) / 2);
            border: 1px solid var(--color-border);
            border-radius: calc(var(--container-width) / 2 );
            position: relative;
            cursor: pointer;
        }

        input:focus ~ .switch__control  {
            outline: solid 2px var(--color-focus) 
        }
    
        .switch__thumb::after {
            --color: var(--color-thumb);
            content: "";
            position: absolute;
            background-color: var(--color);
            --size: calc(var(--container-width) / 2);
            width: var(--size);
            height: var(--size);
            border: 1px solid var(--color-border);
            border-radius: calc(var(--container-width) / 2 );
            font-size: var(--size);
            top: -1px;
            left: -1px;
            transition: left 300ms;
        }

        input:checked ~ .switch__control > .switch__thumb::after  {
            content: "";
            left: var(--size); 
            top: -1px;
        } 

        input:disabled ~ .switch__control  {
            --color-border: var(--color-control);
            --color: var(--color-control-disabled); 
        }

        input:disabled ~ .switch__control > .switch__thumb::after  {
            --color: var(--color-thumb-disabled); 
        }

        .switch__label--disabled {
            color: var(--color-label-disabled);
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
                transition: top 300ms;
            }
            input:checked ~ .switch__control > .switch__thumb::after {
                left: -1px;
                top: var(--size);
            }
            .switch__label {
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
