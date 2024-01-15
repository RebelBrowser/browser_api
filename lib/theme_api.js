/**
 * Meta-information about a background image.
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
 * An available theme color retrieved from the browser. The list of available
 * colors is generated at browser build time.
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

    if (this._handle !== null) {
      this._hasThemeApi = typeof this._handle.theme !== 'undefined';

      if (this.hasThemeAPI()) {
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
    return this._hasThemeApi;
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
   * Show or hide the Customize Chrome side panel.
   */
  showOrHideCustomizeMenu() {
    if (!this.hasThemeAPI()) {
      return;
    }

    this._handle.theme.showOrHideCustomizeMenu();
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
      const darkModeEnabled = this._handle.darkModeEnabled;

      return {
        darkModeEnabled: darkModeEnabled,
        background: defaultBackground,
        colors: this.getDefaultColors(),
      };
    }

    let theme = this._handle.theme.theme;

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
