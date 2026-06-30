class Dialog {
  constructor() {
    this.root = document.getElementById("dialog");
    this.nameEl = document.getElementById("dialog-name");
    this.textEl = document.getElementById("dialog-text");
    this.pages = [];
    this.pageIndex = 0;
    this.active = false;
    this.onClose = null;
  }

  open(npc, onClose) {
    this.pages = npc.dialogue;
    this.pageIndex = 0;
    this.active = true;
    this.onClose = onClose;
    this.nameEl.textContent = npc.name;
    this.root.classList.remove("hidden");
    this.showPage();
  }

  next() {
    if (!this.active) {
      return;
    }
    this.pageIndex += 1;
    if (this.pageIndex >= this.pages.length) {
      this.close();
      return;
    }
    this.showPage();
  }

  showPage() {
    this.textEl.textContent = this.pages[this.pageIndex];
  }

  close() {
    this.active = false;
    this.root.classList.add("hidden");
    if (this.onClose) {
      this.onClose();
    }
  }
}
