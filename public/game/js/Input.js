class Input {
  constructor() {
    this.keys = new Set();
    this.pressed = new Set();
    this.activeTouches = new Map();
    this.joystick = { dx: 0, dy: 0, active: false };

    this._boundKeydown = (event) => {
      const key = event.key.toLowerCase();
      if (["w", "a", "s", "d", "f", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
        event.preventDefault();
      }
      if (!this.keys.has(key)) {
        this.pressed.add(key);
      }
      this.keys.add(key);
    };

    this._boundKeyup = (event) => {
      this.keys.delete(event.key.toLowerCase());
    };

    this._boundBlur = () => {
      this.keys.clear();
      this.pressed.clear();
      this.activeTouches.clear();
      this.joystick.dx = 0;
      this.joystick.dy = 0;
      this.joystick.active = false;
    };

    window.addEventListener("keydown", this._boundKeydown);
    window.addEventListener("keyup", this._boundKeyup);
    window.addEventListener("blur", this._boundBlur);

    this.setupJoystick();
    this.setupTalkButton();
  }

  destroy() {
    window.removeEventListener("keydown", this._boundKeydown);
    window.removeEventListener("keyup", this._boundKeyup);
    window.removeEventListener("blur", this._boundBlur);
    this._cleanupJoystick();
  }

  setupJoystick() {
    const base = document.getElementById("joystick-base");
    const knob = document.getElementById("joystick-knob");
    if (!base || !knob) return;

    const maxDist = base.offsetWidth / 2 - knob.offsetWidth / 2;
    let touchId = null;

    const updateKnob = (clientX, clientY) => {
      const rect = base.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
      }

      knob.style.transform = `translate(${dx}px, ${dy}px)`;

      this.joystick.dx = dx / maxDist;
      this.joystick.dy = dy / maxDist;
    };

    const resetKnob = () => {
      knob.style.transform = "translate(0px, 0px)";
      this.joystick.dx = 0;
      this.joystick.dy = 0;
      this.joystick.active = false;
      touchId = null;
    };

    base.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      touchId = touch.identifier;
      this.joystick.active = true;
      updateKnob(touch.clientX, touch.clientY);
    }, { passive: false });

    this._joystickMove = (e) => {
      for (const touch of e.changedTouches) {
        if (touch.identifier === touchId) {
          e.preventDefault();
          updateKnob(touch.clientX, touch.clientY);
        }
      }
    };

    this._joystickEnd = (e) => {
      for (const touch of e.changedTouches) {
        if (touch.identifier === touchId) {
          resetKnob();
        }
      }
    };

    document.addEventListener("touchmove", this._joystickMove, { passive: false });
    document.addEventListener("touchend", this._joystickEnd);
    document.addEventListener("touchcancel", this._joystickEnd);
  }

  _cleanupJoystick() {
    const controls = document.getElementById("mobile-controls");
    if (controls) controls.innerHTML = "";
    if (this._joystickMove) {
      document.removeEventListener("touchmove", this._joystickMove);
      document.removeEventListener("touchend", this._joystickEnd);
      document.removeEventListener("touchcancel", this._joystickEnd);
    }
  }

  setupTalkButton() {
    const btn = document.querySelector("#talk-btn");
    if (!btn) return;

    const press = () => {
      if (!this.keys.has("f")) this.pressed.add("f");
      this.keys.add("f");
      btn.classList.add("active");
    };

    const release = () => {
      this.keys.delete("f");
      btn.classList.remove("active");
    };

    btn.addEventListener("touchstart", (e) => { e.preventDefault(); press(); }, { passive: false });
    btn.addEventListener("touchend", release);
    btn.addEventListener("touchcancel", release);
    btn.addEventListener("mousedown", (e) => { e.preventDefault(); press(); });
    btn.addEventListener("mouseup", release);
    btn.addEventListener("mouseleave", release);
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
