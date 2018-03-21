import ExpandToggle from "../index";

// Remove line breaks and consecutive spaces to make it easier to compare markup
function minify(string) {
  return string.replace(/\r?\n|\r/g,'').replace(/\s+/g,' ').trim()
}

// Add inline style tag
// https://stackoverflow.com/a/524721/673457
function addCSS() {
  var css = `
    .expandable {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0ms ease-in-out,
                  visibility 0s linear 0s;
      visibility: visible;
    }

    .expandable[aria-hidden="true"] {
      max-height: 0 !important;
      transition: max-height 0ms ease-in-out,
                  visibility 0s linear 0ms;
      visibility: hidden;
    }`;
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
}

// FIXME: Figure out why max-height is 0px in tests

test('Basic test', () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu">Toggle Menu</button>

    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>
  `;

  // Add demo CSS required to make component work
  addCSS();

  var toggle = document.querySelector('[data-expands]');

  var menu = new ExpandToggle(toggle);

  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="true">Toggle Menu</button>

    <div class="expandable" id="menu" aria-hidden="false">
      <p>Menu content</p>
    </div>`));

  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="false">Toggle Menu</button>

    <div class="expandable" id="menu" aria-hidden="true">
      <p>Menu content</p>
    </div>`));
});


test('Full options test', () => {
  document.body.innerHTML = `
    <div>
      <button type="button" data-expands="menu" data-expands-class="is-expanded" data-expands-height>
        <span data-expands-text="Close">Toggle Menu</span>
      </button>

      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`;

  // Add demo CSS required to make component work
  addCSS();

  var toggle = document.querySelector('[data-expands]');

  var menu = new ExpandToggle(toggle);

  // Expand
  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <button type="button" data-expands="menu" data-expands-class="is-expanded" data-expands-height="" aria-haspopup="true" aria-expanded="true" class="is-expanded">
        <span data-expands-text="Close">Close</span>
      </button>

      <div class="expandable is-expanded" id="menu" aria-hidden="false" style="max-height: 0px;">
        <p>Menu content</p>
      </div>
    </div>`));

  // Collapse
  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <button type="button" data-expands="menu" data-expands-class="is-expanded" data-expands-height="" aria-haspopup="true" aria-expanded="false" class="">
        <span data-expands-text="Close">Toggle Menu</span>
      </button>

      <div class="expandable" id="menu" aria-hidden="true" style="max-height: 0px;">
        <p>Menu content</p>
      </div>
    </div>`));
});


test('JS options test', () => {
  document.body.innerHTML = `
    <div>
      <button type="button" data-expands="menu">
        <span data-expands-text>Toggle Menu</span>
      </button>

      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`;

  // Add demo CSS required to make component work
  addCSS();

  var toggle = document.querySelector('[data-expands]');

  var menu = new ExpandToggle(toggle, {
    expandedClasses: "is-expanded",
    shouldToggleHeight: true,
    activeToggleText: "Close",
  });

  // Expand
  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="true" class="is-expanded">
        <span data-expands-text="">Close</span>
      </button>

      <div class="expandable is-expanded" id="menu" aria-hidden="false" style="max-height: 0px;">
        <p>Menu content</p>
      </div>
    </div>`));

  // Collapse
  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="false" class="">
        <span data-expands-text="">Toggle Menu</span>
      </button>

      <div class="expandable" id="menu" aria-hidden="true" style="max-height: 0px;">
        <p>Menu content</p>
      </div>
    </div>`));
});
