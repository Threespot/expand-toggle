"use strict";

import debounce from "lodash/debounce";

/**
 * Wrap the last X words in an HTML tag to prevent them from wrapping (i.e. orphans)
 * @param {HTMLElement} el - Toggle button DOM node
 * @param {Object} opts - Options
 * @param {string} [opts.expandedClasses=""] - Class(es) to apply when expanded
 * @param {boolean} [opts.shouldToggleHeight=false] - Whether or not to animate height
 * @param {string} [opts.defaultToggleText=""] - Expanded state toggle button text
 */
export default class ExpandToggle {
  constructor(el, opts) {
    var self = this;
    this.el = el;
    this.targetId = this.el.getAttribute("data-expands");
    this.targetEl = document.getElementById(this.targetId);

    // Ensure target element exist before initializing
    if (!this.targetEl) {
      console.warn(`Can’t find expandable target with id “${this.targetId}”`);
      return false;
    }

    // Use Object.assign() to merge “opts” object with default values in this.options
    this.options = Object.assign(
      {},
      {
        expandedClasses: "", // string, accepts multiple space-separated classes
        shouldToggleHeight: false, // should target element’s height be animated using max-height
        activeToggleText: "" // expanded state toggle button text
      },
      opts
    );

    // Check for custom expanded class(es)
    this.expandedClasses =
      this.el.getAttribute("data-expands-class") ||
      this.options.expandedClasses;

    if (this.expandedClasses.length) {
      // Check if active class string contains multiple classes
      if (this.expandedClasses.indexOf(" ") > -1) {
        // Convert to array and remove any empty string values
        // caused by having multiple spaces in a row.
        this.expandedClasses = this.expandedClasses
          .split(" ")
          .filter(n => n.length);
      } else {
        // We still need to convert a single active class to an array
        // so we can use the spread syntax later in classList.add()
        this.expandedClasses = [this.expandedClasses];
      }
    }

    // Check if height should be animated
    this.shouldToggleHeight =
      this.el.hasAttribute("data-expands-height") ||
      this.options.shouldToggleHeight;


    // Check for custom toggle button text to use when expanded
    this.hasActiveText = false;
    this.textEl = this.el.querySelector("[data-expands-text]");

    if (this.textEl) {
      this.defaultToggleText = this.textEl.textContent;
      this.activeToggleText =
        this.textEl.getAttribute("data-expands-text") ||
        this.options.activeToggleText;
      this.hasActiveText = !!this.activeToggleText.length;
    }

    this.init();
  }

  init() {
    var self = this;

    // Accessibility setup
    this.el.setAttribute("aria-haspopup", true);
    this.el.setAttribute("aria-expanded", false);
    // Omit “aria-controls” for now
    // See https://inclusive-components.design/menus-menu-buttons/#ariacontrols
    // this.el.setAttribute("aria-controls", this.targetId);
    this.targetEl.setAttribute("aria-hidden", true);

    if (this.el.tagName.toLowerCase() === "a") {
      this.el.setAttribute("role", "button");
    }

    if (this.shouldToggleHeight) {
      this.heightToggleSetup();
    }

    // Add click event listener on toggle button
    this.el.addEventListener("click", this.toggle.bind(this));

    // Keyboard listeners on toggle button
    this.el.addEventListener("keydown", this.keydownHandler.bind(this));
  }

  keydownHandler(evt) {
    // Expand with down arrow
    if (evt.keyCode == 40) {
      this.expand();
    } else if (evt.keyCode == 38 || evt.keyCode == 27) {
      // Close with up arrow or escape key
      this.collapse();
    }
  }

  heightToggleSetup() {
    var self = this;
    this.targetParentEl = this.targetEl.parentNode;

    // Set max-height to the expanded height so we can animate it.
    this.updateExpandedHeight();

    // Update target element’s max-height on resize
    window.addEventListener(
      "resize",
      debounce(function(event) {
        self.updateExpandedHeight();
      }, 150)
    );
  }

  // Set max-height of target element to its expanded height without triggering relayout.
  //
  // This technique works by creating an absolutely-positioned invisible clone of the target
  // element and calculating its height. This avoids any relayout that would otherwise occur
  // if the element was briefly expanded so we could measure it.
  //
  // Note: We’re using CSS to transition max-height instead jQuery’s slideToggle(),
  //       or another 3rd-party lib like Velocity.js, to avoid loading a large lib.
  updateExpandedHeight() {
    // Get width of original element so we can apply it to the clone
    var nodeWidth = Math.round(parseFloat(this.targetEl.offsetWidth));

    // Create clone of node
    var cloneEl = this.targetEl.cloneNode(true); // 'true' includes child nodes

    // Inline styles added to prevent reflow, ensure clone is same size as expanded element
    cloneEl.style.cssText =
      "max-height: none !important; position: absolute !important; right: 100% !important; visibility: hidden !important; width: " +
      nodeWidth +
      "px !important; -webkit-transition: none !important; -moz-transition: none !important; transition: none !important";

    // Update “aria-hidden” attribute
    cloneEl.setAttribute("aria-hidden", false);

    // Remove id just to be safe
    cloneEl.removeAttribute("id");

    // Append clone to document, save as new var so we can remove it later
    var newEl = this.targetParentEl.insertBefore(cloneEl, this.targetEl);

    // Calculate height
    var expandedHeight = Math.round(parseFloat(newEl.offsetHeight));

    // Remove cloned node to clean up after ourselves
    this.targetParentEl.removeChild(newEl);

    // Apply inline max-height to collapsed element
    // Note: CSS is overriding this when aria-hidden="true"
    this.targetEl.style.maxHeight = expandedHeight + "px";
  }

  expand() {
    // Update toggle text
    if (this.hasActiveText) {
      this.textEl.textContent = this.activeToggleText;
    }

    // Add classes
    if (this.expandedClasses.length) {
      this.el.classList.add(...this.expandedClasses);
      this.targetEl.classList.add(...this.expandedClasses);
    }

    // Update aria attributes
    this.el.setAttribute("aria-expanded", true);
    this.targetEl.setAttribute("aria-hidden", false);
  }

  collapse() {
    // Update toggle text
    if (this.hasActiveText) {
      this.textEl.textContent = this.defaultToggleText;
    }

    // Remove classes
    if (this.expandedClasses.length) {
      this.el.classList.remove(...this.expandedClasses);
      this.targetEl.classList.remove(...this.expandedClasses);
    }

    // Update aria attributes
    this.el.setAttribute("aria-expanded", false);
    this.targetEl.setAttribute("aria-hidden", true);
  }

  toggle(evt) {
    if (this.el.getAttribute("aria-expanded") === "true") {
      this.collapse();
    } else {
      this.expand();
    }
  }

  destroy() {
    this.el.removeAttribute("aria-haspopup");
    this.el.removeAttribute("aria-expanded");
    this.targetEl.removeAttribute("aria-hidden");
    this.targetEl.style.removeProperty("max-height");

    if (this.el.tagName.toLowerCase() === "a") {
      this.el.removeAttribute("role");
    }

    if (this.hasActiveText) {
      this.textEl.textContent = this.defaultToggleText;
    }

    if (this.expandedClasses.length) {
      this.el.classList.remove(...this.expandedClasses);
      this.targetEl.classList.remove(...this.expandedClasses);
    }

    this.el.removeEventListener("click", this.toggle);
    this.el.removeEventListener("keydown", this.keydownHandler);
  }
}
