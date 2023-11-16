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
                        switchControl.classList.remove('checked')
                        switchThumb.classList.remove('checked')
                    } else {
                        this.checked = true;
                        switchControl.setAttribute('aria-checked', true)
                        switchControl.classList.add('checked')
                        switchThumb.classList.add('checked')
                    }
                    
                }      
            });
        

        
            if(this.includeLabel) {
                switchControl.setAttribute('aria-labelledby', this.label)
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
                switchControl.setAttribute('aria-label', this.label)
            }
        
            if(this.disabled) {
                this.setAttribute('disabled', true);
                switchControl.classList.add('switch__control--disabled')
                switchThumb.classList.add('switch__thumb--disabled') 
            }

            if(this.dark) {
                switchControl.classList.add('dark')
                switchThumb.classList.add('dark')
            }

            this.__style = document.createElement("style")
        
            shadow.appendChild(this.__style);

            this.__style.innerHTML = ` 

        :host {
            --container-width: 3rem; 
            --label-font-family: "Gill Sans", sans-serif;
            display: flex;
            align-items: center;

            --color-control: white;
            --color-control-checked: black;
            --color-thumb: white;
            --color-label: black;
            --color-border: black;

            --color-control-dark: black;
            --color-control-checked-dark: white;
            --color-thumb-dark: black;
            --color-label-dark: white;
            --color-border-dark: white;

            --color-control-disabled: #E7E7E7;
            --color-thumb-disabled: #e6dddc;
            --color-label-disabled: #c2b9b8;
            --color-border-disabled: #c2b9b8;
       
            --color-control-dark-disabled: #E7E7E7;
            --color-thumb-dark-disabled: #e6dddc;
            --color-label-dark-disabled: #c2b9b8;
           
            --control-border: 1px solid var(--color-border);
            --control-border-disabled: 1px solid var(--color-border-disabled);
            --thumb-border: 1px solid var(--color-border);
            --thumb-border-disabled: 1px solid var(--color-border-disabled);
            --control-border-dark: 1px solid var(--color-border-dark);
            --thumb-border-dark: 1px solid var(--color-border-dark);
            --thumb-box-shadow: inset -3px -2px 3px rgba(0,0,0,.3);
        } 

    
        
        .switch__label {
            color: var(--color-label);
            font-family: var(--label-font-family);
            font-size: 1.2em;
            padding-inline-end: 0.3em;
        }

        .switch__control {
            --color: var(--color-control);
            display: block;
            background-color: var(--color);
            width: var(--container-width);
            height: calc(var(--container-width) / 3);
            border: var(--control-border);
            border-radius: calc(var(--container-width) / 2 );
            position: relative;
            cursor: pointer;
            
        }   

        .switch__control--disabled{
            cursor: default;
            --color: var(--color-control-disabled);
            border: var(--control-border-disabled);
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
            border-radius: calc(var(--container-width) / 2 );
            border: var(--thumb-border);
            box-shadow: var(--thumb-box-shadow);
            font-size: var(--size);
            top: -5px;
            left: -1px;
            transition: left 300ms;
        }
   

        .switch__thumb--disabled {
            --color: var(--color-thumb-disabled);
            border: var(--thumb-border-disabled);
        }

        .switch__thumb.checked  {
            left: var(--size); 
            top: -5px;
        } 

        .switch__control.checked {
            --color: var(--color-control-checked);
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
            .switch__thumb.checked {
                left: -6px;
                top: var(--size);
            }
            .switch__label {
                padding-inline-end: 0px;
                padding-bottom: 0.3em;
            }
        }
        .switch__control.dark  {
            --color: var(--color-control-dark);
            border: var(--control-border-dark);
        }
        .switch__control.checked.dark {
            --color: var(--color-control-checked-dark);
        }
        .switch__thumb.dark  {
            --color: var(--color-thumb-dark);
            border: var(--thumb-border-dark);
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
