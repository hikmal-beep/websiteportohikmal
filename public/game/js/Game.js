class Game {
  constructor() {
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
    this.input = new Input();
    this.world = new World();
    this.player = new Player(940, 690);
    this.camera = new Camera(this.canvas, this.world.width, this.world.height);
    this.dialog = new Dialog();
    this.nearbyNpc = null;
    this.lastTime = 0;
    this._rafId = null;
    this._boundResize = () => this.resize();
    this.resize();

    window.addEventListener("resize", this._boundResize);
  }

  destroy() {
    if (this._rafId) cancelAnimationFrame(this._rafId);
    window.removeEventListener("resize", this._boundResize);
    this.input.destroy();
  }

  start() {
    this._rafId = requestAnimationFrame((time) => this.loop(time));
  }

  resize() {
    this.camera.resize(window.innerWidth, window.innerHeight);
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
  }

  loop(timeMs) {
    const deltaSeconds = Math.min((timeMs - this.lastTime) / 1000 || 0, 0.033);
    this.lastTime = timeMs;
    const time = timeMs / 1000;

    this.update(deltaSeconds);
    this.draw(time);
    this.input.endFrame();
    this._rafId = requestAnimationFrame((time) => this.loop(time));
  }

  update(deltaSeconds) {
    const locked = this.dialog.active;
    this.camera.paused = locked;

    this.player.update(deltaSeconds, this.input, this.world.blockers, this.world.width, this.world.height, locked);
    this.camera.follow(this.player, deltaSeconds);
    this.nearbyNpc = this.findNearbyNpc();

    if (this.input.wasPressed("f")) {
      if (this.dialog.active) {
        this.dialog.next();
      } else if (this.nearbyNpc) {
        this.dialog.open(this.nearbyNpc, () => {
          this.camera.paused = false;
        });
      }
    }
  }

  findNearbyNpc() {
    return this.world.npcs.find((npc) => npc.isInRange(this.player)) || null;
  }

  draw(time) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.world.draw(this.ctx, this.camera, time);

    const actors = [...this.world.npcs, this.player].sort((a, b) => (a.y + a.height) - (b.y + b.height));
    actors.forEach((actor) => actor.draw(this.ctx, this.camera, time));

    if (this.nearbyNpc && !this.dialog.active) {
      this.nearbyNpc.drawPrompt(this.ctx, this.camera);
    }
  }
}
