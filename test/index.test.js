import ExpandToggle from "../index";

// Remove line breaks and consecutive spaces to make it easier to compare markup
function minify(string) {
  return string.replace(/\s{2,}/g,'').trim();
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

// Mocks
// https://github.com/facebook/jest/issues/5147
jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {});
jest.spyOn(console, 'warn').mockImplementation(() => {});

test('Basic test', () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu">Toggle Menu</button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

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


test('Start expanded test', () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu" data-expanded>Toggle Menu</button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

  // Add demo CSS required to make component work
  addCSS();

  var toggle = document.querySelector('[data-expands]');

  var menu = new ExpandToggle(toggle);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <button type="button" data-expands="menu" data-expanded="" aria-haspopup="true" aria-expanded="true">Toggle Menu</button>
    <div class="expandable" id="menu" aria-hidden="false">
      <p>Menu content</p>
    </div>`));
});


test('Keyboard test', () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu">Toggle Menu</button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

  // Add demo CSS required to make component work
  addCSS();

  var toggle = document.querySelector('[data-expands]');

  var menu = new ExpandToggle(toggle);

  toggle.focus();

  // Simulate down arrow key event
  var downArrow = new KeyboardEvent('keydown', {'keyCode': 40});
  toggle.dispatchEvent(downArrow);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="true">Toggle Menu</button>
    <div class="expandable" id="menu" aria-hidden="false">
      <p>Menu content</p>
    </div>`));

  // Simulate escape key event
  var escape = new KeyboardEvent('keydown', {'keyCode': 27});
  toggle.dispatchEvent(escape);

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="false">Toggle Menu</button>
    <div class="expandable" id="menu" aria-hidden="true">
      <p>Menu content</p>
    </div>`));
});


test('Link with data attrs test', () => {
  document.body.innerHTML = `
    <div>
      <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height>
        <span data-expands-text="Close">Toggle Menu</span>
      </a>
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
      <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height="" aria-haspopup="true" aria-expanded="true" role="button" class="is-expanded foo">
        <span data-expands-text="Close">Close</span>
      </a>
      <div class="expandable is-expanded foo" id="menu" aria-hidden="false">
        <p>Menu content</p>
      </div>
    </div>`));

  // Collapse
  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height="" aria-haspopup="true" aria-expanded="false" role="button" class="">
        <span data-expands-text="Close">Toggle Menu</span>
      </a>
      <div class="expandable" id="menu" aria-hidden="true">
        <p>Menu content</p>
      </div>
    </div>`));


  // TODO: Figure out how to test window resize

  // // Create spy to determine if function has been called after resize
  // // https://facebook.github.io/jest/docs/en/jest-object.html#jestspyonobject-methodname-accesstype
  // const spy = jest.spyOn(menu, 'updateExpandedHeight');
  //
  // // Change the viewport to 500px.
  // global.innerWidth = 600;
  //
  // // Trigger the window resize event.
  // global.dispatchEvent(new Event('resize'));
  //
  // // Window resize
  // var resize = new Event('resize');
  // window.dispatchEvent(resize);
  //
  // expect(spy).toHaveBeenCalled();
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

      <div class="expandable is-expanded" id="menu" aria-hidden="false">
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

      <div class="expandable" id="menu" aria-hidden="true">
        <p>Menu content</p>
      </div>
    </div>`));
});


test('Destroy button with events test', () => {
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

  var eventLog = {
    ready: 0,
    expand: 0,
    collapse: 0,
    destroy: 0
  };

  var menu = new ExpandToggle(toggle, {
    expandedClasses: "is-expanded",
    shouldToggleHeight: true,
    activeToggleText: "Close",
    onReady: function() {
      eventLog.ready++;
    }
  });

  menu.on('expand', function() {
    eventLog.expand++;
  });

  menu.on('collapse', function() {
    eventLog.collapse++;
  });

  menu.on('destroy', function() {
    eventLog.destroy++;
  });

  // Expand
  toggle.click();

  // Collapse
  toggle.click();

  // Destroy
  menu.destroy();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <button type="button" data-expands="menu" class="">
        <span data-expands-text="">Toggle Menu</span>
      </button>
      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`));

  // Try clicking toggle again
  toggle.click();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <button type="button" data-expands="menu" class="">
        <span data-expands-text="">Toggle Menu</span>
      </button>
      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`));

  // Test that events fired
  expect(eventLog.ready).toBe(1);
  expect(eventLog.expand).toBe(1);
  expect(eventLog.collapse).toBe(1);
  expect(eventLog.destroy).toBe(1);
});


test('Destroy link test', () => {
  document.body.innerHTML = `
    <div>
      <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height>
        <span data-expands-text="Close">Toggle Menu</span>
      </a>
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

  menu.destroy();

  expect(minify(document.body.innerHTML)).toBe(minify(`
    <div>
      <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height="" class="">
        <span data-expands-text="Close">Toggle Menu</span>
      </a>
      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`));
});

// FIXME: Figure out how to fix this test
// “TypeError: Derived constructors may only return object or undefined”
//
// test('No target element test', () => {
//   document.body.innerHTML = `<button type="button" data-expands="menu">Toggle Menu</button>`;
//   var toggle = document.querySelector('[data-expands]');
//   var menu = new ExpandToggle(toggle);
//   expect(menu).toBeUndefined();
// });
