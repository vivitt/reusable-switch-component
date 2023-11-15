export default class VivittSwitcher extends HTMLElement{
    constructor() {
    super();
        this.checked = false;
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
        
        shadow.innerHTML = `
            <button role="switch" class="switch__control" id="control">
                <span class="switch__thumb" id="thumb"> 
                </span>
                
            </button>
            `

        const switchControl = shadow.getElementById('control')
        const switchThumb = shadow.getElementById('thumb')

        switchControl.addEventListener('click', () => {
            if(!this.disabled) {
                // this.input.checked = !this.input.checked
                // this.checked = this.input.checked;
                if(this.checked) {
                    this.checked = false;
                    switchControl.setAttribute('aria-checked', false)
                    switchThumb.classList.remove('checked')
                } else {
                    this.checked = true;
                    switchControl.setAttribute('aria-checked', true)
                    switchThumb.classList.add('checked')
                }
                
            }      
        });
        

        if(this.label !== '' ) {
            if(this.includeLabel) {
                switchControl.setAttribute('aria-labelledby', this.label)
                const label = document.createElement('span')
                label.setAttribute('id', this.label)
                label.classList.add('switch__label')
                if(this.disabled) {
                    label.classList.add('switch__label--disabled')
                }
                label.innerHTML = this.label
                shadow.prepend(label);
            } else {
                switchControl.setAttribute('aria-label', this.label)
            }
        } else {
            throw Error ('Please provide a valid label')
        }

        if(this.disabled) {
            this.setAttribute('disabled', true);
            switchControl.classList.add('switch__control--disabled')
            switchThumb.classList.add('switch__thumb--disabled') 
        }

        this.__style = document.createElement("style")
     
        shadow.appendChild(this.__style);

        this.__style.innerHTML = ` 
        
        :host {
            --container-width: 3rem; 
            --color-control: #c2b9b8;
            --color-thumb: white;
            --color-focus: black;
            --color-label: black;
            --color-border: black;
            --color-control-disabled: #E7E7E7;
            --color-thumb-disabled: #e6dddc;
            --color-label-disabled: #c2b9b8;
            display: flex;
            align-items: center;
        } 

    
        
        .switch__label {
            color: var(--color-label);
            font-family: "Gill Sans", sans-serif;
            font-size: 1.2em;
            padding-inline-end: 0.3em;
        }

        .switch__control {
            --color: var(--color-control);
            display: block;
            background-color: var(--color);
            width: var(--container-width);
            height: calc(var(--container-width) / 3);
            border: 1px solid var(--color-border);
            border-radius: calc(var(--container-width) / 2 );
            position: relative;
            cursor: pointer;
            
        }   

        .switch__control--disabled{
            cursor: default;
            --color: var(--color-control-disabled)
        }

        .switch__control:focus ~ .switch__control  {
            outline: solid 2px var(--color-focus) 
        }
    
        .switch__thumb {
            --color: var(--color-thumb);
            position: absolute;
            background-color: var(--color);
            --size: calc(var(--container-width) / 2);
            width: var(--size);
            height: var(--size);
            border: 1px solid var(--color-border);
            border-radius: calc(var(--container-width) / 2 );
            font-size: var(--size);
            top: -5px;
            left: -1px;
            transition: left 300ms;
        }

        .switch__thumb--disabled {
            --color: var(--color-thumb-disabled);
        }

        .checked  {
            content: "";
            left: var(--size); 
            top: -5px;
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
                width: calc(var(--container-width)/3);
            } 
            .switch__thumb {
                left: -6px;
                transition: top 300ms;
            }
            .checked {
                left: -6px;
                top: var(--size);
            }
            .switch__label {
                padding-inline-end: 0px;
                padding-bottom: 0.3em;
            }
        }
        @media (prefers-color-scheme: dark) {
            :host {
            --color-thumb: black;
            --color-focus: white;
            --color-label: white;
            --color-border: white;
            --color-control-disabled: #E7E7E7;
            --color-thumb-disabled: #e6dddc;
            --color-label-disabled: #c2b9b8;
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
