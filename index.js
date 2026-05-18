/**
 * Accessible expand/collapse component.
 * @param {HTMLElement} el - Toggle button DOM node
 * @param {Object} [opts] - Options
 * @param {string} [opts.expandedClasses=""] - Class(es) to apply when expanded
 * @param {string} [opts.activeToggleText=""] - Expanded state toggle button text
 * @param {boolean} [opts.shouldStartExpanded=false] - Whether the component should start expanded
 * @param {function} [opts.onReady] - Ready callback function
 */

import EventEmitter from "ev-emitter";

function firstTextNode(el) {
  for (const node of el.childNodes) {
    // 3 === Node.TEXT_NODE
    if (node.nodeType === 3) return node;
  }
  return null;
}

export default class ExpandToggle extends EventEmitter {
  constructor(el, opts) {
    // Have to call super() first before referencing “this” since we’re extending EventEmitter
    // https://stackoverflow.com/a/43591507/673457
    super();

    this.el = el;
    this.targetId = this.el.getAttribute("data-expands");
    this.targetEl = document.getElementById(this.targetId);
    this.isLink = this.el.tagName.toLowerCase() === "a";

    // Ensure target element exists before initializing
    if (!this.targetEl) {
      console.warn(`Can't find expandable target with id "${this.targetId}"`);
      return;
    }

    this.options = {
      expandedClasses: "", // string, accepts multiple space-separated classes
      activeToggleText: "", // expanded state toggle button text
      shouldStartExpanded: false, // component starts expanded on init
      ariaHasPopup: false, // false, true, or an ARIA 1.1 value ("menu", "listbox", "tree", "grid", "dialog")
      onReady: null, // ready callback function
      ...opts,
    };

    // Resolve aria-haspopup value from option or data attribute. When false
    // we omit the attribute entirely (the WAI-ARIA Disclosure pattern does
    // not use aria-haspopup; only enable it for menu-/dialog-like content).
    const popupAttr = this.el.getAttribute("data-expands-haspopup");
    this.ariaHasPopup = popupAttr !== null ? (popupAttr || "true") : this.options.ariaHasPopup;

    // Custom expanded class(es), always normalized to an array
    const classSource = this.el.getAttribute("data-expands-class") || this.options.expandedClasses;
    this.expandedClasses = classSource.split(/\s+/).filter(Boolean);

    // Check if component should start expanded
    this.shouldStartExpanded =
      this.el.hasAttribute("data-expanded") || this.options.shouldStartExpanded;
    this.isExpanded = this.shouldStartExpanded;

    // Check for custom toggle button text to use when expanded. We swap the
    // first child text node directly so that sibling children (e.g. an
    // <svg> icon) are preserved across state changes.
    this.hasActiveText = false;
    this.textEl = this.el.querySelector("[data-expands-text]");
    this.textNode = this.textEl ? firstTextNode(this.textEl) : null;

    if (this.textNode) {
      this.defaultToggleText = this.textNode.data;
      this.activeToggleText =
        this.textEl.getAttribute("data-expands-text") ||
        this.options.activeToggleText;
      this.hasActiveText = !!this.activeToggleText.length;
    }

    this.init();
  }

  init() {
    // Accessibility setup
    if (this.ariaHasPopup) {
      this.el.setAttribute("aria-haspopup", this.ariaHasPopup === true ? "true" : this.ariaHasPopup);
    }
    this.el.setAttribute("aria-controls", this.targetId);
    this.el.setAttribute("aria-expanded", this.shouldStartExpanded);
    this.targetEl.setAttribute("aria-hidden", !this.shouldStartExpanded);

    if (this.isLink) {
      this.el.setAttribute("role", "button");
    }

    // If starting expanded, also apply expanded classes and active text so
    // the initial state is consistent with later expand() calls.
    if (this.shouldStartExpanded) {
      if (this.expandedClasses.length) {
        this.el.classList.add(...this.expandedClasses);
        this.targetEl.classList.add(...this.expandedClasses);
      }
      if (this.hasActiveText) {
        this.textNode.data = this.activeToggleText;
      }
    }

    // Click event listener on toggle button
    // Note: Callback needs to be assigned to a let so we can remove it since we’re using bind()
    // https://stackoverflow.com/a/22870717/673457
    this.clickHandler = this.toggle.bind(this);
    this.el.addEventListener("click", this.clickHandler);

    // Check for onReady callback
    if (typeof this.options.onReady === "function") {
      this.options.onReady();
    }
  }

  destroy() {
    // Remove event listeners
    this.el.removeEventListener("click", this.clickHandler);

    // Remove aria attributes
    this.el.removeAttribute("aria-haspopup");
    this.el.removeAttribute("aria-controls");
    this.el.removeAttribute("aria-expanded");
    this.targetEl.removeAttribute("aria-hidden");

    if (this.isLink) {
      this.el.removeAttribute("role");
    }

    // Reset toggle text
    if (this.hasActiveText) {
      this.textNode.data = this.defaultToggleText;
    }

    // Remove custom classes
    if (this.expandedClasses.length) {
      this.el.classList.remove(...this.expandedClasses);
      this.targetEl.classList.remove(...this.expandedClasses);
    }

    this.emitEvent("destroy");
  }

  expand(event) {
    if (this.isExpanded) return;
    this.isExpanded = true;

    if (this.hasActiveText) {
      this.textNode.data = this.activeToggleText;
    }

    if (this.expandedClasses.length) {
      this.el.classList.add(...this.expandedClasses);
      this.targetEl.classList.add(...this.expandedClasses);
    }

    this.el.setAttribute("aria-expanded", true);
    this.targetEl.setAttribute("aria-hidden", false);

    this.emitEvent("expand", event);
  }

  collapse(event) {
    if (!this.isExpanded) return;
    this.isExpanded = false;

    if (this.hasActiveText) {
      this.textNode.data = this.defaultToggleText;
    }

    if (this.expandedClasses.length) {
      this.el.classList.remove(...this.expandedClasses);
      this.targetEl.classList.remove(...this.expandedClasses);
    }

    this.el.setAttribute("aria-expanded", false);
    this.targetEl.setAttribute("aria-hidden", true);

    this.emitEvent("collapse", event);
  }

  toggle(event) {
    // Prevent default in case toggle element is a link instead of a button
    event?.preventDefault();

    // Respect disabled state for both <button disabled> and aria-disabled
    if (this.el.disabled || this.el.getAttribute("aria-disabled") === "true") {
      return;
    }

    if (this.isExpanded) {
      this.collapse(event);
    } else {
      this.expand(event);
    }
  }
}
