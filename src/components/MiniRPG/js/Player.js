class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 44;
    this.speed = 155;
    this.facing = "down";
    this.moving = false;
    this.animationTime = 0;
  }

  get collisionBox() {
    return {
      x: this.x + 6,
      y: this.y + 27,
      width: 20,
      height: 15
    };
  }

  update(deltaSeconds, input, blockers, worldWidth, worldHeight, locked) {
    if (locked) {
      this.moving = false;
      return;
    }

    let dx = 0;
    let dy = 0;
    if (input.isDown("w")) dy -= 1;
    if (input.isDown("s")) dy += 1;
    if (input.isDown("a")) dx -= 1;
    if (input.isDown("d")) dx += 1;

    this.moving = dx !== 0 || dy !== 0;
    if (this.moving) {
      const length = Math.hypot(dx, dy);
      dx /= length;
      dy /= length;
      this.setFacing(dx, dy);
      this.animationTime += deltaSeconds;

      const nextX = { ...this.collisionBox, x: this.collisionBox.x + dx * this.speed * deltaSeconds };
      if (Collision.canMove(nextX, blockers, worldWidth, worldHeight)) {
        this.x += dx * this.speed * deltaSeconds;
      }

      const nextY = { ...this.collisionBox, y: this.collisionBox.y + dy * this.speed * deltaSeconds };
      if (Collision.canMove(nextY, blockers, worldWidth, worldHeight)) {
        this.y += dy * this.speed * deltaSeconds;
      }
    } else {
      this.animationTime = 0;
    }
  }

  setFacing(dx, dy) {
    if (dy < 0 && dx < 0) this.facing = "up-left";
    else if (dy < 0 && dx > 0) this.facing = "up-right";
    else if (dy > 0 && dx < 0) this.facing = "down-left";
    else if (dy > 0 && dx > 0) this.facing = "down-right";
    else if (dy < 0) this.facing = "up";
    else if (dy > 0) this.facing = "down";
    else if (dx < 0) this.facing = "left";
    else if (dx > 0) this.facing = "right";
  }

  draw(ctx, camera) {
    const sx = Math.round(this.x - camera.x);
    const sy = Math.round(this.y - camera.y);
    const frame = this.moving ? Math.floor(this.animationTime * 10) % 4 : 0;
    const step = this.moving ? Math.sin(frame * Math.PI / 2) * 3 : 0;

    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(sx + 6, sy + 38, 20, 5);

    ctx.fillStyle = "#315bbd";
    ctx.fillRect(sx + 8, sy + 20, 16, 18);
    ctx.fillStyle = "#d64545";
    ctx.fillRect(sx + 6, sy + 18, 20, 7);
    ctx.fillStyle = "#ffd39a";
    ctx.fillRect(sx + 8, sy + 7, 16, 14);
    ctx.fillStyle = "#6e3c1e";
    ctx.fillRect(sx + 7, sy + 4, 18, 6);
    ctx.fillRect(sx + 6, sy + 8, 4, 8);

    const eyes = this.facing.includes("up") ? 0 : 1;
    if (eyes) {
      ctx.fillStyle = "#222439";
      ctx.fillRect(sx + 12, sy + 14, 3, 3);
      ctx.fillRect(sx + 19, sy + 14, 3, 3);
    }

    ctx.fillStyle = "#26304d";
    ctx.fillRect(sx + 9, sy + 38 + step, 5, 5);
    ctx.fillRect(sx + 19, sy + 38 - step, 5, 5);

    if (this.facing.includes("left")) {
      ctx.fillStyle = "#ffd39a";
      ctx.fillRect(sx + 5, sy + 25, 4, 10);
    } else if (this.facing.includes("right")) {
      ctx.fillStyle = "#ffd39a";
      ctx.fillRect(sx + 23, sy + 25, 4, 10);
    }
  }
}
