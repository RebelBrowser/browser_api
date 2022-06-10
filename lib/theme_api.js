/**
 * Meta-information about a collection of background images.
 *
 * @see {@link https://github.com/chromium/chromium/tree/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L30}
 *
 * @typedef {object} BackgroundCollection
 * @memberof ThemeAPI
 *
 * @property {string} collectionId - A unique identifier for the collection.
 * @property {string} collectionName - A human-readable name for the collection.
 * @property {string} previewImageUrl - A preview image from the collection.
 */

/**
 * Meta-information about a single background image.
 *
 * @see {@link https://github.com/chromium/chromium/blob/80.0.3987.0/chrome/browser/search/background/ntp_background_data.h#L55}
 *
 * @typedef {object} BackgroundImage
 * @memberof ThemeAPI
 *
 * @property {string} imageUrl - URL of the image.
 * @property {string} imageAlignment - The CSS background-position image style.
 * @property {string} imageTiling - The CSS background-repeat image style.
 * @property {string} thumbnailUrl - URL of a thumbnail for the image.
 * @property {string} attributionLine1 - First line of any attribution for the
 *           image, possibly empty.
 * @property {string} attributionLine2 - Second line of any attribution for the
 *           image, possibly empty.
 * @property {string} attributionUrl - A URL to find out more about the image,
 *           possibly empty.
 * @property {string} attributionImageUrl - URL of the attribution image,
 *           possibly empty.
 */

/**
 * A single available theme color retrieved from the browser. The list of
 * available colors is generated at browser build time.
 *
 * @see {@link https://github.com/chromium/chromium/tree/80.0.3987.0/chrome/common/search/selected_colors_info.h}
 *
 * @typedef {object} Color
 * @memberof ThemeAPI
 *
 * @property {number} colorId - A unique, numerical ID for the color.
 * @property {number[]} color - A 4-element array of the color's RGBA values.
 * @property {string} label - Description of the color.
 * @property {string} icon - The URL to load to display the color to the user.
 */

/**
 * A set of colors composing a browser theme.
 *
 * @typedef {object} ThemeColors
 * @memberof ThemeAPI
 *
 * @property {number} colorId - The ID of the {@link ThemeAPI.Color} this color
 *           theme is derived from. If no color has been chosen, will be -1. If
 *           a custom color not provided by a {@link ThemeAPI.Color}, will be 0.
 * @property {number[]} color - A 4-element array of the RGBA values of the
 *           color chosen by the user.
 * @property {number[]} colorDark - A 4-element array of the theme's dark
 *           color's RGBA values.
 * @property {number[]} colorLight - A 4-element array of the theme's light
 *           color's RGBA values.
 */

/**
 * Object defining the system' and user's theme.
 *
 * @typedef {object} Theme
 * @memberof ThemeAPI
 *
 * @property {boolean} darkModeEnabled - The system's dark mode preference.
 * @property {ThemeAPI.BackgroundImage} background - The background image chosen
 *           by the user, if any.
 * @property {ThemeAPI.ThemeColors} colors - The theme colors chosen by the
 *           user, if any.
 */

/**
 * Callback triggered when the list of available background collections has
 * changed
 *
 * @callback BackgroundCollectionsChanged
 * @memberof ThemeAPI
 *
 * @param {ThemeAPI.BackgroundCollection[]} collections - Available collections.
 */

/**
 * Callback triggered when the set of available background images has changed.
 *
 * @callback BackgroundImagesChanged
 * @memberof ThemeAPI
 *
 * @param {Object.<string, ThemeAPI.BackgroundImage[]>} images - Available
 *        background images, keyed by collection ID.
 */

/**
 * Callback triggered when the user has selected a local background image.
 *
 * @callback LocalBackgroundImageSelected
 * @memberof ThemeAPI
 */

/**
 * Callback triggered when browser or system theme has changed.
 *
 * @callback ThemeChanged
 * @memberof ThemeAPI
 *
 * @param {ThemeAPI.Theme} theme - The newly applied theme.
 */

/**
 * Browser APIs pertaining to the browser and system themes.
 *
 * @hideconstructor
 */
class ThemeAPI {
  constructor(api) {
    this._handle = api._handle;
    this._hasThemeApi = false;

    this._collectionsObservers = [];
    this._imagesObservers = [];
    this._localBackgroundImageObservers = [];
    this._themeObservers = [];

    this._defaultBackground = Object.freeze({
      collectionId: '',
      imageUrl: '',
      imageAlignment: 'center center',
      imageTiling: 'no-repeat',
      thumbnailUrl: '',
      attributionLine1: '',
      attributionLine2: '',
      attributionUrl: '',
      attributionImageUrl: '',
    });

    this._defaultColors = Object.freeze({
      colorId: -1,
      color: [0, 0, 0, 0],
      colorDark: [0, 0, 0, 0],
      colorLight: [0, 0, 0, 0],
    });

    this._previewedBackgroundImage = null;

    if (this._handle !== null) {
      this._hasThemeApi = typeof this._handle.theme !== 'undefined';

      if (this.hasThemeAPI()) {
        this._handle.theme.onBackgroundCollectionsChanged = () =>
          this._notifyAboutBackgroundCollections();
        this._handle.theme.onBackgroundImagesChanged = () =>
          this._notifyAboutBackgroundImages();
        this._handle.theme.onLocalBackgroundImageSelected = () =>
          this._notifyAboutLocalBackgroundImageSelected();
        this._handle.theme.onThemeChanged = () => this._notifyAboutTheme();

        // Internally, the browser sends a network request to get the list of
        // background collections. Start this process early.
        this._handle.theme.loadBackgroundCollections();
      } else if (this._hasThemeApi) {
        this._handle.theme.onThemeChanged = () => this._notifyAboutTheme();
      } else {
        this._handle.onDarkModeChanged = () => this._notifyAboutTheme();
      }
    }
  }

  /**
   * Check whether the browser supports background image and theme color
   * customizations.
   *
   * @return {boolean} True if theme customizations are supported.
   */
  hasThemeAPI() {
    if (!this._hasThemeApi) {
      return false;
    }

    const backgroundCustomization = this._handle.theme.setBackgroundImage;
    const colorsCustomization = this._handle.theme.previewColor;

    return (
      backgroundCustomization &&
      typeof backgroundCustomization === 'function' &&
      colorsCustomization &&
      typeof colorsCustomization === 'function'
    );
  }

  /**
   * Checks whether the browser supports setting the background image from a
   * local image.
   *
   * @return {boolean} True if local images are supported.
   */
  supportsLocalImageAsBackground() {
    if (!this.hasThemeAPI()) {
      return false;
    }

    const selectLocalImage = this._handle.theme.selectLocalBackgroundImage;
    return selectLocalImage && typeof selectLocalImage === 'function';
  }

  /**
   * Create an object holding the default background image properties.
   *
   * @return {ThemeAPI.BackgroundImage} The default background image.
   */
  getDefaultBackground() {
    return Object.assign({}, this._defaultBackground);
  }

  /**
   * Create an object holding the default theme color properties.
   *
   * @return {ThemeAPI.ThemeColors} The default theme colors.
   */
  getDefaultColors() {
    return Object.assign({}, this._defaultColors);
  }

  /**
   * Retrieve available browser theme colors.
   *
   * @return {ThemeAPI.Color[]} Array of available browser theme colors.
   */
  getAvailableColors() {
    if (!this.hasThemeAPI()) {
      return [];
    }

    return this._handle.theme.colors;
  }

  /**
   * Add an observer to be notified when the list of available background
   * collections has changed. The provided callback is triggered immediately
   * with the current list.
   *
   * @param {ThemeAPI.BackgroundCollectionsChanged} observer - Callback
   *        triggered when the background collection list has changed.
   */
  addBackgroundCollectionsObserver(observer) {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    this._collectionsObservers.push(observer);
    observer(this._handle.theme.backgroundCollections);
  }

  /**
   * Add an observer to be notified when the list of available background
   * images has changed. The provided callback is triggered immediately with
   * the current list.
   *
   * @param {ThemeAPI.BackgroundImagesChanged} observer - Callback triggered
   *        when the background image list has changed.
   */
  addBackgroundImagesObserver(observer) {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    this._imagesObservers.push(observer);
    observer(this._handle.theme.backgroundImages);
  }

  /**
   * Add an observer to be notified when the user has selected a local
   * background image.
   *
   * @param {ThemeAPI.LocalBackgroundImageSelected} observer - Callback
   *        triggered when the the user has selected a local background image.
   */
  addLocalBackgroundImageSelectedObserver(observer) {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    this._localBackgroundImageObservers.push(observer);
  }

  /**
   * Add an observer to be notified when the browser or system theme has
   * changed. The provided callback is triggered immediately with the current
   * theme.
   *
   * @param {ThemeAPI.ThemeChanged} observer - Callback triggered when the
   *        browser or system theme has changed.
   */
  addThemeObserver(observer) {
    if (this._handle === null) {
      return;
    }

    let theme = this._createTheme();

    // If available, consult the system's dark mode setting for the default.
    if (window.matchMedia) {
      const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme.darkModeEnabled = theme.darkModeEnabled || system;
    }

    this._themeObservers.push(observer);
    observer(theme);
  }

  /**
   * Retrieve available background images for a collection.
   *
   * @param {ThemeAPI.BackgroundCollection} collection - Collection to fetch
   *        images for.
   */
  loadBackgroundImages(collection) {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    this._handle.theme.loadBackgroundImages(collection.collectionId);
  }

  /**
   * Ask the browser to open a file dialoag for the user to select a local
   * background image. Note: this is used rather than <input type="file">
   * because browsers do not allow JavaScript to access the selected file path
   * for security reasons.
   */
  selectLocalBackgroundImage() {
    if (this._handle === null || !this.supportsLocalImageAsBackground()) {
      return;
    }

    this._handle.theme.selectLocalBackgroundImage();
  }

  /**
   * Store a background image in a previewed state. The change is not persistent
   * until it is explicitly committed. If the tab which previewed the image is
   * closed, the image is automatically reverted.
   *
   * @param {ThemeAPI.BackgroundCollection} collection - Collection containing
   *        the image to preview.
   * @param {ThemeAPI.BackgroundImage} image - Background image to preview.
   */
  previewBackgroundImage(collection, image) {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    // The browser does not have a notion of previewing a background image, like
    // it does for colors. Instead, we will override the browser's background
    // image in the ThemeAPI.Theme object we provide consumers.
    this._previewedBackgroundImage = image || this.getDefaultBackground();

    if (collection !== null) {
      this._previewedBackgroundImage.collectionId = collection.collectionId;
    }

    this._notifyAboutTheme();
  }

  /**
   * Preview the browser with a color theme. The change is not persistent until
   * it is explicitly committed. If the tab which previewed the colors is
   * closed, the theme is automatically reverted.
   *
   * @param {ThemeAPI.Color} color - The color to preview.
   */
  previewColor(color) {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    color = color || this.getDefaultColors();
    this._handle.theme.previewColor(color.color);
  }

  /**
   * Revert any previewed background image and color theme to their last
   * committed state.
   */
  revertPendingChanges() {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    if (this._previewedBackgroundImage !== null) {
      this._previewedBackgroundImage = null;
      this._notifyAboutTheme();
    }

    this._handle.theme.revertColor();
  }

  /**
   * Commit the currently previewed background image and color theme.
   */
  commitPendingChanges() {
    if (this._handle === null || !this.hasThemeAPI()) {
      return;
    }

    if (this._previewedBackgroundImage !== null) {
      this._handle.theme.setBackgroundImage(
        this._previewedBackgroundImage.collectionId,
        this._previewedBackgroundImage.imageUrl,
        this._previewedBackgroundImage.attributionLine1,
        this._previewedBackgroundImage.attributionLine2,
        this._previewedBackgroundImage.attributionUrl
      );

      this._previewedBackgroundImage = null;
    }

    this._handle.theme.commitColor();
  }

  /**
   * Notify all observers of a change in the list of available background
   * collections.
   *
   * @private
   */
  _notifyAboutBackgroundCollections() {
    const collections = this._handle.theme.backgroundCollections;
    this._collectionsObservers.forEach((observer) => observer(collections));
  }

  /**
   * Notify all observers of a change in the list of available background
   * images.
   *
   * @private
   */
  _notifyAboutBackgroundImages() {
    const images = this._handle.theme.backgroundImages;
    this._imagesObservers.forEach((observer) => observer(images));
  }

  /**
   * Notify all observers that the user has selected a local background image.
   *
   * @private
   */
  _notifyAboutLocalBackgroundImageSelected() {
    this._localBackgroundImageObservers.forEach((observer) => observer());
  }

  /**
   * Notify all observers of a change in the browser or system theme.
   *
   * @private
   */
  _notifyAboutTheme() {
    const theme = this._createTheme();
    this._themeObservers.forEach((observer) => observer(theme));
  }

  /**
   * Convert theme information provided by the browser to an object to be given
   * to observers. Override with any previewed state.
   *
   * @return {ThemeAPI.Theme} The created theme.
   *
   * @private
   */
  _createTheme() {
    const defaultBackground = this.getDefaultBackground();

    if (!this.hasThemeAPI()) {
      const darkModeEnabled = this._hasThemeApi
        ? this._handle.theme.darkModeEnabled
        : this._handle.darkModeEnabled;

      return {
        darkModeEnabled: darkModeEnabled,
        background: defaultBackground,
        colors: this.getDefaultColors(),
      };
    }

    let theme = this._handle.theme.theme;

    if (this._previewedBackgroundImage !== null) {
      theme.background = this._previewedBackgroundImage;
    }

    // Fill in properties that may not appear in older browser versions.
    for (const property in defaultBackground) {
      if (!theme.background.hasOwnProperty(property)) {
        theme.background[property] = defaultBackground[property];
      }
    }

    return theme;
  }
}

module.exports = ThemeAPI;
