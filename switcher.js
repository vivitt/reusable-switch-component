const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  --container-width: 40px; 
  display: flex;
  align-items: center;

  --color-background: white;
  --color-control: white;
  --color-label: black;
  --color-border-background: black;

  --color-background-dark: black;
  --color-control-dark: black;
  --color-label-dark: white;
  --color-border-background-dark: white;

  --color-control-disabled: #f2f4f7ff;
  --color-border-disabled: #dedee3ff;
  --color-background-disabled: #f2f4f7ff;

  --background-border: 1px solid var(--color-border);
  --background-border-dark: 1px solid var(--color-border-dark);
} 

.switch__label {
  color: var(--color-label);
  font-size: 1.4em;
  padding-inline-end: 0.5em;
}

.switch__background {
  --color: var(--color-background);
  --color-border: var(--color-border-background);
  background-color: var(--color);
  display: block;
  width: var(--container-width);
  height: calc(var(--container-width) / 3);
  border: 1px solid var(--color-border);
  border-radius: 30px;
  position: relative;
  cursor: pointer;   
}   
.switch__background--disabled{
  cursor: default;
  --color: var(--color-background-disabled);
  --color-border: var(--control-border-disabled);
  border: 1px solid var(--color-border-disabled);
}
.switch__control {
  --color: var(--color-control);
  --color-border: var(--color-border-background);
  border-radius: 30px;
  border: 1px solid var(--color-border);
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: var(--color);
  --size: calc(var(--container-width) / 2);
  top: -5px;
  left: -5px;
  transition: left 300ms;
}
.switch__control--disabled {
  --color: var(--color-control-disabled);
  --color-border: var(--control-border-disabled);
  border: 1px solid var(--color-border-disabled);

}
.switch__control:after {
  content: "";
}

[aria-checked="true"] > .switch__control  {
  --color: var(--color-background-dark);
  --color-border: var(--color-border-background-dark);
  background-color: var(--color);
  border: 1px solid var(--color-border);
  left: var(--size); 
  top: -5px;
} 

[aria-checked="true"] > .switch__control:after {
  content: "";
}

[aria-checked="true"] {
--color: var(--color-background-dark);
--color-border: var(--color-border-background-dark);
}

.switch__background:focus {
  outline-offset: 8px;
}

@media (max-width: 500px) {
  :host {
      flex-direction: column; 
  }
  .switch__background {
      height: var(--container-width);
      width: calc(var(--container-width)/3);
  } 
  .switch__control {
      left: -5px;
      transition: top 300ms;
  }
 
  [aria-checked="true"] > .switch__control  {
      left: -5px;
      top: var(--size);
  }
  .switch__label {
      padding-inline-end: 0px;
      padding-bottom: 0.3em;
  }
}
</style>
<button role="switch" class="switch__background" id="background">
<span id="control" class="switch__control" role='img' id="control"> 
</span>

</button>
`;

export default class VivittSwitcher extends HTMLElement {
  static is = 'mode-switcher';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['disabled', 'checked', 'label', 'include-label'];
  }

  connectedCallback() {
    this.addEventListener('click', () => this.onClick());
    this.checked = this.hasAttribute('checked') || false;
    this.update();
    this.handleDisabled();

    const switchControl = this.shadowRoot.getElementById('control');
    const switchBackground = this.shadowRoot.getElementById('background');
    switchControl.setAttribute('aria-label', this.label)        

    if(this.includeLabel) {
        switchControl.setAttribute('aria-labelledby', this.label)
        const label = document.createElement('span')
        label.setAttribute('id', this.label)
        label.classList.add('switch__label')
        label.innerHTML = this.label
        this.shadowRoot.prepend(label);
    } 
    if(this.disabled) {
      switchBackground.classList.add('switch__background--disabled')
      switchControl.classList.add('switch__control--disabled')
     
  } 
  }

  disconnectedCallback() {
    this.removeEventListener('click');
  }

  handleDisabled() {
    if (this.disabled) {
      this.setAttribute('disabled', true);
    }
  }

  onClick() {
    if (!this.disabled) {
      if (this.hasAttribute('checked')) {
        this.removeAttribute('checked');
      } else {
        this.setAttribute('checked', '');
      }
    }
  }

  update() {
    const event = new CustomEvent('checked-changed', {
      bubbles: true,
      composed: true,
      detail: this.checked,
    });
    this.dispatchEvent(event);
    const switchBackground = this.shadowRoot.getElementById('background');

    if (this.checked) {
      switchBackground.setAttribute('aria-checked', true);
    } else {
      switchBackground.setAttribute('aria-checked', false);
    }
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(value) {
    this.toggleAttribute('checked', value);
  }

  get label() {
    if (this.hasAttribute('label')) {
      return this.getAttribute('label');
    }
    return '';
  }

  set label(value) {
    this.setAttribute('label', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get includeLabel() {
    return this.hasAttribute('include-label')
}

  attributeChangedCallback(name) {
    if (name === 'checked') {
      this.update();
    }
  }
}

customElements.define('mode-switcher', VivittSwitcher);