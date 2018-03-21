# Expand Toggle

[![npm](https://badge.fury.io/js/%40threespot%2Fexpand-toggle.svg)](https://www.npmjs.com/package/@threespot/expand-toggle)
[![Build Status](https://travis-ci.org/Threespot/expand-toggle.svg?branch=master)](https://travis-ci.org/Threespot/expand-toggle)
[![Coverage Status](https://coveralls.io/repos/github/Threespot/expand-toggle/badge.svg)](https://coveralls.io/github/Threespot/expand-toggle)

Simple and accessible expandable functionality, similar to jQuery’s `slideToggle()` method.

Inspired by https://inclusive-components.design/menus-menu-buttons#truemenus.

## Install

```bash
yarn add @threespot/expand-toggle
```

## Usage

**JavaScript**

```js
import ExpandToggle from "@threespot/expand-toggle";

const toggles = document.querySelectorAll("[data-expands]");

// ES6
toggles.forEach( (el) => new ExpandToggle(el) );

// ES5
for (var i = 0, len = toggles.length; i < len; i++) {
  new ExpandToggle(toggles[i]);
}
```

**Styles**

The following styles are required (class name is just for example purposes):

```scss
  .expandable {
    $menu-speed: 400ms;
    max-height: 0;// hide on load to prevent relayout
    overflow: hidden;
    transition: max-height $menu-speed ease-in-out,
                visibility 0s linear 0s;
    visibility: visible;

    &[aria-hidden="true"] {
      max-height: 0 !important;// !important required to override inline styles added by JS
      transition: max-height $menu-speed ease-in-out,
                  visibility 0s linear $menu-speed;
      visibility: hidden;
    }
  }
```

**Markup**

```html
  <button type="button" data-expands="menu" data-expands-class="is-expanded" data-expands-height>
    <span data-expands-text="Close">Toggle Menu</span>
  </button>

  <div class="expandable" id="menu">
    <p>This content will be hidden to start.</p>
  </div>
```

### Options

`data-expands-class` defines a class (or multiple classes) to apply to the toggle button and expandable element when expanded

`data-expands-height` transitions the menu height using `max-height` and CSS transitions (see required CSS above)

`data-expands-text` defines button text to use when expanded

These options can also be set in JavaScript:

```js
new ExpandToggle(el, {
  expandedClasses: "is-expanded",
  shouldToggleHeight: true,
  activeToggleText: "Close",
});
```

## License

This is free software and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/expand-toggle/blob/master/LICENSE.md).

## About Threespot

Threespot is an independent digital agency hell-bent on helping those, and only those, who are committed to helping others. Find out more at [https://www.threespot.com](https://www.threespot.com).

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
