<a name="ThemeAPI"></a>

## ThemeAPI
Browser APIs pertaining to the browser and system themes.

**Kind**: global class  

* [ThemeAPI](#ThemeAPI)
    * _instance_
        * [.hasThemeAPI()](#ThemeAPI+hasThemeAPI) ⇒ <code>boolean</code>
        * [.getDefaultBackground()](#ThemeAPI+getDefaultBackground) ⇒ [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage)
        * [.getDefaultColors()](#ThemeAPI+getDefaultColors) ⇒ [<code>ThemeColors</code>](#ThemeAPI.ThemeColors)
        * [.addThemeObserver(observer)](#ThemeAPI+addThemeObserver)
        * [.showOrHideCustomizeMenu()](#ThemeAPI+showOrHideCustomizeMenu)
    * _static_
        * [.BackgroundImage](#ThemeAPI.BackgroundImage) : <code>object</code>
        * [.Color](#ThemeAPI.Color) : <code>object</code>
        * [.ThemeColors](#ThemeAPI.ThemeColors) : <code>object</code>
        * [.Theme](#ThemeAPI.Theme) : <code>object</code>
        * [.ThemeChanged](#ThemeAPI.ThemeChanged) : <code>function</code>


* * *

<a name="ThemeAPI+hasThemeAPI"></a>

### themeAPI.hasThemeAPI() ⇒ <code>boolean</code>
Check whether the browser supports background image and theme color
customizations.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: <code>boolean</code> - True if theme customizations are supported.  

* * *

<a name="ThemeAPI+getDefaultBackground"></a>

### themeAPI.getDefaultBackground() ⇒ [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage)
Create an object holding the default background image properties.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage) - The default background image.  

* * *

<a name="ThemeAPI+getDefaultColors"></a>

### themeAPI.getDefaultColors() ⇒ [<code>ThemeColors</code>](#ThemeAPI.ThemeColors)
Create an object holding the default theme color properties.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: [<code>ThemeColors</code>](#ThemeAPI.ThemeColors) - The default theme colors.  

* * *

<a name="ThemeAPI+addThemeObserver"></a>

### themeAPI.addThemeObserver(observer)
Add an observer to be notified when the browser or system theme has
changed. The provided callback is triggered immediately with the current
theme.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| observer | [<code>ThemeChanged</code>](#ThemeAPI.ThemeChanged) | Callback triggered when the        browser or system theme has changed. |


* * *

<a name="ThemeAPI+showOrHideCustomizeMenu"></a>

### themeAPI.showOrHideCustomizeMenu()
Show or hide the Customize Chrome side panel.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

* * *

<a name="ThemeAPI.BackgroundImage"></a>

### ThemeAPI.BackgroundImage : <code>object</code>
Meta-information about a background image.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  
**See**: [https://github.com/chromium/chromium/blob/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L55](https://github.com/chromium/chromium/blob/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L55)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| imageUrl | <code>string</code> | URL of the image. |
| imageAlignment | <code>string</code> | The CSS background-position image style. |
| imageTiling | <code>string</code> | The CSS background-repeat image style. |
| thumbnailUrl | <code>string</code> | URL of a thumbnail for the image. |
| attributionLine1 | <code>string</code> | First line of any attribution for the           image, possibly empty. |
| attributionLine2 | <code>string</code> | Second line of any attribution for the           image, possibly empty. |
| attributionUrl | <code>string</code> | A URL to find out more about the image,           possibly empty. |
| attributionImageUrl | <code>string</code> | URL of the attribution image,           possibly empty. |


* * *

<a name="ThemeAPI.Color"></a>

### ThemeAPI.Color : <code>object</code>
An available theme color retrieved from the browser. The list of available
colors is generated at browser build time.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  
**See**: [https://github.com/chromium/chromium/tree/80.0.3987.0/chrome/common/search/selected_colors_info.h](https://github.com/chromium/chromium/tree/80.0.3987.0/chrome/common/search/selected_colors_info.h)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| colorId | <code>number</code> | A unique, numerical ID for the color. |
| color | <code>Array.&lt;number&gt;</code> | A 4-element array of the color's RGBA values. |
| label | <code>string</code> | Description of the color. |
| icon | <code>string</code> | The URL to load to display the color to the user. |


* * *

<a name="ThemeAPI.ThemeColors"></a>

### ThemeAPI.ThemeColors : <code>object</code>
A set of colors composing a browser theme.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| colorId | <code>number</code> | The ID of the [Color](#ThemeAPI.Color) this color           theme is derived from. If no color has been chosen, will be -1. If           a custom color not provided by a [Color](#ThemeAPI.Color), will be 0. |
| color | <code>Array.&lt;number&gt;</code> | A 4-element array of the RGBA values of the           color chosen by the user. |
| colorDark | <code>Array.&lt;number&gt;</code> | A 4-element array of the theme's dark           color's RGBA values. |
| colorLight | <code>Array.&lt;number&gt;</code> | A 4-element array of the theme's light           color's RGBA values. |


* * *

<a name="ThemeAPI.Theme"></a>

### ThemeAPI.Theme : <code>object</code>
Object defining the system' and user's theme.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| darkModeEnabled | <code>boolean</code> | The system's dark mode preference. |
| background | [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage) | The background image chosen           by the user, if any. |
| colors | [<code>ThemeColors</code>](#ThemeAPI.ThemeColors) | The theme colors chosen by the           user, if any. |


* * *

<a name="ThemeAPI.ThemeChanged"></a>

### ThemeAPI.ThemeChanged : <code>function</code>
Callback triggered when browser or system theme has changed.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| theme | [<code>Theme</code>](#ThemeAPI.Theme) | The newly applied theme. |


* * *

