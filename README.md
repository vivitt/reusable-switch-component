# Vivitt switcher component
A web component switcher element.

# Installation
This is single file component that you can copy and use in any js based project. 
You can made the style changes you need by modifing the CSS inside the <style></style> element. 

# Usage
 <vivitt-switcher label="switchmode"><vivitt-switcher>
 <vivitt-switcher label="switchmode" disabled><vivitt-switcher>
 <vivitt-switcher label="switchmode" include-label="true"><vivitt-switcher>
 <vivitt-switcher label="switchmode" include-label="true" disabled><vivitt-switcher>


# Attributes
| Name | Type | Description | 
| ---- | ---- | ----------- |
| label | String | label for the switcher | 
| checked | Boolean | current checked status for the switcher
| disabled | Boolean | wether the switcher is interactable or not

# Properties
| Name | Type | Description | Default |
| ---- | ---- | ----------- | -------- |
| includeLabel | Boolean | false | if true, the label text will be displayed next to the switcher component | false

# Events
| Name | Type | Description |
| ---- | ---- | ----------- | 
| checked-changed | CustomEvent | emitted ever the checked status of the switcher changes

# Accessibility
The *label* attribute will provide the label for the input inside the switcher. Make sure this is provided to keep the component accesible.

# Notes
Feel free to copy and use, copy, and share this component. Attribution and constructive feedback are always appreciated.