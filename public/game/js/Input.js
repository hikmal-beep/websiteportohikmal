class Input {
  constructor() {
    this.keys = new Set();
    this.pressed = new Set();
    this.activeTouches = new Map();

    window.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d", "f", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        event.preventDefault();
      }
      if (!this.keys.has(key)) {
        this.pressed.add(key);
      }
      this.keys.add(key);
    });

    window.addEventListener("keyup", (event) => {
      this.keys.delete(event.key.toLowerCase());
    });

    window.addEventListener("blur", () => {
      this.keys.clear();
      this.pressed.clear();
      this.activeTouches.clear();
    });

    this.setupTouchControls();
  }

  setupTouchControls() {
    const buttons = document.querySelectorAll("#mobile-controls .ctrl-btn");

    for (const btn of buttons) {
      const key = btn.dataset.key;
      if (!key) continue;

      btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        for (const touch of e.changedTouches) {
          this.activeTouches.set(touch.identifier, key);
          if (!this.keys.has(key)) {
            this.pressed.add(key);
          }
          this.keys.add(key);
          btn.classList.add("active");
        }
      }, { passive: false });

      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        this.keys.add(key);
        this.pressed.add(key);
        btn.classList.add("active");
      });

      const onMouseUp = () => {
        this.keys.delete(key);
        btn.classList.remove("active");
      };
      btn.addEventListener("mouseup", onMouseUp);
      btn.addEventListener("mouseleave", onMouseUp);
    }

    document.addEventListener("touchend", (e) => this.releaseTouches(e), { passive: false });
    document.addEventListener("touchcancel", (e) => this.releaseTouches(e), { passive: false });
    document.addEventListener("touchmove", (e) => e.preventDefault(), { passive: false });
  }

  releaseTouches(e) {
    for (const touch of e.changedTouches) {
      const key = this.activeTouches.get(touch.identifier);
      if (key) {
        this.keys.delete(key);
        this.activeTouches.delete(touch.identifier);
        document.querySelectorAll(`#mobile-controls .ctrl-btn[data-key="${key}"]`)
          .forEach((b) => b.classList.remove("active"));
      }
    }
  }

  isDown(key) {
    return this.keys.has(key.toLowerCase());
  }

  wasPressed(key) {
    return this.pressed.has(key.toLowerCase());
  }

  endFrame() {
    this.pressed.clear();
  }
}
