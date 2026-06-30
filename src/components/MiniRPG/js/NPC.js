class NPC {
  constructor({ name, x, y, color, hair, facing, dialogue }) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 44;
    this.color = color;
    this.hair = hair;
    this.facing = facing;
    this.dialogue = dialogue;
    this.interactionRange = 60;
  }

  get collisionBox() {
    return {
      x: this.x + 5,
      y: this.y + 26,
      width: 22,
      height: 16
    };
  }

  distanceTo(player) {
    const dx = (this.x + this.width / 2) - (player.x + player.width / 2);
    const dy = (this.y + this.height / 2) - (player.y + player.height / 2);
    return Math.hypot(dx, dy);
  }

  isInRange(player) {
    return this.distanceTo(player) <= this.interactionRange;
  }

  draw(ctx, camera, time) {
    const sx = Math.round(this.x - camera.x);
    const sy = Math.round(this.y - camera.y);
    const bob = Math.sin(time * 2 + this.x) * 1;

    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.fillRect(sx + 7, sy + 36, 18, 5);
    ctx.fillStyle = this.color;
    ctx.fillRect(sx + 8, sy + 18 + bob, 16, 20);
    ctx.fillStyle = "#f3c28a";
    ctx.fillRect(sx + 8, sy + 6 + bob, 16, 14);
    ctx.fillStyle = this.hair;
    ctx.fillRect(sx + 7, sy + 4 + bob, 18, 6);
    ctx.fillStyle = "#252436";
    ctx.fillRect(sx + 12, sy + 13 + bob, 3, 3);
    ctx.fillRect(sx + 19, sy + 13 + bob, 3, 3);
    ctx.fillStyle = "#332718";
    ctx.fillRect(sx + 11, sy + 38 + bob, 5, 5);
    ctx.fillRect(sx + 19, sy + 38 + bob, 5, 5);
  }

  drawPrompt(ctx, camera) {
    const sx = Math.round(this.x + this.width / 2 - camera.x);
    const sy = Math.round(this.y - camera.y - 18);
    const text = "[F] Talk";

    ctx.save();
    ctx.font = "16px Georgia, serif";
    const width = ctx.measureText(text).width + 18;
    ctx.fillStyle = "rgba(28, 28, 38, 0.9)";
    ctx.fillRect(sx - width / 2, sy - 18, width, 24);
    ctx.strokeStyle = "#f1d36f";
    ctx.lineWidth = 2;
    ctx.strokeRect(sx - width / 2, sy - 18, width, 24);
    ctx.fillStyle = "#fff2bd";
    ctx.textAlign = "center";
    ctx.fillText(text, sx, sy);
    ctx.restore();
  }
}
