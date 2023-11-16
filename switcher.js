export default class VivittSwitcher extends HTMLElement{
    constructor() {
    super();
        this.checked = false;
    }   

    static get observedAttributes() {
        return ['checked', 'label', 'include-label', 'dark']
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

    get dark() {
        return this.hasAttribute('dark')
    }


    connectedCallback() {
        
            const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true }); 
        
            shadow.innerHTML = `
                <button role="switch" class="switch__background" id="background">
                    <span class="switch__control" id="control"> 
                    </span>

                </button>
                `

            const switchBackground = shadow.getElementById('background')
            const switchControl = shadow.getElementById('control')

            switchBackground.addEventListener('click', () => {
                if(!this.disabled) {
                    // this.input.checked = !this.input.checked
                    // this.checked = this.input.checked;
                    if(this.checked) {
                        this.checked = false;
                        switchBackground.setAttribute('aria-checked', false)
                        switchBackground.classList.remove('checked')
                        switchControl.classList.remove('checked')
                    } else {
                        this.checked = true;
                        switchBackground.setAttribute('aria-checked', true)
                        switchBackground.classList.add('checked')
                        switchControl.classList.add('checked')
                    }
                    
                }      
            });
        

        
            if(this.includeLabel) {
                switchBackground.setAttribute('aria-labelledby', this.label)
                const label = document.createElement('span')
                label.setAttribute('id', this.label)
                label.classList.add('switch__label')
                if(this.disabled) {
                    label.classList.add('switch__label--disabled')
                }
                if(this.dark) {
                    label.classList.add('dark')
                }
                label.innerHTML = this.label
                shadow.prepend(label);
            } else {
                switchBackground.setAttribute('aria-label', this.label)
            }
        
            if(this.disabled) {
                this.setAttribute('disabled', true);
                switchBackground.classList.add('switch__background--disabled')
                switchControl.classList.add('switch__control--disabled') 
            }

            if(this.dark) {
                switchBackground.classList.add('dark')
                switchControl.classList.add('dark')
            }

            this.__style = document.createElement("style")
        
            shadow.appendChild(this.__style);

            this.__style.innerHTML = ` 

        :host {
            --container-width: 3rem; 
            --label-font-family: "Gill Sans", sans-serif;
            display: flex;
            align-items: center;

            --color-background: white;
            --color-background-checked: black;
            --color-control: white;
            --color-label: black;
            --color-border: black;

            --color-background-dark: black;
            --color-background-checked-dark: white;
            --color-control-dark: black;
            --color-label-dark: white;
            --color-border-dark: white;

            --color-background-disabled: #E7E7E7;
            --color-control-disabled: #e6dddc;
            --color-label-disabled: #c2b9b8;
            --color-border-disabled: #c2b9b8;
       
            --color-background-dark-disabled: #E7E7E7;
            --color-control-dark-disabled: #e6dddc;
            --color-label-dark-disabled: #c2b9b8;
           
            --background-border: 1px solid var(--color-border);
            --background-border-disabled: 1px solid var(--color-border-disabled);
            --control-border: 1px solid var(--color-border);
            --control-border-disabled: 1px solid var(--color-border-disabled);
            --background-border-dark: 1px solid var(--color-border-dark);
            --control-border-dark: 1px solid var(--color-border-dark);
            --control-box-shadow: inset -3px -2px 3px rgba(0,0,0,.3);
        } 

    
        
        .switch__label {
            color: var(--color-label);
            font-family: var(--label-font-family);
            font-size: 1.2em;
            padding-inline-end: 0.3em;
        }

        .switch__background {
            --color: var(--color-background);
            display: block;
            background-color: var(--color);
            width: var(--container-width);
            height: calc(var(--container-width) / 3);
            border: var(--background-border);
            border-radius: calc(var(--container-width) / 2 );
            position: relative;
            cursor: pointer;
            
        }   

        .switch__background--disabled{
            cursor: default;
            --color: var(--color-background-disabled);
            border: var(--background-border-disabled);
        }

        .switch__background:focus ~ .switch__background  {
            outline: solid 2px var(--color-focus) 
        }
    
        .switch__control {
            --color: var(--color-control);
            position: absolute;
            background-color: var(--color);
            --size: calc(var(--container-width) / 2);
            width: var(--size);
            height: var(--size);
            border-radius: calc(var(--container-width) / 2 );
            border: var(--control-border);
            box-shadow: var(--control-box-shadow);
            font-size: var(--size);
            top: -5px;
            left: -1px;
            transition: left 300ms;
        }
   

        .switch__control--disabled {
            --color: var(--color-control-disabled);
            border: var(--control-border-disabled);
        }

        .switch__control.checked  {
            left: var(--size); 
            top: -5px;
        } 

        .switch__background.checked {
            --color: var(--color-background-checked);
        }

        .switch__label--disabled {
            color: var(--color-label-disabled);
        }
      

        @media (max-width: 400px) {
            :host {
                flex-direction: column; 
            }
            .switch__background {
                height: var(--container-width);
                width: calc(var(--container-width)/3);
            } 
            .switch__control {
                left: -6px;
                transition: top 300ms;
            }
            .switch__control.checked {
                left: -6px;
                top: var(--size);
            }
            .switch__label {
                padding-inline-end: 0px;
                padding-bottom: 0.3em;
            }
        }
        .switch__background.dark  {
            --color: var(--color-background-dark);
            border: var(--background-border-dark);
        }
        .switch__background.checked.dark {
            --color: var(--color-background-checked-dark);
        }
        .switch__control.dark  {
            --color: var(--color-control-dark);
            border: var(--control-border-dark);
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
