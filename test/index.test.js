import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Window } from "happy-dom";

let ExpandToggle;

beforeEach(async () => {
  const window = new Window({ url: "http://localhost/" });
  globalThis.window = window;
  globalThis.document = window.document;
  globalThis.KeyboardEvent = window.KeyboardEvent;
  globalThis.Event = window.Event;
  globalThis.HTMLElement = window.HTMLElement;
  globalThis.Node = window.Node;

  if (!ExpandToggle) {
    ({ default: ExpandToggle } = await import("../index.js"));
  }
});

function minify(string) {
  return string.replace(/\s{2,}/g, "").trim();
}

test("Basic test", () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu">Toggle Menu</button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  new ExpandToggle(toggle);

  toggle.click();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="true">Toggle Menu</button>
      <div class="expandable" id="menu" aria-hidden="false">
        <p>Menu content</p>
      </div>`)
  );

  toggle.click();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="false">Toggle Menu</button>
      <div class="expandable" id="menu" aria-hidden="true">
        <p>Menu content</p>
      </div>`)
  );
});

test("Start expanded test", () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu" data-expanded>Toggle Menu</button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  new ExpandToggle(toggle);

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <button type="button" data-expands="menu" data-expanded="" aria-haspopup="true" aria-expanded="true">Toggle Menu</button>
      <div class="expandable" id="menu" aria-hidden="false">
        <p>Menu content</p>
      </div>`)
  );
});

test("Start expanded applies classes and active text", () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu" data-expanded data-expands-class="is-expanded">
      <span data-expands-text="Close">Open</span>
    </button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  new ExpandToggle(toggle);

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <button type="button" data-expands="menu" data-expanded="" data-expands-class="is-expanded" aria-haspopup="true" aria-expanded="true" class="is-expanded">
        <span data-expands-text="Close">Close</span>
      </button>
      <div class="expandable is-expanded" id="menu" aria-hidden="false">
        <p>Menu content</p>
      </div>`)
  );
});

test("Keyboard test", () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu">Toggle Menu</button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  new ExpandToggle(toggle);

  toggle.focus();

  toggle.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 40 }));

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="true">Toggle Menu</button>
      <div class="expandable" id="menu" aria-hidden="false">
        <p>Menu content</p>
      </div>`)
  );

  toggle.dispatchEvent(new KeyboardEvent("keydown", { keyCode: 27 }));

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="false">Toggle Menu</button>
      <div class="expandable" id="menu" aria-hidden="true">
        <p>Menu content</p>
      </div>`)
  );
});

test("Link with data attrs test", () => {
  document.body.innerHTML = `
    <div>
      <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height>
        <span data-expands-text="Close">Toggle Menu</span>
      </a>
      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  new ExpandToggle(toggle);

  toggle.click();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <div>
        <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height="" aria-haspopup="true" aria-expanded="true" role="button" class="is-expanded foo">
          <span data-expands-text="Close">Close</span>
        </a>
        <div class="expandable is-expanded foo" id="menu" aria-hidden="false">
          <p>Menu content</p>
        </div>
      </div>`)
  );

  toggle.click();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <div>
        <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height="" aria-haspopup="true" aria-expanded="false" role="button" class="">
          <span data-expands-text="Close">Toggle Menu</span>
        </a>
        <div class="expandable" id="menu" aria-hidden="true">
          <p>Menu content</p>
        </div>
      </div>`)
  );
});

test("JS options test", () => {
  document.body.innerHTML = `
    <div>
      <button type="button" data-expands="menu">
        <span data-expands-text>Toggle Menu</span>
      </button>
      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  new ExpandToggle(toggle, {
    expandedClasses: "is-expanded",
    shouldToggleHeight: true,
    activeToggleText: "Close",
  });

  toggle.click();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <div>
        <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="true" class="is-expanded">
          <span data-expands-text="">Close</span>
        </button>
        <div class="expandable is-expanded" id="menu" aria-hidden="false">
          <p>Menu content</p>
        </div>
      </div>`)
  );

  toggle.click();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <div>
        <button type="button" data-expands="menu" aria-haspopup="true" aria-expanded="false" class="">
          <span data-expands-text="">Toggle Menu</span>
        </button>
        <div class="expandable" id="menu" aria-hidden="true">
          <p>Menu content</p>
        </div>
      </div>`)
  );
});

test("Destroy button with events test", () => {
  document.body.innerHTML = `
    <div>
      <button type="button" data-expands="menu">
        <span data-expands-text>Toggle Menu</span>
      </button>
      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`;

  const toggle = document.querySelector("[data-expands]");

  const eventLog = { ready: 0, expand: 0, collapse: 0, destroy: 0 };

  const menu = new ExpandToggle(toggle, {
    expandedClasses: "is-expanded",
    shouldToggleHeight: true,
    activeToggleText: "Close",
    onReady() {
      eventLog.ready++;
    },
  });

  menu.on("expand", () => eventLog.expand++);
  menu.on("collapse", () => eventLog.collapse++);
  menu.on("destroy", () => eventLog.destroy++);

  toggle.click();
  toggle.click();
  menu.destroy();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <div>
        <button type="button" data-expands="menu" class="">
          <span data-expands-text="">Toggle Menu</span>
        </button>
        <div class="expandable" id="menu">
          <p>Menu content</p>
        </div>
      </div>`)
  );

  toggle.click();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <div>
        <button type="button" data-expands="menu" class="">
          <span data-expands-text="">Toggle Menu</span>
        </button>
        <div class="expandable" id="menu">
          <p>Menu content</p>
        </div>
      </div>`)
  );

  assert.equal(eventLog.ready, 1);
  assert.equal(eventLog.expand, 1);
  assert.equal(eventLog.collapse, 1);
  assert.equal(eventLog.destroy, 1);
});

test("Destroy link test", () => {
  document.body.innerHTML = `
    <div>
      <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height>
        <span data-expands-text="Close">Toggle Menu</span>
      </a>
      <div class="expandable" id="menu">
        <p>Menu content</p>
      </div>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  const menu = new ExpandToggle(toggle);

  toggle.click();
  menu.destroy();

  assert.equal(
    minify(document.body.innerHTML),
    minify(`
      <div>
        <a href="#" data-expands="menu" data-expands-class="is-expanded foo" data-expands-height="" class="">
          <span data-expands-text="Close">Toggle Menu</span>
        </a>
        <div class="expandable" id="menu">
          <p>Menu content</p>
        </div>
      </div>`)
  );
});

test("expand and collapse are idempotent", () => {
  document.body.innerHTML = `
    <button type="button" data-expands="menu">Toggle Menu</button>
    <div class="expandable" id="menu">
      <p>Menu content</p>
    </div>`;

  const toggle = document.querySelector("[data-expands]");
  const menu = new ExpandToggle(toggle);

  let expandCount = 0;
  let collapseCount = 0;
  menu.on("expand", () => expandCount++);
  menu.on("collapse", () => collapseCount++);

  menu.expand();
  menu.expand();
  menu.expand();
  assert.equal(expandCount, 1);

  menu.collapse();
  menu.collapse();
  assert.equal(collapseCount, 1);
});

test("Missing target element warns and does not throw", (t) => {
  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (msg) => warnings.push(msg);
  t.after(() => {
    console.warn = originalWarn;
  });

  document.body.innerHTML = `<button type="button" data-expands="missing">Toggle</button>`;
  const toggle = document.querySelector("[data-expands]");

  assert.doesNotThrow(() => new ExpandToggle(toggle));
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /missing/);
});
