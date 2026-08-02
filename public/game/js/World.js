class World {
  constructor() {
    this.width = 1024;
    this.height = 1536;
    this.blockers = [];
    this.foreground = [];
    this.npcs = [];
    this.flowers = [];

    this.bgImage = new Image();
    this.bgImage.src = "Assets/Background.png";
    this.bgReady = false;
    this.bgImage.onload = () => { this.bgReady = true; };

    this.createVenue();
  }

  createVenue() {
    this.trees = [];
    for (let i = 0; i < 18; i += 1) {
      this.trees.push({
        x: 30 + (i * 57) % (this.width - 80),
        y: 55 + (i * 43) % 200
      });
    }

    this.bushes = [];
    for (let i = 0; i < 20; i += 1) {
      this.bushes.push({
        x: 25 + (i * 51) % (this.width - 50),
        y: 70 + (i * 47) % 180,
        width: 38,
        height: 26
      });
    }

    this.stageWall = { x: 340, y: 290, width: 344, height: 30 };
    this.curtains = [
      { x: 300, y: 290, width: 40, height: 180 },
      { x: 684, y: 290, width: 40, height: 180 }
    ];
    this.columns = [
      { x: 345, y: 340, width: 28, height: 28 },
      { x: 651, y: 340, width: 28, height: 28 }
    ];

    this.rivers = [
      { x: 0, y: 810, width: 1024, height: 225 }
    ];
    this.bridges = [
      { x: 457, y: 810, width: 110, height: 225 }
    ];

    this.rocks = [
      { x: 180, y: 1120, width: 36, height: 28 },
      { x: 790, y: 1180, width: 32, height: 26 },
      { x: 250, y: 1380, width: 36, height: 28 },
      { x: 740, y: 1350, width: 32, height: 26 },
      { x: 160, y: 1280, width: 30, height: 24 },
      { x: 830, y: 1280, width: 30, height: 24 }
    ];

    this.archPillars = [
      { x: 440, y: 1280, width: 32, height: 64 },
      { x: 552, y: 1280, width: 32, height: 64 }
    ];

    this.fence = { x: 0, y: 1490, width: 1024, height: 46 };

    this.createNpcs();
    this.createBlockers();
    this.createFlowers();
  }

  createNpcs() {
    this.npcs = [
      new NPC({ name: "Village Elder", x: 480, y: 580, color: "#6d78bf", hair: "#d9d9d9", facing: "down", dialogue: ["Welcome to our peaceful village.", "People here live peacefully.", "Enjoy exploring our town."] }),
      new NPC({ name: "Merchant", x: 300, y: 730, color: "#d38d39", hair: "#57321d", facing: "right", dialogue: ["My shop is closed today.", "Come back tomorrow.", "Have a wonderful day."] }),
      new NPC({ name: "Town Guard", x: 720, y: 1100, color: "#5b8aa8", hair: "#31313e", facing: "left", dialogue: ["Everything is safe today.", "Please respect the villagers.", "Good luck on your journey."] }),
      new NPC({ name: "Farmer", x: 260, y: 1360, color: "#7c9b3e", hair: "#7b4b21", facing: "right", dialogue: ["The harvest is excellent this year.", "Rain has been generous.", "Time to get back to work."] }),
      new NPC({ name: "Mage", x: 680, y: 550, color: "#7b55bd", hair: "#eee3c6", facing: "down", dialogue: ["Magic requires patience.", "Knowledge comes with experience.", "One day you will understand."] }),
      new NPC({ name: "Little Girl", x: 530, y: 1240, color: "#d75e9d", hair: "#a65526", facing: "up", dialogue: ["I lost my butterfly.", "Have you seen it?", "Thank you for talking with me."] })
    ];
  }

  createBlockers() {
    this.blockers = [];
    this.trees.forEach((tree) => this.blockers.push({ x: tree.x + 18, y: tree.y + 48, width: 28, height: 20 }));
    this.bushes.forEach((bush) => this.blockers.push({ x: bush.x, y: bush.y + 6, width: bush.width, height: bush.height - 6 }));
    this.blockers.push(this.stageWall);
    this.curtains.forEach((curtain) => this.blockers.push(curtain));
    this.columns.forEach((col) => this.blockers.push(col));
    this.rocks.forEach((rock) => this.blockers.push(rock));
    this.archPillars.forEach((p) => this.blockers.push(p));
    this.blockers.push(this.fence);
    this.npcs.forEach((npc) => this.blockers.push(npc.collisionBox));

    this.rivers.forEach((river) => {
      const bridgeOverlaps = this.bridges.some((bridge) => Collision.intersects(river, bridge));
      if (!bridgeOverlaps) {
        this.blockers.push(river);
      } else {
        this.blockers.push(...this.subtractBridge(river));
      }
    });
  }

  subtractBridge(river) {
    let pieces = [river];
    this.bridges.forEach((bridge) => {
      pieces = pieces.flatMap((piece) => {
        if (!Collision.intersects(piece, bridge)) return [piece];
        const result = [];
        if (bridge.x > piece.x) result.push({ x: piece.x, y: piece.y, width: bridge.x - piece.x, height: piece.height });
        if (bridge.x + bridge.width < piece.x + piece.width) {
          result.push({ x: bridge.x + bridge.width, y: piece.y, width: piece.x + piece.width - bridge.x - bridge.width, height: piece.height });
        }
        if (bridge.y > piece.y) result.push({ x: piece.x, y: piece.y, width: piece.width, height: bridge.y - piece.y });
        if (bridge.y + bridge.height < piece.y + piece.height) {
          result.push({ x: piece.x, y: bridge.y + bridge.height, width: piece.width, height: piece.y + piece.height - bridge.y - bridge.height });
        }
        return result.filter((part) => part.width > 0 && part.height > 0);
      });
    });
    return pieces;
  }

  createFlowers() {
    const colors = ["#ef6f8f", "#f2d05a", "#f6f0ff", "#7bd6de"];
    for (let i = 0; i < 80; i += 1) {
      this.flowers.push({
        x: 30 + (i * 73) % (this.width - 60),
        y: 1050 + (i * 41) % 400,
        color: colors[i % colors.length]
      });
    }
  }

  draw(ctx, camera, time) {
    if (this.bgReady) {
      ctx.drawImage(this.bgImage, -camera.x, -camera.y);
    } else {
      ctx.fillStyle = "#3a6b4a";
      ctx.fillRect(0, 0, camera.canvas.width, camera.canvas.height);
    }
    this.flowers.forEach((flower) => this.drawFlower(ctx, camera, flower));
  }

  drawFlower(ctx, camera, flower) {
    ctx.fillStyle = flower.color;
    ctx.fillRect(flower.x - camera.x, flower.y - camera.y, 4, 4);
    ctx.fillStyle = "#2d7d3d";
    ctx.fillRect(flower.x - camera.x + 1, flower.y - camera.y + 4, 2, 5);
  }
}
