<div align="center">

# A fully accessible switcher web component

<img src="./assets/switcher.png" alt="switcher component being clicked and changing from off to on, and back to off state" height="auto" width="400"/>

<br/>

This component provides a control to switch between two possible states. In this case is used as an alternative for the checkbox element to chose between dark and light modes.

</div>
<br/>

# Responsive behaviour
The switcher is positioned horizontally in big and medium devices. 
<br/>
<br/>
<div align="center">
<img src="./assets/horizontal.png" alt="switcher component on big devices" height="auto" width="250"/>
<br/>
<br/>
And vertically in small devices of less than 500px.
<br/>
<br/>
<img src="./assets/vertical.png" alt="switcher component off small devices" height="auto" width="200"/>
<br/>
<br/>
</div>


# Installation
This is single file, framework agnostic web component. You can copy it and use inside your project. It is easily customisable by modifing the CSS inside the <style></style> element. 

# Usage
```html
<mode-switcher label="dark mode"></mode-switcher>
    
<mode-switcher label="dark" include-label><mode-switcher>

<mode-switcher label="dark" disabled><mode-switcher>
 
```
Find a [custom usage example here](https://www.viviyanez.dev/).

# Attributes
| Name | Type | Description | 
| ---- | ---- | ----------- |
| label | String | label for the switcher | 
| checked | Boolean | current checked status for the switcher |
| disabled | Boolean | wether the switcher is interactable or not |

# Properties
| Name | Type | Description | Default |
| ---- | ---- | ----------- | -------- |
| includeLabel | Boolean | false | if true, text label will display next to the switcher component | false |

# Events
| Name | Type | Description |
| ---- | ---- | ----------- | 
| checked-changed | CustomEvent | emitted ever the checked status of the switcher changes

# Accessibility
Make sure the *label* attribute is provided to keep the component accesible.

# Notes
Feel free to copy and use, copy, and share this component. Attribution and constructive feedback are always appreciated.
