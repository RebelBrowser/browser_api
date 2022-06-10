<a name="ThemeAPI"></a>

## ThemeAPI
Browser APIs pertaining to the browser and system themes.

**Kind**: global class  

* [ThemeAPI](#ThemeAPI)
    * _instance_
        * [.hasThemeAPI()](#ThemeAPI+hasThemeAPI) ⇒ <code>boolean</code>
        * [.supportsLocalImageAsBackground()](#ThemeAPI+supportsLocalImageAsBackground) ⇒ <code>boolean</code>
        * [.getDefaultBackground()](#ThemeAPI+getDefaultBackground) ⇒ [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage)
        * [.getDefaultColors()](#ThemeAPI+getDefaultColors) ⇒ [<code>ThemeColors</code>](#ThemeAPI.ThemeColors)
        * [.getAvailableColors()](#ThemeAPI+getAvailableColors) ⇒ [<code>Array.&lt;Color&gt;</code>](#ThemeAPI.Color)
        * [.addBackgroundCollectionsObserver(observer)](#ThemeAPI+addBackgroundCollectionsObserver)
        * [.addBackgroundImagesObserver(observer)](#ThemeAPI+addBackgroundImagesObserver)
        * [.addLocalBackgroundImageSelectedObserver(observer)](#ThemeAPI+addLocalBackgroundImageSelectedObserver)
        * [.addThemeObserver(observer)](#ThemeAPI+addThemeObserver)
        * [.loadBackgroundImages(collection)](#ThemeAPI+loadBackgroundImages)
        * [.selectLocalBackgroundImage()](#ThemeAPI+selectLocalBackgroundImage)
        * [.previewBackgroundImage(collection, image)](#ThemeAPI+previewBackgroundImage)
        * [.previewColor(color)](#ThemeAPI+previewColor)
        * [.revertPendingChanges()](#ThemeAPI+revertPendingChanges)
        * [.commitPendingChanges()](#ThemeAPI+commitPendingChanges)
    * _static_
        * [.BackgroundCollection](#ThemeAPI.BackgroundCollection) : <code>object</code>
        * [.BackgroundImage](#ThemeAPI.BackgroundImage) : <code>object</code>
        * [.Color](#ThemeAPI.Color) : <code>object</code>
        * [.ThemeColors](#ThemeAPI.ThemeColors) : <code>object</code>
        * [.Theme](#ThemeAPI.Theme) : <code>object</code>
        * [.BackgroundCollectionsChanged](#ThemeAPI.BackgroundCollectionsChanged) : <code>function</code>
        * [.BackgroundImagesChanged](#ThemeAPI.BackgroundImagesChanged) : <code>function</code>
        * [.LocalBackgroundImageSelected](#ThemeAPI.LocalBackgroundImageSelected) : <code>function</code>
        * [.ThemeChanged](#ThemeAPI.ThemeChanged) : <code>function</code>


* * *

<a name="ThemeAPI+hasThemeAPI"></a>

### themeAPI.hasThemeAPI() ⇒ <code>boolean</code>
Check whether the browser supports background image and theme color
customizations.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: <code>boolean</code> - True if theme customizations are supported.  

* * *

<a name="ThemeAPI+supportsLocalImageAsBackground"></a>

### themeAPI.supportsLocalImageAsBackground() ⇒ <code>boolean</code>
Checks whether the browser supports setting the background image from a
local image.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: <code>boolean</code> - True if local images are supported.  

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

<a name="ThemeAPI+getAvailableColors"></a>

### themeAPI.getAvailableColors() ⇒ [<code>Array.&lt;Color&gt;</code>](#ThemeAPI.Color)
Retrieve available browser theme colors.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  
**Returns**: [<code>Array.&lt;Color&gt;</code>](#ThemeAPI.Color) - Array of available browser theme colors.  

* * *

<a name="ThemeAPI+addBackgroundCollectionsObserver"></a>

### themeAPI.addBackgroundCollectionsObserver(observer)
Add an observer to be notified when the list of available background
collections has changed. The provided callback is triggered immediately
with the current list.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| observer | [<code>BackgroundCollectionsChanged</code>](#ThemeAPI.BackgroundCollectionsChanged) | Callback        triggered when the background collection list has changed. |


* * *

<a name="ThemeAPI+addBackgroundImagesObserver"></a>

### themeAPI.addBackgroundImagesObserver(observer)
Add an observer to be notified when the list of available background
images has changed. The provided callback is triggered immediately with
the current list.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| observer | [<code>BackgroundImagesChanged</code>](#ThemeAPI.BackgroundImagesChanged) | Callback triggered        when the background image list has changed. |


* * *

<a name="ThemeAPI+addLocalBackgroundImageSelectedObserver"></a>

### themeAPI.addLocalBackgroundImageSelectedObserver(observer)
Add an observer to be notified when the user has selected a local
background image.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| observer | [<code>LocalBackgroundImageSelected</code>](#ThemeAPI.LocalBackgroundImageSelected) | Callback        triggered when the the user has selected a local background image. |


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

<a name="ThemeAPI+loadBackgroundImages"></a>

### themeAPI.loadBackgroundImages(collection)
Retrieve available background images for a collection.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| collection | [<code>BackgroundCollection</code>](#ThemeAPI.BackgroundCollection) | Collection to fetch        images for. |


* * *

<a name="ThemeAPI+selectLocalBackgroundImage"></a>

### themeAPI.selectLocalBackgroundImage()
Ask the browser to open a file dialoag for the user to select a local
background image. Note: this is used rather than <input type="file">
because browsers do not allow JavaScript to access the selected file path
for security reasons.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

* * *

<a name="ThemeAPI+previewBackgroundImage"></a>

### themeAPI.previewBackgroundImage(collection, image)
Store a background image in a previewed state. The change is not persistent
until it is explicitly committed. If the tab which previewed the image is
closed, the image is automatically reverted.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| collection | [<code>BackgroundCollection</code>](#ThemeAPI.BackgroundCollection) | Collection containing        the image to preview. |
| image | [<code>BackgroundImage</code>](#ThemeAPI.BackgroundImage) | Background image to preview. |


* * *

<a name="ThemeAPI+previewColor"></a>

### themeAPI.previewColor(color)
Preview the browser with a color theme. The change is not persistent until
it is explicitly committed. If the tab which previewed the colors is
closed, the theme is automatically reverted.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| color | [<code>Color</code>](#ThemeAPI.Color) | The color to preview. |


* * *

<a name="ThemeAPI+revertPendingChanges"></a>

### themeAPI.revertPendingChanges()
Revert any previewed background image and color theme to their last
committed state.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

* * *

<a name="ThemeAPI+commitPendingChanges"></a>

### themeAPI.commitPendingChanges()
Commit the currently previewed background image and color theme.

**Kind**: instance method of [<code>ThemeAPI</code>](#ThemeAPI)  

* * *

<a name="ThemeAPI.BackgroundCollection"></a>

### ThemeAPI.BackgroundCollection : <code>object</code>
Meta-information about a collection of background images.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  
**See**: [https://github.com/chromium/chromium/tree/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L30](https://github.com/chromium/chromium/tree/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L30)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| collectionId | <code>string</code> | A unique identifier for the collection. |
| collectionName | <code>string</code> | A human-readable name for the collection. |
| previewImageUrl | <code>string</code> | A preview image from the collection. |


* * *

<a name="ThemeAPI.BackgroundImage"></a>

### ThemeAPI.BackgroundImage : <code>object</code>
Meta-information about a single background image.

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
A single available theme color retrieved from the browser. The list of
available colors is generated at browser build time.

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

<a name="ThemeAPI.BackgroundCollectionsChanged"></a>

### ThemeAPI.BackgroundCollectionsChanged : <code>function</code>
Callback triggered when the list of available background collections has
changed

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| collections | [<code>Array.&lt;BackgroundCollection&gt;</code>](#ThemeAPI.BackgroundCollection) | Available collections. |


* * *

<a name="ThemeAPI.BackgroundImagesChanged"></a>

### ThemeAPI.BackgroundImagesChanged : <code>function</code>
Callback triggered when the set of available background images has changed.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| images | <code>Object.&lt;string, Array.&lt;ThemeAPI.BackgroundImage&gt;&gt;</code> | Available        background images, keyed by collection ID. |


* * *

<a name="ThemeAPI.LocalBackgroundImageSelected"></a>

### ThemeAPI.LocalBackgroundImageSelected : <code>function</code>
Callback triggered when the user has selected a local background image.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  

* * *

<a name="ThemeAPI.ThemeChanged"></a>

### ThemeAPI.ThemeChanged : <code>function</code>
Callback triggered when browser or system theme has changed.

**Kind**: static typedef of [<code>ThemeAPI</code>](#ThemeAPI)  

| Param | Type | Description |
| --- | --- | --- |
| theme | [<code>Theme</code>](#ThemeAPI.Theme) | The newly applied theme. |


* * *

