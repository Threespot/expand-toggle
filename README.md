# Expand Toggle

[![npm](https://badge.fury.io/js/%40threespot%2Fexpand-toggle.svg)](https://www.npmjs.com/package/@threespot/expand-toggle)

Simple and accessible expandable functionality, similar to jQuery’s `slideToggle()` method.

Inspired by:

- https://inclusive-components.design/menus-menu-buttons#truemenus
- https://www.stefanjudis.com/snippets/how-to-animate-height-with-css-grid/

## Install

```bash
yarn add @threespot/expand-toggle
```

Requires Node 20+. The package ships as an ES module (`"type": "module"`); consumers using CommonJS will need to load it via dynamic `import()`.

## Usage

**JavaScript**

```js
import ExpandToggle from "@threespot/expand-toggle";

document.querySelectorAll("[data-expands]").forEach(el => new ExpandToggle(el));
```

**Markup**

```html
<button type="button" data-expands="demo" data-expands-class="is-expanded">
  <span data-expands-text="Close">Open</span>
</button>

<div class="expandable" id="demo">
  <div class="expandable-wrap">
    <p>This content will be hidden to start.</p>
  </div>
</div>
```

**Styles**

The following minimum styles are required:

```scss
// This class name is just an example
.expandable {
  $speed: 500ms;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows $speed ease, visibility 0s linear $speed;
  visibility: hidden;

  &[aria-hidden="false"],
  .no-js & {
    grid-template-rows: 1fr;
    transition: grid-template-rows $speed ease, visibility 0s linear 0s;
    visibility: visible;
  }

  &-wrap {
    overflow: hidden;
  }
}
```


### Options

`data-expands-class` defines a class (or multiple classes) to apply to the toggle button and expandable element when expanded

`data-expands-text` defines button text to use when expanded

`data-expanded` will expand the element by default

The following options can be set via JavaScript:

```js
new ExpandToggle(el, {
  expandedClasses: "", // string, accepts multiple space-separated classes
  activeToggleText: "", // expanded state toggle button text
  shouldStartExpanded: false, // component starts expanded on init
  onReady: null // ready callback function
});
```


### Events

#### ready

Since the `ready` event may be trigger immediately, bind using the `onReady` option:

```js
const toggle = new ExpandToggle(el, {
  onReady: function() {
    console.log('ready');
  }
});
```

#### expand

Triggered when component is expanded

```js
toggle.on('expand', function() {
  console.log('expand');
});
```

#### collapse

Triggered when component is collapsed

```js
toggle.on('collapse', function() {
  console.log('collapse');
});
```

#### destroy

Triggered when component is destroyed

```js
toggle.on('destroy', function() {
  console.log('destroy');
});
```

## Development

```bash
yarn install
yarn test            # run the suite (node --test against happy-dom)
yarn test:coverage   # same, with experimental test coverage
```

There is no build step. `index.js` is the published source.

## License

This is free software and may be redistributed under the terms of the [MIT license](https://github.com/Threespot/expand-toggle/blob/master/LICENSE.md).

## About Threespot

Threespot is an independent digital agency hell-bent on helping those, and only those, who are committed to helping others. Find out more at [https://www.threespot.com](https://www.threespot.com).

[![Threespot](https://avatars3.githubusercontent.com/u/370822?v=3&s=100)](https://www.threespot.com)
