class Camera {
  constructor(canvas, worldWidth, worldHeight) {
    this.canvas = canvas;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.x = 0;
    this.y = 0;
    this.paused = false;
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.x = this.clampX(this.x);
    this.y = this.clampY(this.y);
  }

  follow(target, deltaSeconds) {
    if (this.paused) {
      return;
    }
    const desiredX = target.x + target.width / 2 - this.canvas.width / 2;
    const desiredY = target.y + target.height / 2 - this.canvas.height / 2;
    const smoothing = Math.min(1, deltaSeconds * 7);
    this.x += (this.clampX(desiredX) - this.x) * smoothing;
    this.y += (this.clampY(desiredY) - this.y) * smoothing;
  }

  clampX(value) {
    return Math.max(0, Math.min(value, Math.max(0, this.worldWidth - this.canvas.width)));
  }

  clampY(value) {
    return Math.max(0, Math.min(value, Math.max(0, this.worldHeight - this.canvas.height)));
  }
}
